from rest_framework.throttling import AnonRateThrottle


class OrderAnonThrottle(AnonRateThrottle):
    """
    Custom throttle class for anonymous users accessing order-related endpoints.
    This class limits the number of requests to 20 per hour.

    @author: IFD
    """
    scope = 'order_anon'