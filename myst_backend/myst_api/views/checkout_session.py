from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings
from myst_api.models.order import Order
from myst_api.models.product import Product
from myst_api.service.price_conversion import convert_price
from myst_api.throttles.checkout_session_anon_throttle import CheckoutSessionAnonThrottle

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateCheckoutSessionView(APIView):
    """
    View to handle Stripe Checkout Session creation and retrieval.
    This view supports both GET and POST requests:

    - GET: Retrieves an existing checkout session by session_id and returns its details.
    - POST: Creates a new checkout session for a product with the specified quantity and currency.

    @author: IFD
    """
    throttle_classes = [CheckoutSessionAnonThrottle]

    def get(self, request):
        """
        Get an existing Stripe Checkout Session by session_id.
        This will also return the line items in the session and the
        associated order ID if available.

        :param request:
        :return:

        @author: IFD
        """

        session_id = request.query_params.get('session_id')
        if not session_id:
            return Response({'error': 'session_id is required'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            session = stripe.checkout.Session.retrieve(
                session_id,
                expand=["total_details"]
            )

            session_items = stripe.checkout.Session.list_line_items(
                session_id
            )

            order_id = None
            if session:
                if session.payment_intent:
                    order = Order.objects.filter(payment_id=session.payment_intent).first()
                    order_id = order.order_id if order else None

            oid = order_id

            return Response({"session": session, "items": session_items, "order_id": oid}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        """
        Create a new Stripe Checkout Session for a product.
        This endpoint expects a product_id, quantity, and currency in the request body.
        It retrieves the product from the database, converts the price to the specified currency,
        and creates a checkout session with the product details.

        :param request:
        :return:

        @author: IFD
        """
        try:
            # Assume the request contains a product_id and quantity
            product_id = request.data.get('product_id')
            quantity = request.data.get('quantity', 1)
            currency = request.data.get('currency')

            # Fetch the product from your database
            product = Product.objects.get(product_id=product_id)

            updated_price = convert_price(str(currency).upper(), float(product.product_price))

            unit_amount = int(updated_price * 100)

            session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data': {
                            'currency': str(currency.lower()),
                            'unit_amount': unit_amount,
                            'product_data': {
                                'name': product.product_name,
                                'description': product.product_description,
                                'tax_code': 'txcd_99999999',
                            },
                        },
                        'quantity': quantity,
                    },
                ],
                adaptive_pricing={"enabled": False},
                automatic_tax={'enabled': False},
                mode='payment',
                shipping_address_collection={},
                ui_mode='custom',
          )

            return Response({'clientSecret': session.client_secret}, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
