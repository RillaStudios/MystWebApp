import enum

class PaymentStatus(enum.Enum):
    """
    Enum representing different payment statuses of an order.

    - PAID: The order has been paid.
    - UNPAID: The order has not been paid.

    @author IFD
    """
    PAID = "paid"
    UNPAID = "unpaid"