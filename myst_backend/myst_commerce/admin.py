from django.contrib import admin

from myst_commerce.models import Product
from myst_commerce.models.order import Order
from myst_commerce.models.product_image import ProductImage


class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    can_delete = True

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]

# Register your models here.
admin.site.register(Product, ProductAdmin)
admin.site.register(Order)
