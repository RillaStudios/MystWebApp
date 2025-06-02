from django.db import models

class Product(models.Model):
    """
    Represents a product in the system.

    Attributes:
        product_id (int): Unique identifier for the product.
        product_name (str): Name of the product.
        product_description (str): Description of the product.
        product_price (Decimal): Price of the product.
        available (bool): Availability status of the product.

    Methods:
        __str__(): Returns the product's name as a string representation.

    @author: IFD
    """

    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    product_description = models.TextField()
    product_price = models.DecimalField(max_digits=10, decimal_places=2)
    available = models.BooleanField(default=True)

    def __str__(self):
        return self.product_name