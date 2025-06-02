from django.urls import path

from myst_api.hooks.stripe_hook import stripe_webhook
from myst_api.views.checkout_session import CreateCheckoutSessionView
from myst_api.views.contact_view import ContactView
from myst_api.views.exchange_view import ExchangeView
from myst_api.views.order_view import OrderView
from myst_api.views.product_view import ProductView
from myst_api.views.review_view import ReviewView

app_name = 'myst_api'

urlpatterns = [
    path('contact/', ContactView.as_view(), name='contact'),
    path('checkout-session/', CreateCheckoutSessionView.as_view(), name='checkout-session'),
    path('product/<str:product_id>/', ProductView.as_view(), name='product'),
    path('exchange/', ExchangeView.as_view(), name='exchange'),
    path('order/', OrderView.as_view(), name='order'),
    path('review/', ReviewView.as_view(), name='review'),
    path('stripe-webhook/', stripe_webhook, name='stripe-webhook'),
]