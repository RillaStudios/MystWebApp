from rest_framework.throttling import AnonRateThrottle


class ProductAnonThrottle(AnonRateThrottle):
    """
    Custom throttle class for anonymous users accessing product-related endpoints.
    This class limits the number of requests to 80 per hour.

    @author: IFD
    """
    scope = 'product_anon'