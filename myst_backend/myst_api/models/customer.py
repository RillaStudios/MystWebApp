from django.db import models


class Customer(models.Model):
    """
    Represents a customer in the system.

    Attributes:
        customer_id (int): Unique identifier for the customer.
        customer_name (str): Name of the customer.
        customer_email (str): Email address of the customer.

    Methods:
        __str__(): Returns the customer's name as a string representation.

    @author: IFD
    """

    customer_id = models.AutoField(primary_key=True)

    # Personal information fields
    customer_name = models.CharField(max_length=100)
    customer_email = models.CharField(max_length=100)

    def __str__(self):
        return self.customer_name