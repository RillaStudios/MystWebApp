import { CheckoutProvider } from "@stripe/react-stripe-js";
import { loadStripe, type Appearance } from "@stripe/stripe-js";
import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";
import { useLocation } from "react-router-dom";
import type { Product } from "../types/Product";
import CustomCheckout from "../components/forms/CustomCheckout";

const stripePromise = loadStripe(
  "pk_test_51RPXJd050Kn7qGrTrB3W4nRQSY9k62vpB6XbttCUhLydemYN3YEhzh3nrepsDt7SjoWleMImCMCPSJsgb5kmEkcB00lOiaKqXo",
);

export default function CheckoutPage() {
  const location = useLocation();
  const { product_id, quantity } = location.state;

  const clientSecret = useMemo(() => {
    return axios
      .post(MYST_AUTH_ENDPOINTS.CHECKOUT.CREATE_SESSION, {
        product_id: product_id,
        quantity: quantity,
      })
      .then((response) => response.data.clientSecret);
  }, []);

  const [loadingProduct, setLoadingProduct] = useState(true);
  const [product, setProduct] = useState<Product>();

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
    <CheckoutProvider
      stripe={stripePromise}
      options={{
        fetchClientSecret: () => clientSecret,
        elementsOptions: { appearance, loader },
      }}
    >
      {!loadingProduct && (
        <CustomCheckout
          product_img_url={`http://localhost:8000${product?.product_images[0].image_url}`}
        />
      )}
    </CheckoutProvider>
  );
}
