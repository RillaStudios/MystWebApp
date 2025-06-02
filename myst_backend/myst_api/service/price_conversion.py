import requests

def convert_price(currency: str, product_price):
    try:
        if currency.lower() == 'cad':
            return product_price

        exchange_rate = get_exchange_rate(currency)

        updated_price = product_price * exchange_rate

        return updated_price
    except requests.RequestException as e:
        raise ValueError(f"Error fetching conversion rate: {str(e)}")

def get_exchange_rate(currency: str):
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