// context/CurrencyContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import countryCurrencyMap from "../assets/currency/countryCodeCurrency.json";
import axios from "axios";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";

type CurrencyContextType = {
  country: string;
  currency: string;
  rate: number;
  loading: boolean;
  changeCountryAndCurrency: (country: string, currency: string) => void;
  format: (value: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

const SUPPORTED_CURRENCIES = [
  ...new Set(
    Object.values(countryCurrencyMap).map((item) =>
      (item as { Currency: string }).Currency.toUpperCase(),
    ),
  ),
].sort();

const DEFAULT_CURRENCY = "CAD";
const DEFAULT_COUNTRY = "CA";

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  // State to manage country code
  const [country, setCountry] = useState(DEFAULT_COUNTRY);

  // State to manage currency type
  const [currency, setCurrency] = useState(DEFAULT_CURRENCY);

  // Loading state
  const [loading, setLoading] = useState(true);

  // State to manage exchange rate
  const [rate, setRate] = useState(1);

  // Load initial country info from localStorage or fetch it
  // via APIs if not available
  useEffect(() => {
    // Set loading to true while fetching data
    setLoading(true);

    // Check if the country code and currency are already saved in localStorage
    const savedIntlData = localStorage.getItem("i18n");

    // If not, fetch the country code and currency from the API
    if (!savedIntlData) {
      axios
        .get(`https://ipapi.co/country_code/`)
        .then((res) => {
          // Set country code to data from API and convert to lowercase
          const countryCode = res.data.toLowerCase();

          // Get the currency code from the map using the country code
          const currencyCode =
            countryCurrencyMap[countryCode as keyof typeof countryCurrencyMap]
              ?.Currency;

          // If the currency code is found in the map, and the currency
          // code is supported, set the currency and save it to localStorage
          if (
            currencyCode &&
            SUPPORTED_CURRENCIES.includes(currencyCode.toLocaleUpperCase())
          ) {
            // Set the currency to the found currency code
            setCurrency(currencyCode);

            // Set the country code to the found country code
            setCountry(countryCode);

            // Save the country code and currency code to localStorage
            localStorage.setItem(
              "i18n",
              JSON.stringify({
                country: countryCode,
                currency: currencyCode,
              }),
            );
          }
        })
        // Handle errors
        .catch((err) => {
          // Check if the error is an Axios error
          if (axios.isAxiosError(err)) {
            console.error("Axios error:", err.message);
          } else {
            console.error("Error fetching country code:", err);
          }

          // Set default country code and currency
          setCountry(DEFAULT_COUNTRY);
          setCurrency(DEFAULT_CURRENCY);
        })
        .finally(() => {
          // Set loading to false after fetching data
          // or after error handling
          setLoading(false);
        });
      return;
    } else {
      // If the country code and currency are already saved in localStorage,
      // parse the saved data and set the currency
      const { currency: savedCurrency, country: savedCountry } =
        JSON.parse(savedIntlData);

      // Set the currency and country code from the saved data
      setCurrency(savedCurrency);
      setCountry(savedCountry);
    }

    // If the currency is not supported, or if the currency is
    // CAD, set the rate to 1
    if (!SUPPORTED_CURRENCIES.includes(currency.toLocaleUpperCase())) {
      setRate(1);
      setLoading(false);
      return;
    }

    // Fetch the exchange rate from CAD to the selected currency
    // using the Frankfurter API
    getExchangeRate(currency);

    setLoading(false);
  }, [currency, country]);

  const getExchangeRate = (currency: string) => {
    // Fetch the exchange rate from CAD to the selected currency
    // using the Frankfurter API

    if (currency.toLocaleLowerCase() === "cad") {
      setRate(1);
      return;
    }

    axios
      .get(`${MYST_AUTH_ENDPOINTS.CURERENCY.GET_EXCHANGE_RATE(currency)}`)
      .then((res) => {
        // Extract the rate for the requested currency from the rates object
        const exchangeRate = res.data;
        setRate(exchangeRate || 1);
      })
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.message);
        } else {
          console.error("Unknown error:", err);
        }
        setRate(1);
      })
      .finally(() => {
        // Set loading to false after fetching data
        // or after error handling
        setLoading(false);
      });
  };

  const changeCountryAndCurrency = (
    newCountry: string,
    newCurrency: string,
  ) => {
    if (SUPPORTED_CURRENCIES.includes(newCurrency)) {
      // Save the new currency to localstorage
      localStorage.setItem(
        "i18n",
        JSON.stringify({
          country: newCountry,
          currency: newCurrency,
        }),
      );

      // Set the new country and currency
      setCountry(newCountry);
      setCurrency(newCurrency);

      // Fetch the exchange rate for the new currency
      // and update the rate state
      getExchangeRate(newCurrency);
    }
  };

  const format = (value: number) =>
    new Intl.NumberFormat("en-CA", {
      style: "currency",
      currency,
    }).format(value * rate);

  return (
    <CurrencyContext.Provider
      value={{
        country,
        currency,
        rate,
        loading,
        changeCountryAndCurrency,
        format,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => {
  const context = useContext(CurrencyContext);
  if (!context)
    throw new Error("useCurrency must be used within a CurrencyProvider");
  return context;
};
