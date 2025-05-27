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

export default function ProductHero({
  checkout,
  product_id,
}: {
  checkout?: boolean;
  product_id: number;
}) {
  const { rate, currency, loading } = useCurrency();
  const navigate = useNavigate();
  const [loadingProduct, setLoadingProduct] = useState(true);
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState<string | number>("1");
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

  // Price state
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
