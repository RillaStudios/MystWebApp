from django.db import models

class Review(models.Model):
    reviewer_name = models.CharField(max_length=100, blank=True, null=True)
    reviewer_email = models.EmailField(max_length=254)
    order = models.ForeignKey('Order', on_delete=models.SET_NULL, related_name='reviews', null=True, blank=True)
    review_text = models.TextField(blank=True, null=True)
    rating = models.IntegerField(choices=[(i, i) for i in range(1, 6)], default=5)
    created_at = models.DateTimeField(auto_now_add=True)
    allowed_on_page = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.reviewer_name} - {self.rating} stars"
