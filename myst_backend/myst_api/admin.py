from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

from myst_api.models.contact import Contact
from myst_api.models.order import Order
from myst_api.models.product import Product
from myst_api.models.product_image import ProductImage

# Register your models here.
class ProductImageInline(admin.TabularInline):
    model = ProductImage
    extra = 1
    can_delete = True
    fields = ['image', 'order']
    ordering = ['order']

class ProductAdmin(admin.ModelAdmin):
    inlines = [ProductImageInline]

    def changelist_view(self, request, extra_context=None):
        obj = Product.objects.first()
        if obj:
            return HttpResponseRedirect(
                reverse('admin:%s_%s_change' % (obj._meta.app_label, obj._meta.model_name), args=[obj.product_id])
            )
        return super().changelist_view(request, extra_context)

    def has_add_permission(self, request):
        return not Product.objects.exists()

    def has_delete_permission(self, request, obj=None):
        return False

admin.site.register(Contact)
admin.site.register(Order)
admin.site.register(Product, ProductAdmin)