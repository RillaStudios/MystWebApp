from rest_framework import serializers

from myst_api.models.customer import Customer

class CustomerSerializer(serializers.ModelSerializer):
    """
    Serializer for the Customer model.
    This serializer is used to convert Customer model instances into JSON format
    and validate incoming data for creating or updating Customer instances.
    It includes all fields from the Customer model.

    @author: IFD
    """
    class Meta:
        """
        Metaclass for CustomerSerializer.
        This class specifies the model to be serialized and the fields to include.
        It uses the Customer model and includes all fields defined in that model.

        @author: IFD
        """
        model = Customer
        fields = '__all__'