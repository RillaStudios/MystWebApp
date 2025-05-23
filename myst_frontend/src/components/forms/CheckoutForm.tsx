import { useStripe, useElements, CardElement } from "@stripe/react-stripe-js";
import { type FormEvent, useState } from "react";

interface CheckoutFormProps {
  clientSecret: string;
}

export default function CheckoutForm({ clientSecret }: CheckoutFormProps) {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!stripe || !elements) return;

    const cardElement = elements.getElement(CardElement);

    if (!cardElement) {
      setError("Card element not found");
      return;
    }

    setLoading(true);
    setError(null);

    const result = await stripe.confirmCardPayment(clientSecret, {
      payment_method: {
        card: cardElement,
      },
    });

    if (result.error) {
      setError(result.error.message || "Payment failed");
    } else if (result.paymentIntent?.status === "succeeded") {
      setSuccess(true);
    }

    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit}>
      <CardElement options={{ style: { base: { fontSize: "16px" } } }} />
      <button
        type="submit"
        disabled={!stripe || loading}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Processing..." : "Pay Now"}
      </button>
      {error && <div style={{ color: "red", marginTop: "1rem" }}>{error}</div>}
      {success && (
        <div style={{ color: "green", marginTop: "1rem" }}>
          Payment successful!
        </div>
      )}
    </form>
  );
}
