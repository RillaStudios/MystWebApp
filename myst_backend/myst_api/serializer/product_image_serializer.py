from rest_framework import serializers

from myst_api.models.product_image import ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductImage
        fields = '__all__'

    def validate(self, data):
        product = data.get('product') or self.instance.product
        order = data.get('order') if 'order' in data else self.instance.order
        qs = ProductImage.objects.filter(product=product, order=order)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("This product already has an image with this order.")
        return data