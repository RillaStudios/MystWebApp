from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from myst_api.models.address import Address
from myst_api.models.customer import Customer
from myst_api.models.order import Order
from myst_api.models.product import Product
from myst_api.serializer.address_serializer import AddressSerializer
from myst_api.serializer.customer_serializer import CustomerSerializer
from myst_api.serializer.order_serializer import OrderSerializer
from myst_api.serializer.product_serializer import ProductSerializer
from myst_api.throttles.order_anon_throttle import OrderAnonThrottle


class OrderView(APIView):
    """
    View to handle orders.
    This view supports GET requests to retrieve order details.

    @author: IFD
    """
    throttle_classes = [OrderAnonThrottle]

    def get(self, request):
        """
        Returns an order based on the provided order ID.

        @param request: The HTTP request object.

        @return: A JSON response containing the order details, customer information, product details, and addresses.

        @author: IFD
        """
        try:
            order_id = request.query_params.get('order_id', None)

            if order_id:
                order = Order.objects.get(pk=order_id)
                order_serializer = OrderSerializer(order)

                customer = Customer.objects.get(pk=order.customer.customer_id)
                customer_serializer = CustomerSerializer(customer)

                product = Product.objects.get(pk=order.product.product_id)
                product_serializer = ProductSerializer(product)

                addresses = Address.objects.filter(customer_id=customer.customer_id, order=order)
                address_serializer = AddressSerializer(addresses, many=True)

                return Response({
                    "order": order_serializer.data,
                    "customer": customer_serializer.data,
                    "product": product_serializer.data,
                    "addresses": address_serializer.data
                }, status=status.HTTP_200_OK)
            else:
                return Response({"error": "An order id must be provided."}, status=status.HTTP_400_BAD_REQUEST)

        except Order.DoesNotExist:
            return Response({"error": "Order(s) not found"}, status=status.HTTP_404_NOT_FOUND)

