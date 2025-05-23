from rest_framework import serializers

from myst_api.models.contact import Contact


class ContactSerializer(serializers.ModelSerializer):
    class Meta:
        model = Contact
        fields = '__all__'