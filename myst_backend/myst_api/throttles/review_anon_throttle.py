from rest_framework.throttling import AnonRateThrottle


class ReviewAnonThrottle(AnonRateThrottle):
    """
    This throttle class limits the number of requests an anonymous user can make to the review API endpoints.
    It is set to allow 50 requests per hour.

    @author: IFD
    """
    scope = 'review_anon'