from django.db import models

class Review(models.Model):
    reviewer_name = models.CharField(max_length=100)
    order_id = models.CharField(max_length=100)
    review_text = models.TextField()
    rating = models.IntegerField()
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.reviewer_name} - {self.rating} stars"
