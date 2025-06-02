import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe, type Appearance } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";
import { useLocation } from "react-router-dom";
import type { Product } from "../types/Product";
import CustomCheckout from "../components/forms/CustomCheckout";
import { useCurrency } from "../context/CurrencyContext";
import { Center, Loader } from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  const location = useLocation();
  const { product_id, quantity } = location.state;
  const { currency, loading } = useCurrency();

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [product, setProduct] = useState<Product>();
  const [clientSecret, setClientSecret] = useState<string>("");
  const isValidClientSecret =
    clientSecret.startsWith("cs_") && clientSecret.includes("_secret_");

  useEffect(() => {
    if (!loading && currency) {
      axios
        .post(MYST_AUTH_ENDPOINTS.CHECKOUT.CREATE_SESSION, {
          product_id: product_id,
          quantity: quantity,
          currency: currency.toLocaleUpperCase(),
        })
        .then((response) => setClientSecret(response.data.clientSecret))
        .catch((error) => {
          console.error("Error creating checkout session:", error);
          setClientSecret("");
        });
    }
    console.log("New Currency:", currency);
  }, [loading, currency, product_id, quantity]);

  useEffect(() => {
    setLoadingProduct(true);

    axios
      .get(MYST_AUTH_ENDPOINTS.PRODUCT.GET_BY_ID(product_id))
      .then((response) => {
        setProduct(response.data);
      })
      .catch((error) => {
        console.error("Error fetching product:", error);
      })
      .finally(() => {
        setLoadingProduct(false);
      });
  }, [product_id]);

  const appearance: Appearance = {
    theme: "stripe",
  };

  const loader = "auto";

  return (
    <HeadFootLayout>
      <Helmet>
        <title>Myst Detailing | Checkout</title>
        <meta
          name="description"
          content="Complete your purchase of the Myst Detailing Car Extractor Kit. Secure checkout with multiple payment options."
        />
        <meta
          name="keywords"
          content="
            checkout, buy car extractor kit, secure payment, Myst Detailing,
            car cleaning products purchase, online order car extractor,
            car detailing kit checkout, Canada
          "
        />
        <meta name="robots" content="noindex, nofollow" />
        <link rel="canonical" href="https://mystdetailing.ca/checkout" />
      </Helmet>
      {!loadingProduct && isValidClientSecret && (
        <div style={{ minHeight: "90vh" }}>
          <CheckoutProvider
            key={clientSecret}
            stripe={stripePromise}
            options={{
              fetchClientSecret: () => Promise.resolve(clientSecret),
              elementsOptions: { appearance, loader },
            }}
          >
            <CustomCheckout
              product_img_url={`http://localhost:8000${product?.product_images[0].image_url}`}
              product_id={product!.product_id}
            />
          </CheckoutProvider>
        </div>
      )}
      {/* Optionally, show a loader or error if clientSecret is not ready */}
      {(loadingProduct || !isValidClientSecret) && (
        <Center style={{ height: "90vh" }}>
          <Loader size={"lg"} type="dots" />
        </Center>
      )}
    </HeadFootLayout>
  );
}
