from django.contrib import admin
from django.http import HttpResponseRedirect
from django.urls import reverse

from myst_api.models.contact import Contact
from myst_api.models.customer import Customer
from myst_api.models.order import Order
from myst_api.models.product import Product
from myst_api.models.product_image import ProductImage
from myst_api.models.review import Review


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

class OrderAdmin(admin.ModelAdmin):
    list_display = ['order_number_display']

    def order_number_display(self, obj):
        return f"Order #{obj.order_id}"
    order_number_display.short_description = "Order"


    def get_readonly_fields(self, request, obj=None):
        editable = ['shipping_company', 'order_status', 'tracking_number']
        all_fields = [f.name for f in Order._meta.fields]
        return [f for f in all_fields if f not in editable]

    def has_add_permission(self, request):
        return False

class CustomerAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

class ContactAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

class ReviewAdmin(admin.ModelAdmin):
    def has_add_permission(self, request):
        return False

admin.site.register(Order, OrderAdmin)
admin.site.register(Customer, CustomerAdmin)
admin.site.register(Contact, ContactAdmin)
admin.site.register(Product, ProductAdmin)
admin.site.register(Review, ReviewAdmin)