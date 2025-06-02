from rest_framework.throttling import AnonRateThrottle


class ContactAnonThrottle(AnonRateThrottle):
    """
    Throttle for anonymous users accessing the contact API.
    This throttle limits the number of requests to prevent abuse.

    The rate is set to 5 requests per hour.

    @author: IFD
    """
    scope = 'contact-anon'