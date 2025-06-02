from rest_framework import serializers

from myst_api.models.product import Product


class ProductSerializer(serializers.ModelSerializer):
    """
    Serializer for Product model.
    This serializer includes all fields from the Product model,
    with the exception of the 'product_id' field, which is read-only.
    It is used to serialize and deserialize Product instances
    for API responses and requests.

    @author: IFD
    """
    class Meta:
        """
        Metaclass for ProductSerializer.
        It specifies the model to be serialized and the fields to include.
        The 'product_id' field is marked as read-only to prevent it from being modified
        during updates or creation of Product instances.

        @author: IFD
        """
        model = Product
        fields = '__all__'
        read_only_fields = ['product_id']