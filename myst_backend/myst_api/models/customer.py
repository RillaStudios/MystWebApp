from django.db import models

from myst_api.enums.address_type import AddressType


class Customer(models.Model):

    customer_id = models.AutoField(primary_key=True)

    # Personal information fields
    customer_name = models.CharField(max_length=100)
    customer_email = models.CharField(max_length=100)

    def __str__(self):
        return self.customer_name