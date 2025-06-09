from django.conf import settings
from django.core.mail import send_mail
from rest_framework.response import Response
from rest_framework.views import APIView

from myst_api.auth.csrf_exempt import CsrfExemptSessionAuthentication
from myst_api.models.contact import Contact
from myst_api.throttles.contact_anon_throttle import ContactAnonThrottle


class ContactView(APIView):
    """
    API view to handle contact form submissions.
    Allows users to submit their contact information and a message.
    This view has the following functionality:

    - POST: Accepts a contact form submission with email, full name, and message.

    The view is rate-limited to prevent abuse.

    Attributes:
        throttle_classes (list): List of throttle classes to apply to this view.

    @author: IFD
    """
    throttle_classes = [ContactAnonThrottle]
    authentication_classes = [CsrfExemptSessionAuthentication]

    def post(self, request) -> Response:
        """
        Handle POST requests to submit a contact form.
        This method processes the contact form submission, validates the input,
        saves the contact information to the database, and sends an email notification.

        :param request:
        :return:

        @author: IFD
        """
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



