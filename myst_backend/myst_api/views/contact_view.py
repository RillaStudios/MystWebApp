from django.conf import settings
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle
from rest_framework.views import APIView
from myst_api.models.contact import Contact


class ContactView(APIView):
    throttle_classes = [AnonRateThrottle]

    def post(self, request) -> Response:
        email = request.data.get('email')
        full_name = request.data.get('full_name')
        message = request.data.get('message')

        if not all([email, message]):
            return Response({'error': 'Email and message are required.'}, status=400)

        try:

            contact = Contact.objects.create(
                email=email,
                full_name=full_name,
                message=message
            )

            send_mail(
                subject='Myst - Contact Submission',
                message=f'You have received a new contact request from {full_name} ({email}).\n\nMessage: \n\n{message}',
                from_email=settings.EMAIL_HOST_USER,
                recipient_list=['mystdetailing@gmail.com'],
                fail_silently=False,
            )

            return Response({'success': 'Contact request saved.', 'id': contact.id}, status=201)

        except Exception as e:
            return Response({'error': str(e)}, status=500)



