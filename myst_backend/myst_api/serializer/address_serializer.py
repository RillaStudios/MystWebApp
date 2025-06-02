from rest_framework import serializers
from myst_api.models.address import Address


class AddressSerializer(serializers.ModelSerializer):
    """
    Serializer for the Address model.
    This serializer handles the serialization and deserialization of Address instances,
    including validation of required fields and formatting of the address data.

    @author: IFD
    """
    class Meta:
        """
        Metaclass for AddressSerializer.
        Specifies the model to be serialized and the fields to include.
        The `fields` attribute is set to '__all__' to include all fields from the Address model.

        @author: IFD
        """
        model = Address
        fields = '__all__'