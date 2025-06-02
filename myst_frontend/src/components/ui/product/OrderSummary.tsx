import { Divider, Title, Image, Space, Text, Group } from "@mantine/core";
import { type CheckoutContextValue } from "@stripe/react-stripe-js";

/* 
A React component that displays the order summary for a checkout process.
This component shows the product image, name, quantity, subtotal, taxes, and total amount.

@author IFD
*/
export default function OrderSummary({
  product_img_url,
  checkout,
}: {
  product_img_url?: string;
  checkout: CheckoutContextValue;
}) {
  return (
    <>
      <Title order={3}>Order Summary</Title>
      <Divider mb={"sm"} />
      <Image
        src={product_img_url || "images/no_prod_image.jpeg"}
        width={400}
        height={400}
        fit="fill"
        alt="Product Image"
        mb="md"
        loading="eager"
        radius={"md"}
      />
      <Text size="sm">
        {checkout.lineItems[0].name} x {checkout.lineItems[0].quantity}
      </Text>
      <Space h="xs" />
      <Divider mb="md" />
      <Group justify="space-between" mb={"3"}>
        <Text size="sm">Subtotal</Text>
        <Text size="sm">{checkout.total.subtotal.amount}</Text>
      </Group>
      <Group justify="space-between" mb={"xs"}>
        <Text size="sm">Taxes</Text>
        <Text size="sm">Included</Text>
      </Group>
      <Group justify="space-between">
        <Text fw={"bold"} size="xl">
          Total
        </Text>
        <Text fw={"bold"} size="xl">
          {checkout.total.total.amount}
        </Text>
      </Group>
    </>
  );
}
