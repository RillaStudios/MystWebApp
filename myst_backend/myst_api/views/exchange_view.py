from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from myst_api.service.price_conversion import get_exchange_rate


class ExchangeView(APIView):

    def get(self, request):
        """
        Returns exchange rates for supported currencies.
        """

        currency_code = request.query_params.get('currency_code', 'CAD').upper()

        exchange_rate = get_exchange_rate(currency_code)

        return Response(exchange_rate, status=status.HTTP_200_OK)