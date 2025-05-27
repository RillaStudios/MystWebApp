from django.urls import path

from myst_api.models.checkout_session import CreateCheckoutSessionView, \
    CheckoutSessionStatusView
from myst_api.views.contact_view import ContactView
from myst_api.views.product_view import ProductView

app_name = 'myst_contact'

urlpatterns = [
    path('contact/', ContactView.as_view(), name='contact'),
    path('create-checkout-session/', CreateCheckoutSessionView.as_view(), name='checkout-session'),
    path('checkout-session-status/<str:session_id>/', CheckoutSessionStatusView.as_view(), name='checkout-session-status'),
    path('product/<str:product_id>/', ProductView.as_view(), name='product'),
]