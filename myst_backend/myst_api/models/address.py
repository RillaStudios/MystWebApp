from django.db import models

from myst_api.enums.address_type import AddressType


class Address(models.Model):
    address_id = models.AutoField(primary_key=True)

    # Foreign key to Customer model
    customer = models.ForeignKey('Customer', on_delete=models.CASCADE, related_name='addresses')

    order = models.ForeignKey('Order', on_delete=models.SET_NULL, related_name='addresses', null=True, blank=True)

    # Address fields
    street_address_one = models.CharField(max_length=255)
    street_address_two = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=100)
    prov_state = models.CharField(max_length=100)
    postal_zip_code = models.CharField(max_length=20)
    country = models.CharField(max_length=100)

    address_type = models.CharField(max_length=50, choices=[(status.value, status.name) for status in AddressType])

    def __str__(self):
        return f"{self.street_address_one}, {self.city}, {self.prov_state}, {self.postal_zip_code}"