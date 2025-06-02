import random

from django.core.mail import send_mail
from django.db import models

from myst_api.enums.order_status import OrderStatus
from myst_api.enums.payment_status import PaymentStatus
from myst_api.enums.shipping_companies import ShippingCompanies
from myst_api.models.customer import Customer
from myst_api.models.product import Product


def generate_order_id():
    return str(random.randint(100000000, 999999999))


class Order(models.Model):
    # Order ID
    order_id = models.CharField(primary_key=True, max_length=9, unique=True, editable=False,
                                default=generate_order_id)

    # Related payment ID
    payment_id = models.CharField(max_length=255, null=True, blank=True)

    # Currency order was placed in
    currency = models.CharField(max_length=3, null=False, blank=False)

    # Tracking information
    shipping_company = models.CharField(max_length=100, null=True, blank=True, choices=[(status.value, status.name) for status in ShippingCompanies], default=None)
    tracking_number = models.CharField(max_length=100, null=True, blank=True, default=None)

    # Order details
    order_date = models.IntegerField(null=False, blank=False)
    order_status = models.CharField(max_length=50, choices=[(status.value, status.name) for status in OrderStatus])
    payment_status = models.CharField(max_length=50, choices=[(status.value, status.name) for status in PaymentStatus])

    # Product details
    product = models.ForeignKey(Product, on_delete=models.SET_NULL, related_name='orders', null=True)
    quantity = models.IntegerField(default=0)

    # Price details
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)

    # Customer
    customer =  models.ForeignKey(Customer, on_delete=models.SET_NULL, related_name='customer', null=True)

    def __str__(self):
        return f"Order {self.order_id} by {self.customer.customer_name}"

    def save(self, *args, **kwargs):
        status_changed = False
        previous = None

        if self.shipping_company:
            company_name = ' '.join(word.capitalize() for word in self.shipping_company.replace('_', ' ').split())
        else:
            company_name = "Unknown Company"

        # Only fetch previous if this is an update (order already exists)
        if self.pk and Order.objects.filter(pk=self.pk).exists():
            previous = Order.objects.get(pk=self.pk)
            if previous.order_status != self.order_status:
                status_changed = True

        admin_set_status = status_changed  # assume admin is manually setting the status

        # === Auto-update logic ===
        # Only auto-update to shipped if shipping info is present AND admin didn't just change the status
        if (
                self.shipping_company and
                self.tracking_number and
                self.order_status == OrderStatus.PROCESSING.value and
                not admin_set_status
        ):
            self.order_status = OrderStatus.SHIPPED.value
            status_changed = True

        # Only restrict DELIVERED if it was auto-set; allow admin override
        if (
                self.order_status == OrderStatus.DELIVERED.value and
                previous is not None and
                previous.order_status != OrderStatus.SHIPPED.value and
                not admin_set_status
        ):
            self.order_status = previous.order_status

        # Save to DB
        super().save(*args, **kwargs)

        # === Email logic ===
        status_subject = {
            OrderStatus.SHIPPED.value: f"Myst - Order #{self.order_id} Shipped",
            OrderStatus.DELIVERED.value: f"Myst - Order #{self.order_id} Delivered",
            OrderStatus.CANCELED.value: f"Myst - Order #{self.order_id} Canceled",
        }

        status_messages = {
            OrderStatus.SHIPPED.value: f"Your order has shipped via "
                                       f"{company_name}! "
                                       f"\n\nTracking number: #{self.tracking_number} "
                                       f"\n\nIf you have any questions, please contact us."
                                       f"\n\nThank you for shopping with us!",
            OrderStatus.DELIVERED.value: "Your order has been delivered. Thank you for shopping with us! \n\nIf you have any questions, please contact us.",
            OrderStatus.CANCELED.value: "Your order has been canceled. \n\nIf you have any questions, please contact us.",
        }

        if status_changed and self.customer and self.customer.customer_email and self.order_status in status_subject:
            send_mail(
                subject=status_subject[self.order_status],
                message=status_messages[self.order_status],
                from_email="mystdetailing@gmail.com",
                recipient_list=[self.customer.customer_email],
                fail_silently=True,
            )
