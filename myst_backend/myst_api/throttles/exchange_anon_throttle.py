from rest_framework.throttling import AnonRateThrottle


class ExchangeAnonThrottle(AnonRateThrottle):
    """
    Throttle for anonymous users accessing exchange-related endpoints.
    This throttle limits the number of requests to prevent abuse.
    """
    scope = 'exchange_anon'