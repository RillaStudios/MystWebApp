from rest_framework import serializers

from myst_api.models.contact import Contact


class ContactSerializer(serializers.ModelSerializer):
    """
    Serializer for the Contact model.
    This serializer is used to convert Contact model instances into JSON format
    and validate incoming data for creating or updating Contact instances.
    It includes all fields from the Contact model.
    It is used in the ContactView to handle contact form submissions.
    The Contact model typically includes fields like name, email, subject, and message.
    It is important for handling user inquiries and feedback.

    @author: IFD
    """
    class Meta:
        """
        Metaclass for ContactSerializer.
        This class specifies the model to be serialized and the fields to include.
        It uses the Contact model and includes all fields defined in that model.

        @author: IFD
        """
        model = Contact
        fields = '__all__'