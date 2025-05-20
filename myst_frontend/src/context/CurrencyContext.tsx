// context/CurrencyContext.tsx
import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";

type CurrencyContextType = {
  currency: string;
  rate: number;
  setCurrency: (currency: string) => void;
  format: (value: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType | undefined>(
  undefined,
);

const SUPPORTED_CURRENCIES = ["USD", "EUR", "GBP", "JPY", "CAD"];
const DEFAULT_CURRENCY = "USD";

export const CurrencyProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [currency, setCurrencyState] = useState(DEFAULT_CURRENCY);
  const [rate, setRate] = useState(1);

  // Load initial currency from localStorage
  useEffect(() => {
    const saved = localStorage.getItem("currency");
    if (saved && SUPPORTED_CURRENCIES.includes(saved)) {
      setCurrencyState(saved);
    }
  }, []);

  // Fetch exchange rate when currency changes
  useEffect(() => {
    localStorage.setItem("currency", currency);

    if (currency === DEFAULT_CURRENCY) {
      setRate(1);
      return;
    }

    axios
      .get(`https://api.exchangerate.host/convert`, {
        params: {
          from: DEFAULT_CURRENCY,
          to: currency,
        },
      })
      .then((res: { data: { result: number } }) => {
        const result = res.data.result;
        setRate(result || 1);
      })
      .catch((err: unknown) => {
        if (axios.isAxiosError(err)) {
          console.error("Axios error:", err.message);
        } else {
          console.error("Unknown error:", err);
        }
        setRate(1);
      });
  }, [currency]);

  const setCurrency = (newCurrency: string) => {
    if (SUPPORTED_CURRENCIES.includes(newCurrency)) {
      setCurrencyState(newCurrency);
    }
  };

  const format = (value: number) =>
    new Intl.NumberFormat("en-US", {
      style: "currency",
      currency,
    }).format(value * rate);

  return (
    <CurrencyContext.Provider value={{ currency, rate, setCurrency, format }}>
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
