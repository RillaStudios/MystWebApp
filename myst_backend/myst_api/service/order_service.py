import traceback

import stripe
from django.core.mail import send_mail
from myst_api.enums.order_status import OrderStatus
from myst_api.models.address import Address
from myst_api.models.customer import Customer
from myst_api.models.order import Order
from myst_api.models.product import Product
from myst_backend import settings


class OrderService:
    """
    Service class for handling order-related operations.
    This class provides methods to create orders based on Stripe checkout sessions.
    It interacts with the Stripe API to retrieve session details and create corresponding
    orders in the local database.

    @author: IFD
    """

    @classmethod
    def create_order(cls, session: dict) -> None:
        """
        Create a new order in the system.
        This method should handle the logic for creating an order,
        including any necessary validations and database interactions.

        :param session: A dictionary containing the Stripe checkout session details.

        :return: None if the order is created successfully, or raises an exception if there is an error.

        @author: IFD
        """
        try:

            # Initialize Stripe with the secret key
            session_id = session['id']

            # If session_id is not provided, raise an exception
            if not session_id:
                raise Exception('Session ID is required')

            # Retrieve the Stripe checkout session
            session = stripe.checkout.Session.retrieve(session_id)

            # If session is not found, raise an exception
            if not session:
                raise Exception('Session not found')

            # Check if the order already exists for this payment ID
            if Order.objects.filter(payment_id=session.payment_intent).exists():
                raise Exception('Order already exists for this checkout session.')

            # Get the first line item from the session
            line_items = session.list_line_items().data
            if not line_items:
                raise Exception('Line items list is empty')
            line_item_data = line_items[0]
            product_name = getattr(line_item_data, "description", None) or getattr(line_item_data, "name", None)
            if not product_name:
                raise Exception('Line item description is required')
            line_item = Product.objects.filter(product_name=product_name).first()
            quantity = getattr(line_item_data, "quantity", 1)

            total_amount = round(session.amount_total / 100, 2)

            # Create or get the customer
            customer, cust_created = Customer.objects.get_or_create(
                customer_email=session.customer_details.email,
                customer_name=session.customer_details.name
            )

            if cust_created:
                customer.save()

            # Create the order
            order = Order(
                order_date=session.created,
                payment_id=session.payment_intent,
                order_status=OrderStatus.PROCESSING.value,
                payment_status=session.payment_status,
                product=line_item,
                quantity=quantity,
                total_amount=total_amount,
                customer=customer,
                currency=session.currency
            )

            # Save the order to the database
            order.save()

            # Handle shipping address
            ship_address, ship_address_created = Address.objects.get_or_create(
                customer=customer,
                order=order,
                street_address_one=session.collected_information.shipping_details.address.line1,
                street_address_two=session.collected_information.shipping_details.address.line2,
                city=session.collected_information.shipping_details.address.city,
                prov_state=session.collected_information.shipping_details.address.state,
                postal_zip_code=session.collected_information.shipping_details.address.postal_code,
                country=session.collected_information.shipping_details.address.country,
                address_type='shipping',
            )

            if ship_address_created:
                ship_address.save()
            else:
                ship_address.order = order
                ship_address.street_address_one = session.collected_information.shipping_details.address.line1
                ship_address.street_address_two = session.collected_information.shipping_details.address.line2
                ship_address.city = session.collected_information.shipping_details.address.city
                ship_address.prov_state = session.collected_information.shipping_details.address.state
                ship_address.postal_zip_code = session.collected_information.shipping_details.address.postal_code
                ship_address.country = session.collected_information.shipping_details.address.country
                ship_address.save()

            # Safely get billing address fields from customer_details.address
            bill_address, bill_address_created = Address.objects.get_or_create(
                customer=customer,
                order=order,
                street_address_one=session.customer_details.address.line1,
                street_address_two=session.customer_details.address.line2,
                city=session.customer_details.address.city,
                prov_state=session.customer_details.address.state,
                postal_zip_code=session.customer_details.address.postal_code,
                country=session.customer_details.address.country,
                address_type='billing',
            )

            if bill_address_created:
                bill_address.save()
            else:
                bill_address.order = order
                bill_address.street_address_one = session.customer_details.address.line1
                bill_address.street_address_two = session.customer_details.address.line2
                bill_address.city = session.customer_details.address.city
                bill_address.prov_state = session.customer_details.address.state
                bill_address.postal_zip_code = session.customer_details.address.postal_code
                bill_address.country = session.customer_details.address.country
                bill_address.save()

            # Send confirmation email
            send_mail(
                subject='Myst - Order Confirmation',
                message=f'Your order has been successfully created.\n\nOrder ID: {order.order_id}\nProduct: {line_item.product_name}\nQuantity: {quantity}\nTotal Amount: ${total_amount}\n\nThank you for your purchase!',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[session.customer_details.email],
                fail_silently=False,
            )

            # Send notification email to admin
            send_mail(
                subject='Myst - New Order Notification',
                message=f'A new order has been created.\n\nOrder ID: {order.order_id}\nCustomer: {customer.customer_name} ({customer.customer_email})\nProduct: {line_item.product_name}\nQuantity: {quantity}\nTotal Amount: ${total_amount}\n\nTo update the status of this order visit the admin dashboard.',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=[settings.EMAIL_HOST_USER],
                fail_silently=False,
            )

            return None

        except Exception as e:
            try:
                send_mail(
                    subject='Myst - Order Creation Error',
                    message=f'You have received a new payment, but an error occurred while creating the order. Check your Stripe Dashboard to view the order.\n\nError: {str(e)}',
                    from_email=settings.EMAIL_HOST_USER,
                    recipient_list=[settings.EMAIL_HOST_USER],
                    fail_silently=False,
                )

                return None
            except Exception as e:
                print(e)
                return None