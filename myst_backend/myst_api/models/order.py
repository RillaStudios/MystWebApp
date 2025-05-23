from django.db import models

from myst_api.enums.order_status import OrderStatus
from myst_api.enums.payment_status import PaymentStatus

class Order(models.Model):
    order_id = models.CharField(primary_key=True, max_length=9, unique=True)
    customer_name = models.CharField(max_length=100)
    customer_email = models.CharField(max_length=100)
    order_date = models.DateTimeField(auto_now_add=True)
    total_amount = models.DecimalField(max_digits=10, decimal_places=2)
    order_status = models.CharField(max_length=50, choices=[(status.value, status.name) for status in OrderStatus])
    payment_status = models.CharField(max_length=50, choices=[(status.value, status.name) for status in PaymentStatus])

    def __str__(self):
        return f"Order {self.order_id} by {self.customer_name}"