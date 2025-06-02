from django.db import models

from myst_api.enums.address_type import AddressType


class Address(models.Model):
    """
    Model representing an address associated with a customer or an order.
    This model includes fields for the address details such as street address,
    city, state/province, postal/zip code, country, and the type of address (e.g., billing, shipping).
    It also includes foreign keys to link the address to a customer and optionally to an order.
    The `AddressType` enum is used to define the type of address, ensuring that only valid types can be assigned.

    Attributes:
        address_id (AutoField): Unique identifier for the address.
        customer (ForeignKey): Reference to the Customer model, linking the address to a customer.
        order (ForeignKey): Optional reference to the Order model, linking the address to an order.
        street_address_one (CharField): Primary street address.
        street_address_two (CharField): Secondary street address, optional.
        city (CharField): City of the address.
        prov_state (CharField): State or province of the address.
        postal_zip_code (CharField): Postal or zip code of the address.
        country (CharField): Country of the address.
        address_type (CharField): Type of address, using AddressType enum for validation.

    Methods:
        __str__(): Returns a string representation of the address, including the primary street address, city, state/province, and postal/zip code.

    @author IFD
    """
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