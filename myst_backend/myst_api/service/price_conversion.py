import requests

def convert_price(currency: str, product_price):
    """
    Converts the product price from CAD to the specified currency using the latest exchange rates.

    :param currency:
    :param product_price:
    :return:

    @author: IFD
    """
    try:
        if currency.lower() == 'cad':
            return product_price

        exchange_rate = get_exchange_rate(currency)

        updated_price = product_price * exchange_rate

        return updated_price
    except requests.RequestException as e:
        raise ValueError(f"Error fetching conversion rate: {str(e)}")

def get_exchange_rate(currency: str):
    """
    Fetches the latest exchange rate for CAD to the specified currency.
    This function uses the Frankfurter API to get the exchange rates.

    :param currency:
    :return:

    @author: IFD
    """
    try:
        url = f"https://api.frankfurter.app/latest?from=CAD&to={currency.upper()}"
        response = requests.get(url)
        response.raise_for_status()
        data = response.json()

        if 'rates' not in data:
            raise ValueError("Invalid response from currency conversion API")

        return data['rates'][currency.upper()]
    except requests.RequestException as e:
        raise ValueError(f"Error fetching exchange rates: {str(e)}")