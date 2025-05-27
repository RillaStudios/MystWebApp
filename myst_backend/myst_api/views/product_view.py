from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from myst_api.models.product import Product


class ProductView(APIView):
    """
    This view handles the product-related API endpoints.
    """

    def get(self, request, product_id):
        """
        Handle GET requests to retrieve product information.
        """

        try:
            product = Product.objects.get(product_id=product_id)
        except Product.DoesNotExist:
            return Response({'error': 'Product not found.'}, status=status.HTTP_404_NOT_FOUND)


        product_images = product.images.all()

        product_data = {
            'product_id': product.product_id,
            'product_name': product.product_name,
            'product_description': product.product_description,
            'product_price': product.product_price,
            'product_images': [
                {'image_url': image.image.url, 'order': image.order}
                for image in product_images
            ],
        }

        return Response(product_data, status=status.HTTP_200_OK)