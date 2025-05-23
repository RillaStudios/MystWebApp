from django.db import models

from myst_api.enums.address_type import AddressType


class Customer(models.Model):

    customer_id = models.AutoField(primary_key=True)

    # Personal information fields
    customer_name = models.CharField(max_length=100)
    customer_email = models.CharField(max_length=100)
    customer_phone = models.CharField(max_length=15)

    # Address fields
    customer_street_address = models.CharField(max_length=255)
    customer_city = models.CharField(max_length=100)
    customer_prov_state = models.CharField(max_length=100)
    customer_postal_zip_code = models.CharField(max_length=20)
    customer_address_type = models.CharField(max_length=50, choices=[(status.value, status.name) for status in AddressType])

    def __str__(self):
        return self.customer_name