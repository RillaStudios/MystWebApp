import { Space, Spoiler, Title, Text, Group } from "@mantine/core";
import type { Product } from "../../../types/Product";
import ProductQuantitySelect from "./ProductQuantitySelect";
import BuyNowButton from "../buttons/buy_now_button";

/* 
A React component that displays product information for the Myst Detailing website.
This component shows the product name, description, price, and a "Buy Now" button.
It also includes a quantity selector when in checkout mode.

@author IFD
*/
export default function ProductInfo({
  product,
  checkout = false,
  price = "",
  quantity,
  setQuantity,
}: {
  product?: Product;
  checkout?: boolean;
  price?: string;
  quantity: string | number;
  setQuantity: (value: string | number) => void;
}) {
  return (
    <>
      <Title order={1}>{product?.product_name || "Undefined"}</Title>
      <Space h={20} />
      <Spoiler maxHeight={150} showLabel="Read more" hideLabel="Hide">
        {product?.product_description ? (
          product.product_description.split("\n").map((paragraph, index) => (
            <Text pb={5} key={index}>
              {paragraph}
            </Text>
          ))
        ) : (
          <Text pb={5}>Loading product description...</Text>
        )}
      </Spoiler>
      <Space h={20} />
      {checkout ? (
        <Group gap={4} align="end">
          <Title order={2} fw={"bold"} lh={1}>
            {price}
          </Title>
          <Text size="xs" c="dimmed" pl={4}>
            All Taxes Included
          </Text>
        </Group>
      ) : (
        <Title order={2} fw={"bold"}>
          {price || "Undefined"}
        </Title>
      )}
      <Space h={20} />
      {checkout && (
        <>
          <ProductQuantitySelect
            quantity={quantity}
            setQuantity={setQuantity}
          />
          <Space h={20} />
        </>
      )}
      <BuyNowButton
        checkoutButton={checkout}
        quantity={typeof quantity === "string" ? parseInt(quantity) : quantity}
        product_id={1}
        size="lg"
      />
    </>
  );
}
