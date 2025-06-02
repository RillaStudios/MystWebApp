from rest_framework import serializers

from myst_api.models.order import Order

class OrderSerializer(serializers.ModelSerializer):
    """
    Serializer for the Order model.
    This serializer is used to convert Order model instances into JSON format
    and validate incoming data for creating or updating Order instances.
    It includes all fields from the Order model.

    @author: IFD
    """
    class Meta:
        """
        Metaclass for OrderSerializer.
        This class specifies the model to be serialized and the fields to include.
        It uses the Order model and includes all fields defined in that model.

        @author: IFD
        """
        model = Order
        fields = '__all__'