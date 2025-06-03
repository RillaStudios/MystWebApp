import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe, type Appearance } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useState } from "react";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";
import { useLocation } from "react-router-dom";
import type { Product } from "../types/Product";
import CustomCheckout from "../components/forms/CustomCheckout";
import { useCurrency } from "../context/CurrencyContext";
import { Center, Loader, useMantineColorScheme } from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";
import { Helmet } from "react-helmet-async";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

export default function CheckoutPage() {
  // Location state is used to pass product_id and quantity from the BuyPage
  const location = useLocation();

  // Ensure that product_id and quantity are provided in the location state
  const { product_id, quantity } = location.state;

  // Use currency context to get the current currency and loading state
  const { currency, loading } = useCurrency();

  // Loading product state
  const [loadingProduct, setLoadingProduct] = useState(true);

  // State to store the product
  const [product, setProduct] = useState<Product>();

  // State to store the client secret for the Stripe Checkout session
  const [clientSecret, setClientSecret] = useState<string>("");

  // Validate the client secret format
  const isValidClientSecret =
    clientSecret.startsWith("cs_") && clientSecret.includes("_secret_");

  const { colorScheme } = useMantineColorScheme();

  /* 
  A useEffect hook to create a Stripe Checkout session when the 
  component mounts or when dependencies change.

  It sends a POST request to the server with the product ID, quantity,
  and currency to create a checkout session, and updates the clientSecret state
  with the response data. If an error occurs, it logs the error and sets
  the clientSecret to an empty string.

  @author IFD
  */
  useEffect(() => {
    // Ensure that loading is false and currency is available before making the request
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
    // Re-run this effect when loading, currency, product_id, or quantity changes
  }, [loading, currency, product_id, quantity]);

  /* 
  A useEffect hook to fetch the product details from the server
  when the component mounts or when the product_id changes.

  It sends a GET request to the server with the product_id to retrieve
  the product details, and updates the product state with the response data.
  If an error occurs, it logs the error to the console.

  @author IFD
  */
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

  // Define the appearance options for the Stripe Checkout
  const appearance: Appearance = {
    theme: "stripe",
    ...(colorScheme === "dark" && {
      variables: {
        colorPrimary: "#f06e27",
        colorBackground: "#242424",
        colorText: "#fff",
      },
      rules: {
        ".Label": {
          color: "#fff",
        },
        ".Input": {
          backgroundColor: "#2e2e2e",
          borderColor: "#444",
          color: "#fff",
        },
      },
    }),
  };

  // Define the loader type for the Stripe Checkout
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
              product_img_url={`${import.meta.env.VITE_ASSETS_URL}${
                product?.product_images[0].image_url
              }`}
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
