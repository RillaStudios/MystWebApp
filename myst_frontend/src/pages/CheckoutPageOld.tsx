import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import axios from "axios";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckoutForm from "../components/forms/CheckoutForm";

const stripe = loadStripe(
  "pk_test_51RPXJd050Kn7qGrTrB3W4nRQSY9k62vpB6XbttCUhLydemYN3YEhzh3nrepsDt7SjoWleMImCMCPSJsgb5kmEkcB00lOiaKqXo",
);

export default function CheckoutPage() {
  const location = useLocation();
  const { product_id, quantity } = location.state;

  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    axios
      .post(MYST_AUTH_ENDPOINTS.CHECKOUT.COLLECT_PAYMENT, {
        product_id: product_id,
        quantity: quantity,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => console.error("Failed to fetch client secret", err));
  }, []);

  const appearance = { theme: "stripe" as const };
  const options = { clientSecret, appearance };

  return (
    <>
      {clientSecret && (
        <Elements stripe={stripe} options={options}>
          <CheckoutForm clientSecret={clientSecret} />
        </Elements>
      )}
    </>
  );
}
