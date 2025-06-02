import { Center, Container, Loader, SimpleGrid } from "@mantine/core";
import { ProductImageCarousel } from "../ui/product/ProductImageCarousel";
import { useCurrency } from "../../context/CurrencyContext";
import { useEffect, useState } from "react";
import axios from "axios";
import { MYST_AUTH_ENDPOINTS } from "../../config/myst_api";
import type { Product } from "../../types/Product";
import ProductInfo from "../ui/product/ProductInfo";
import { useNavigate } from "react-router-dom";
import { notifications } from "@mantine/notifications";

/* 
A React component that displays a product hero section for the Myst Detailing website.
This component fetches product details based on the provided product ID,
displays the product information, and allows users to view product images and purchase options.

@author IFD
*/
export default function ProductHero({
  checkout,
  product_id,
}: {
  checkout?: boolean;
  product_id: number;
}) {
  // Use the currency context to get the current exchange rate and currency
  const { rate, currency, loading } = useCurrency();

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // State to manage product loading and details
  const [loadingProduct, setLoadingProduct] = useState(true);

  // State to hold the formatted price and quantity
  const [price, setPrice] = useState("");

  // State to hold the quantity of the product
  const [quantity, setQuantity] = useState<string | number>("1");

  // State to hold the product details
  const [product, setProduct] = useState<Product>();

  /* 
  A useEffect hook that runs when the component mounts or when the product_id changes.
  It fetches the product details from the server using Axios.
  If the product is not found, it navigates to the home page and shows an error notification.
  If the product is found, it updates the product state with the fetched data.

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
        // Navigate to the home page if product not found
        navigate("/", {
          preventScrollReset: false,
        });
        notifications.show({
          title: "Error",
          message: "Product not found. Redirecting to home page.",
          color: "red",
        });

        window.scrollTo(0, 0);
      })
      .finally(() => {
        setLoadingProduct(false);
      });
  }, [product_id]);

  /* 
  A useEffect hook that runs when the component mounts or when the loading state,
  rate, currency, quantity, or loadingProduct changes.
  It calculates the price in the local currency based on the exchange rate,
  product price, and quantity. It formats the price using the 
  Intl.NumberFormat API and updates the price state.

  @author IFD
  */
  useEffect(() => {
    // Fetch the exchange rate for the new currency
    // and update the rate state
    if (loading || loadingProduct) {
      return;
    }

    const priceInLocalCurrency =
      rate * product?.product_price! * Number(quantity);

    const formattedPrice = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(priceInLocalCurrency);

    setPrice(formattedPrice);
  }, [loading, rate, currency, quantity, loadingProduct]);

  return (
    <Container maw={1200} mx="auto">
      {!loadingProduct ? (
        <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" py={120}>
          <div>
            <ProductInfo
              product={product}
              checkout={checkout}
              price={price}
              quantity={quantity}
              setQuantity={setQuantity}
            />
          </div>
          <div>
            <ProductImageCarousel images={product?.product_images} />
          </div>
        </SimpleGrid>
      ) : (
        <Center h={"80vh"}>
          <Loader type="dots" size={"lg"} color={"primary"} />
        </Center>
      )}
    </Container>
  );
}
