from django.db import models

from myst_api.enums.order_status import OrderStatus
from myst_api.enums.payment_status import PaymentStatus
from myst_api.models.customer import Customer
from myst_api.models.product import Product


class Order(models.Model):
    # Order ID
    order_id = models.CharField(primary_key=True, max_length=9, unique=True)

    # Order details
    order_date = models.DateTimeField(auto_now_add=True)
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