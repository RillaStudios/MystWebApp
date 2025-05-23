from django.db import models

from myst_api.models.product import Product

class ProductImage(models.Model):
    product = models.ForeignKey(Product, related_name='images', on_delete=models.CASCADE)
    image = models.ImageField(upload_to='product_images/')
    order = models.PositiveIntegerField(default=1)

    class Meta:
        unique_together = ('product', 'order')

    def __str__(self):
        return f"Image for {self.product.product_name}"