import enum

class OrderStatus(enum.Enum):
    """
    Enum representing different statuses of an order.

    - PROCESSING: The order is being processed.
    - SHIPPED: The order has been shipped.
    - DELIVERED: The order has been delivered.
    - CANCELED: The order has been canceled.

    @author IFD
    """

    PROCESSING = "processing"
    SHIPPED = "shipped"
    DELIVERED = "delivered"
    CANCELED = "cancelled"