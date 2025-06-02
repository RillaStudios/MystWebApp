from django.db import models

from myst_api.models.product import Product

class ProductImage(models.Model):
    """
    Represents an image associated with a product.

    Attributes:
        product (ForeignKey): The product to which this image belongs.
        image (ImageField): The image file for the product.
        order (PositiveIntegerField): The order of the image in relation to other images for the same product.

    Methods:
        __str__(): Returns a string representation of the image associated with the product.

    @author: IFD
    """
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')
    order = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('product', 'order')

    def __str__(self):
        return f"Image for {self.product.product_name}"