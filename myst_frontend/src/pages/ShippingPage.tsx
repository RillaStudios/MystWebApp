import { Container, Title, Text, Divider } from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";
import { Helmet } from "react-helmet-async";

/* 
A React component for the Shipping Policy page of Myst Detailing.
This page outlines the shipping policy for the Car Extractor Kit, including processing times, shipping costs, order tracking, and delivery issues.

@author IFD
*/
export default function ShippingPage() {
  return (
    <HeadFootLayout>
      <Helmet>
        <title>Myst Detailing | Shipping Policy</title>
        <meta
          name="description"
          content="Explore Myst Detailing's shipping policy for the Car Extractor Kit. Learn about delivery times, shipping costs, and order tracking."
        />
        <meta
          name="keywords"
          content="
            shipping policy, delivery, order tracking, Myst Detailing,
            car extractor kit shipping, shipping Canada, shipping times, shipping costs
            "
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mystdetailing.ca/shipping-policy" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mystdetailing.ca/shipping-policy"
        />
        <meta property="og:title" content="Myst Detailing | Shipping Policy" />
        <meta
          property="og:description"
          content="Find out about delivery options, shipping costs, and order tracking for the Myst Detailing Car Extractor Kit."
        />
        <meta
          property="og:image"
          content="https://mystdetailing.ca/images/og-extractor-kit.jpg"
        />
      </Helmet>
      <Container mb={"xl"} maw={1200} mx="auto">
        <Title order={1} style={{ textAlign: "center" }} my={"xl"}>
          Shipping & Delivery Policy
        </Title>
        <Divider my={50} />
        <Title order={3} my={"xl"}>
          Processing Times
        </Title>
        <Text>
          Orders are processed within 1–2 business days (Monday through Friday,
          excluding holidays). Once your order is processed, you'll receive a
          confirmation email with tracking details as soon as your package
          ships.
        </Text>
        <Title order={3} my={"xl"}>
          Shipping Times
        </Title>
        <Text>
          Shipping times vary based on your location typically ranging from 5-14
          business days.
        </Text>
        <Title order={3} my={"xl"}>
          Order Tracking
        </Title>
        <Text>
          As soon as your order ships, we’ll send you a tracking number via
          email.
        </Text>
        <Text>
          If you haven’t received a tracking email after 3 business days, please
          check your spam folder or reach out to us at mystdetailing@gmail.com.
        </Text>
        <Title order={3} my={"xl"}>
          Delivery Issues
        </Title>
        <Text>
          If your package is delayed, missing, or marked as delivered but you
          haven't received it:
          {"\n"}
          <ul>
            <li>
              First, confirm the shipping address you entered was correct.
            </li>
            <li>Check with neighbors or your local carrier.</li>
            <li>
              If the issue persists, contact us at mystdetailing@gmail.com and
              we’ll do our best to assist you.
            </li>
          </ul>
        </Text>
        <Text>
          Please note: We are not responsible for packages lost or stolen after
          they have been marked as delivered by the carrier.
        </Text>
        <Title order={3} my={"xl"}>
          Shipping Restrictions
        </Title>
        <Text>
          We ship to most locations worldwide. However, some products may be
          restricted from shipping to certain countries or regions due to
          customs regulations. If you are unsure about shipping to your
          location, please contact us at mystdetailing@gmail.com
        </Text>
        <Title order={3} my={"xl"}>
          Questions?
        </Title>
        <Text>
          If you have any questions or concerns about shipping, delivery, or
          your order status, contact our support team at mystdetailing@gmail.com
          — we’re always happy to help.
        </Text>
      </Container>
    </HeadFootLayout>
  );
}
