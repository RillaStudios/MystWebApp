from django.db import models

class Contact(models.Model):
    email = models.EmailField()
    full_name = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()

    def __str__(self):
        return f"{self.full_name}"
