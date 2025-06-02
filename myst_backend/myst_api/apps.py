from django.apps import AppConfig


class MystApiConfig(AppConfig):
    """
    Configuration class for the Myst API application.
    This class sets the default auto field type and the name of the application.
    It is used by Django to configure the application when it is included in a project.

    Attributes:
        default_auto_field (str): The default field type for auto-incrementing primary keys.
        name (str): The name of the application, used by Django to identify it.

    @author: IFD
    """
    default_auto_field = 'django.db.models.BigAutoField'
    name = 'myst_api'
