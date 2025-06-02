import enum

class AddressType(enum.Enum):
    """
    Enum representing different types of addresses.

    - SHIPPING: Represents a shipping address.
    - BILLING: Represents a billing address.

    @author IFD
    """

    SHIPPING = "shipping"
    BILLING = "billing"