from django.urls import path

from myst_api.models.checkout_session import CreatePaymentIntentView
from myst_api.views.contact_view import ContactView

app_name = 'myst_contact'

urlpatterns = [
    path('contact/', ContactView.as_view(), name='contact'),
    path('collect-payment/', CreatePaymentIntentView.as_view(), name='collect-payment'),
]