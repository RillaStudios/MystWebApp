from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
import stripe
from django.conf import settings
from myst_api.models.product import Product

stripe.api_key = settings.STRIPE_SECRET_KEY

# class CreateCheckoutSessionView(APIView):
#     def post(self, request):
#         try:
#             # Assume the request contains a product_id and quantity
#             product_id = request.data.get('product_id')
#             quantity = request.data.get('quantity', 1)
#
#             # Fetch the product from your database
#             product = Product.objects.get(product_id=product_id)
#
#             # Calculate the price (this logic would depend on your pricing model)
#             unit_amount = int(product.product_price * 100)  # Stripe expects amounts in cents
#
#             checkout_session = stripe.checkout.Session.create(
#                 line_items=[
#                     {
#                         'price_data': {
#                             'currency': 'cad',
#                             'unit_amount': unit_amount,
#                             'product_data': {
#                                 'name': product.product_name,
#                                 'description': product.product_description,
#                             },
#                         },
#                         'quantity': quantity,
#                     },
#                 ],
#                 mode='payment',
#                 ui_mode='custom',
#                 billing_address_collection='required',
#                 return_url='http://localhost:8000/warranty/',
#             )
#             return Response({'sessionId': checkout_session.id}, status=status.HTTP_201_CREATED)
#         except Product.DoesNotExist:
#             return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)

class CreatePaymentIntentView(APIView):
    def post(self, request):
        try:
            product_id = request.data.get('product_id')
            quantity = int(request.data.get('quantity', 1))

            product = Product.objects.get(product_id=product_id)
            unit_amount = int(product.product_price * 100)  # in cents
            total_amount = unit_amount * quantity

            # Create a PaymentIntent
            intent = stripe.PaymentIntent.create(
                amount=total_amount,
                currency='cad',
                metadata={
                    'product_id': str(product.product_id),
                    'product_name': product.product_name
                }
            )

            return Response({'clientSecret': intent.client_secret}, status=status.HTTP_201_CREATED)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found'}, status=status.HTTP_404_NOT_FOUND)
        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)