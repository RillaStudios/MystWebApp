from django.db import models

class Review(models.Model):
    """
    Represents a review for a product or order.

    Attributes:
        reviewer_name (str): Name of the reviewer.
        reviewer_email (str): Email address of the reviewer.
        order (ForeignKey): Reference to the order associated with the review.
        review_text (str): Text content of the review.
        rating (int): Rating given by the reviewer, from 1 to 5.
        created_at (DateTimeField): Timestamp when the review was created.
        allowed_on_page (bool): Indicates if the review is allowed to be displayed on the page.

    Methods:
        __str__(): Returns a string representation of the review, including the reviewer's name and rating.

    @author: IFD
    """
    reviewer_name = models.CharField(max_length=100, blank=True, null=True)
    reviewer_email = models.EmailField(max_length=254)
    order = models.ForeignKey('Order', on_delete=models.SET_NULL, related_name='reviews', null=True, blank=True)
    review_text = models.TextField(blank=True, null=True)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    allowed_on_page = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.reviewer_name} - {self.rating} stars"
