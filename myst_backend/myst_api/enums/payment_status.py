import enum

class PaymentStatus(enum.Enum):
    COMPLETED = "Completed"
    FAILED = "Failed"
    REFUNDED = "Refunded"
    DISPUTED = "Disputed"