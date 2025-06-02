import { Container, Title, Text, Divider } from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";
import { Helmet } from "react-helmet-async";

export default function RefundPage() {
  return (
    <HeadFootLayout>
      <Helmet>
        <title>Myst Detailing | Refund Policy</title>
        <meta
          name="description"
          content="Learn about Myst Detailing's refund policy for the Car Extractor Kit. Find out how to request a refund and our terms for returns and exchanges."
        />
        <meta
          name="keywords"
          content="
      refund policy, returns, exchanges, Myst Detailing,
      car extractor kit refund, product returns, purchase refund Canada
    "
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mystdetailing.ca/refund-policy" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mystdetailing.ca/refund-policy"
        />
        <meta property="og:title" content="Myst Detailing | Refund Policy" />
        <meta
          property="og:description"
          content="Review Myst Detailing's refund and return policy for the Car Extractor Kit. Understand your rights and how to get a refund."
        />
        <meta
          property="og:image"
          content="https://mystdetailing.ca/images/og-extractor-kit.jpg"
        />
      </Helmet>

      <Container mb={"xl"} maw={1200} mx="auto">
        <Title order={1} style={{ textAlign: "center" }} my={"xl"}>
          Refund Policy
        </Title>
        <Divider my={50} />
        <Title order={3} my={"xl"}>
          Refunds
        </Title>
        <Text>
          At Myst, we take great care in the design, production, and fulfillment
          of each product — especially The Mystle. Because of the nature of our
          product and our commitment to quality, all sales are final.
        </Text>
        <Title order={3} my={"xl"}>
          All Sales Are Final
        </Title>
        <Text>
          We do not offer refunds, cancellations, or exchanges once an order has
          been placed and confirmed. Please review your order carefully before
          completing your purchase.
        </Text>
        <Title order={3} my={"xl"}>
          Exceptions – Damaged or Defective Products
        </Title>
        <Text>
          While all sales are final, we do make exceptions in cases of:
          {"\n"}
          <ul>
            <li>Products that arrive damaged during transit</li>
            <li>Items that are defective due to a manufacturing issue</li>
            <li>Incorrect items received</li>
          </ul>
        </Text>
        <Text>
          If you believe your product qualifies for an exception, you must
          notify us within 7 days of delivery with:
          {"\n"}
          <ol>
            <li>Your order number</li>
            <li>A description of the issue</li>
            <li>Clear photos or videos of the damage or defect</li>
          </ol>
        </Text>
        <Text>
          You can submit your claim by emailing mystdetailing@gmail.com. Each
          case is handled individually, and replacement or repair is provided at
          our discretion.
        </Text>
        <Title order={3} my={"xl"}>
          Important Notes
        </Title>
        <Text>
          <ul>
            <li>
              Claims submitted after the 7-day window may not be eligible for
              review.
            </li>
            <li>
              Items must be unused and in their original packaging for any
              return consideration.
            </li>
            <li>
              We reserve the right to reject claims that do not meet our
              exception criteria.
            </li>
          </ul>
        </Text>
        <Title order={3} my={"xl"}>
          Need Help?
        </Title>
        <Text>
          If you have any concerns about your order or experience an issue upon
          delivery, please don’t hesitate to contact us at
          mystdetailing@gmail.com. We’re here to ensure you feel confident and
          cared for — even in rare situations where something goes wrong.
        </Text>
      </Container>
    </HeadFootLayout>
  );
}
