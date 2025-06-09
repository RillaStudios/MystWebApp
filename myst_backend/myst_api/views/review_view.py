from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail

from myst_api.auth.csrf_exempt import CsrfExemptSessionAuthentication
from myst_api.models.order import Order
from myst_api.models.review import Review
from myst_api.serializer.review_serializer import ReviewSerializer
from no_profanity import ProfanityFilter

from myst_api.throttles.review_anon_throttle import ReviewAnonThrottle
from myst_backend import settings


class ReviewView(APIView):
    """
    This view handles the review-related API endpoints.
    It supports GET requests to retrieve the 5 most recent reviews
    with a rating above 4 and allowed_on_page=True, and POST requests
    to submit a new review for an order.

    @author: IFD
    """
    throttle_classes = [ReviewAnonThrottle]
    authentication_classes = [CsrfExemptSessionAuthentication]

    def get(self, request):
        """
        Handle GET requests to retrieve the 5 most recent reviews
        with rating above 4 and allowed_on_page=True.

        @param request: The HTTP request object.

        @return: A JSON response containing the reviews or an error message if no reviews are found.

        @author: IFD
        """
        reviews = Review.objects.filter(
            rating__gt=3,
            allowed_on_page=True
        ).order_by('-created_at')[:5]

        if not reviews:
            return Response({"error": "No reviews found"}, status=status.HTTP_404_NOT_FOUND)

        serializer = ReviewSerializer(reviews, many=True)
        data = serializer.data
        for review in data:
            review.pop('reviewer_email', None)
            review.pop('order', None)
        return Response(data, status=status.HTTP_200_OK)

    def post(self, request):
        """
        Handle POST requests to submit a new review for an order.
        This method checks if the order exists, validates the review data,
        and saves the review if valid. It also sends an email notification
        to the site administrator about the new review.

        :param request:
        :return:

        @author: IFD
        """

        oid = request.data.get('order_id')

        if not oid:
            return Response({"error": "Order ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        order_exists = Order.objects.filter(order_id=oid).exists()

        if not order_exists:
            return Response({"error": "Order does not exist"}, status=status.HTTP_404_NOT_FOUND)

        if Review.objects.filter(order_id=oid).exists():
            return Response({"error": "Review for this order already exists"}, status=status.HTTP_409_CONFLICT)

        review_text = request.data.get('review_text')
        rating = request.data.get('rating')
        review_email = request.data.get('reviewer_email')
        reviewer_name = request.data.get('reviewer_name', 'Anonymous')
        allowed = request.data.get('allowed_on_page', False)

        if not rating:
            rating = 5

        if review_text:
            # Check for profanity in the review text
            pf = ProfanityFilter()
            if pf.is_profanity(review_text.lower()):
                return Response({"error": "Review contains inappropriate content"}, status=status.HTTP_403_FORBIDDEN)

        review_serializer = ReviewSerializer(data={
            "order": oid,
            "review_text": review_text,
            "reviewer_email": review_email,
            "rating": rating,
            "reviewer_name": reviewer_name,
            "allowed_on_page": allowed,
        })

        if review_serializer.is_valid():
            review_serializer.save()

            send_mail(
                subject=f"New Review Submitted for Order {oid}",
                message=f"A new review has been submitted for order {oid} by {review_email}. \n\n"
                        f"Reviewer Name: {reviewer_name}\n"
                        f"Reviewer Email: {review_email}\n"
                        f"Rating: {rating} stars.\n"
                        f"Review Comment: {review_text}\n",
                recipient_list=[settings.EMAIL_HOST_USER],
                from_email=settings.EMAIL_HOST_USER,
                fail_silently=False,
            )

            return Response(review_serializer.data, status=status.HTTP_201_CREATED)
        else:
            return Response(review_serializer.errors, status=status.HTTP_400_BAD_REQUEST)