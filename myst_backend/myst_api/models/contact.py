from django.db import models

class Contact(models.Model):
    """
    Model to store contact messages from users.

    Fields:
        email (EmailField): The email address of the user.
        full_name (CharField): The full name of the user, optional.
        message (TextField): The message content from the user.

    Methods:
        __str__(): Returns a string representation of the contact message, showing the user's full name.

    @author: IFD
    """
    email = models.EmailField()
    full_name = models.CharField(max_length=100, blank=True, null=True)
    message = models.TextField()

    def __str__(self):
        return f"{self.full_name}"
