import { Divider, Title, Image, Space, Text, Group, Box } from "@mantine/core";
import { type CheckoutContextValue } from "@stripe/react-stripe-js";

/* 
A React component that displays the order summary for a checkout process.
This component shows the product image, name, quantity, subtotal, taxes, and total amount.

@author IFD
*/
export default function OrderSummary({
  product_img_url,
  checkout,
  isMobile = false,
}: {
  product_img_url?: string;
  checkout: CheckoutContextValue;
  isMobile?: boolean;
}) {
  return (
    <>
      <Title order={3}>Order Summary</Title>
      <Divider mb={"sm"} />
      <Box w={isMobile ? 200 : 400} h={isMobile ? 200 : 400} mb="md">
        <Image
          src={product_img_url || "/images/no_prod_image.jpeg"}
          width={isMobile ? 200 : 400}
          height={isMobile ? 200 : 400}
          fit="fill"
          alt="Product Image"
          loading="eager"
          radius={"md"}
        />
      </Box>
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
