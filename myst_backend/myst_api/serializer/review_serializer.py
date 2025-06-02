from rest_framework import serializers

from myst_api.models.review import Review


class ReviewSerializer(serializers.ModelSerializer):
    """
    Serializer for the Review model.
    This serializer includes all fields of the Review model.
    It is used to convert Review instances into JSON format and vice versa.

    @author: IFD
    """
    class Meta:
        """
        Metaclass for ReviewSerializer.
        It specifies the model to be serialized and the fields to include.

        @author: IFD
        """
        model = Review
        fields = '__all__'