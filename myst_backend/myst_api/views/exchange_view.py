from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from myst_api.service.price_conversion import get_exchange_rate
from myst_api.throttles.exchange_anon_throttle import ExchangeAnonThrottle


class ExchangeView(APIView):
    """
    View to handle exchange rates for supported currencies.
    This view supports GET requests to retrieve the exchange rates.

    @author: IFD
    """
    throttle_classes = [ExchangeAnonThrottle]

    def get(self, request):
        """
        Returns exchange rate for currency provided.

        @param request: The HTTP request object.

        @return: A JSON response containing the exchange rates for the specified currency.

        @author: IFD
        """

        currency_code = request.query_params.get('currency_code', 'CAD').upper()

        exchange_rate = get_exchange_rate(currency_code)

        return Response(exchange_rate, status=status.HTTP_200_OK)