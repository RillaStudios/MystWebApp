from rest_framework.throttling import AnonRateThrottle


class CheckoutSessionAnonThrottle(AnonRateThrottle):
    """
    Throttle for anonymous users accessing the checkout session API.
    This throttle limits the number of requests to prevent abuse.

    The rate is set to 20 requests per hour.

    @author: IFD
    """
    scope = 'checkout-session'