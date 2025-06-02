from rest_framework import serializers

from myst_api.models.product_image import ProductImage

class ProductImageSerializer(serializers.ModelSerializer):
    """
    Serializer for the ProductImage model.
    This serializer is used to convert ProductImage model instances into JSON format
    and validate incoming data for creating or updating ProductImage instances.

    @author: IFD
    """
    class Meta:
        """
        Metaclass for ProductImageSerializer.
        This class specifies the model to be serialized and the fields to include.
        It uses the ProductImage model and includes all fields defined in that model.

        @author: IFD
        """
        model = ProductImage
        fields = '__all__'

    def validate(self, data):
        """
        Validate the uniqueness of the product image order for a given product.
        This method checks if there is already an image with the same order for the specified product.
        If such an image exists, it raises a ValidationError.
        This is important to ensure that each product can have multiple images,
        but each image must have a unique order number.

        :param data:
        :return:

        @author: IFD
        """
        product = data.get('product') or self.instance.product
        order = data.get('order') if 'order' in data else self.instance.order
        qs = ProductImage.objects.filter(product=product, order=order)
        if self.instance:
            qs = qs.exclude(pk=self.instance.pk)
        if qs.exists():
            raise serializers.ValidationError("This product already has an image with this order.")
        return data