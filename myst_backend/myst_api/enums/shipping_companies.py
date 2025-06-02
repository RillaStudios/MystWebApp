import enum

class ShippingCompanies(enum.Enum):
    """
    Enum for shipping companies used in the application.

    This enum is used to standardize the shipping company names
    across the application, ensuring consistency and ease of use.
    Each shipping company is represented by a unique string value.

    Attributes:
        CANADA_POST (str): Represents Canada Post shipping company.
        UPS (str): Represents United Parcel Service shipping company.
        FEDEX (str): Represents FedEx shipping company.
        DHL (str): Represents DHL shipping company.
        PUROLATOR (str): Represents Purolator shipping company.

    @author IFD
    """
    CANADA_POST = "canada_post"
    UPS = "ups"
    FEDEX = "fedex"
    DHL = "dhl"
    PUROLATOR = "purolator"