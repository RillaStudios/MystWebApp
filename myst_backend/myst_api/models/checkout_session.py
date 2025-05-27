from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings
from myst_api.models.product import Product

stripe.api_key = settings.STRIPE_SECRET_KEY

class CreateCheckoutSessionView(APIView):
    def get(self, request, session_id):
        try:
            session = stripe.checkout.Session.retrieve(
                session_id,
                expand=["total_details"]
            )
            return Response(session, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        try:
            # Assume the request contains a product_id and quantity
            product_id = request.data.get('product_id')
            quantity = request.data.get('quantity', 1)

            # Fetch the product from your database
            product = Product.objects.get(product_id=product_id)

            # Calculate the price (this logic would depend on your pricing model)
            unit_amount = int(product.product_price * 100)  # Stripe expects amounts in cents

            session = stripe.checkout.Session.create(
                line_items=[
                    {
                        'price_data': {
                            'currency': 'cad',
                            'unit_amount': unit_amount,
                            'product_data': {
                                'name': product.product_name,
                                'description': product.product_description,
                            },
                        },
                        'quantity': quantity,
                    },
                ],
                mode='payment',
                automatic_tax={'enabled': True},
                shipping_address_collection={
                    'allowed_countries': ['CA', 'US'],  # Adjust as needed
                },
                ui_mode='custom',
                return_url='http://localhost:5173/return?session_id={CHECKOUT_SESSION_ID}',  # Replace with your success URL
            )

            return Response({'clientSecret': session.client_secret}, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)


class CheckoutSessionStatusView(APIView):
    def get(self, request, session_id):
        try:
            session = stripe.checkout.Session.retrieve(session_id)
            return Response({'status': session.status, 'customer_email': session.customer.email}, status=status.HTTP_200_OK)
        except stripe.error.StripeError as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
