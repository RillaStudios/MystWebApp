import { Container, Title, Text, Divider, Anchor } from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";
import { Helmet } from "react-helmet-async";

export default function TermsPage() {
  return (
    <HeadFootLayout>
      <Helmet>
        <title>Myst Detailing | Terms and Conditions</title>
        <meta
          name="description"
          content="Read the Terms and Conditions of Myst Detailing. Understand the rules, user responsibilities, and legal agreements for using our website and purchasing our Car Extractor Kit."
        />
        <meta
          name="keywords"
          content="
      terms and conditions, user agreement, Myst Detailing,
      car extractor kit terms, website usage policy, purchase agreement, Canada
    "
        />
        <meta name="robots" content="index, follow" />
        <link
          rel="canonical"
          href="https://mystdetailing.ca/terms-and-conditions"
        />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mystdetailing.ca/terms-and-conditions"
        />
        <meta
          property="og:title"
          content="Myst Detailing | Terms and Conditions"
        />
        <meta
          property="og:description"
          content="Review the Terms and Conditions governing the use of Myst Detailing’s website and purchases of the Car Extractor Kit."
        />
        <meta
          property="og:image"
          content="https://mystdetailing.ca/images/og-extractor-kit.jpg"
        />
      </Helmet>

      <Container mb={"xl"} maw={1200} mx="auto">
        <Title order={1} style={{ textAlign: "center" }} my={"xl"}>
          Terms and Conditions
        </Title>
        <Divider my={50} />
        <Text>
          Welcome to Myst. These Terms and Conditions (“Terms”) govern your
          access to and use of our website located at www.mystdetailing.ca (the
          “Site”) and any services, content, or products made available through
          the Site. By accessing or using our Site, you agree to be bound by
          these Terms.
        </Text>
        <Title order={3} my={"xl"}>
          1. Use of the Site
        </Title>
        <Text>
          You may use this Site for personal, non-commercial purposes only. You
          agree not to:
          {"\n"}
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Use the Site for fraudulent or harmful purposes</li>
            <li>
              Attempt to gain unauthorized access to any part of the Site or its
              systems
            </li>
            <li>
              Use the Site to infringe upon the intellectual property rights of
              Myst or others
            </li>
            <li>
              Use any robot, spider, or other automated means to access the Site
              for any purpose without our express written permission
            </li>
          </ul>
        </Text>
        <Text>
          You may not copy, reproduce, modify, distribute, or exploit any
          content from this Site without prior written permission from Myst.
        </Text>
        <Title order={3} my={"xl"}>
          2. Intellectual Property
        </Title>
        <Text>
          All content on this Site — including text, graphics, logos, images,
          videos, product designs, and software — is the property of Myst or its
          licensors and is protected by copyright, trademark, and other
          intellectual property laws.
        </Text>
        <Text>
          You may not copy, reproduce, modify, distribute, or exploit any
          content from this Site without prior written permission from Myst.
        </Text>
        <Title order={3} my={"xl"}>
          3. Product Information & Pricing
        </Title>
        <Text>
          We strive to ensure that product descriptions, pricing, and
          availability are accurate. However, we reserve the right to:
          {"\n"}
          <ul>
            <li>Correct any errors or omissions</li>
            <li>
              Change or update information at any time without prior notice
            </li>
            <li>
              Cancel orders if information on the Site is inaccurate, including
              pricing errors
            </li>
          </ul>
          All prices listed are in CAD unless otherwise noted.
        </Text>
        <Title order={3} my={"xl"}>
          4. Orders and Payment
        </Title>
        <Text>
          When you place an order, you agree to provide accurate, current, and
          complete information. All payments must be made using approved payment
          methods listed on the Site.
        </Text>
        <Text>
          Myst reserves the right to refuse or cancel any order at our sole
          discretion, including orders we suspect are fraudulent or violate
          these Terms.
        </Text>
        <Title order={3} my={"xl"}>
          5. Returns & Refunds
        </Title>
        <Text>
          All sales are final. Please review our{" "}
          <Anchor href="/refund">Refund Policy</Anchor> for more information on
          exceptions in the case of damaged or defective items.
        </Text>
        <Title order={3} my={"xl"}>
          6. Shipping
        </Title>
        <Text>
          Shipping timelines are estimates and not guarantees. Myst is not
          responsible for delays caused by carriers or customs. Please review
          our <Anchor href="/shipping">Shipping Policy</Anchor> for full
          details.
        </Text>
        <Title order={3} my={"xl"}>
          7. Disclaimer of Warranties
        </Title>
        <Text>
          Except as expressly stated in our{" "}
          <Anchor href="/warranty">Warranty Policy</Anchor>, all products and
          services are provided “as is” and “as available” without warranties of
          any kind, either express or implied. Myst disclaims all warranties,
          including but not limited to merchantability, fitness for a particular
          purpose, and non-infringement.
        </Text>
        <Title order={3} my={"xl"}>
          8. Limitation of Liability
        </Title>
        <Text>
          To the fullest extent permitted by law, Myst and its affiliates shall
          not be liable for any indirect, incidental, special, or consequential
          damages arising from your use of the Site or products purchased
          through it.
        </Text>
        <Title order={3} my={"xl"}>
          9. Indemnification
        </Title>
        <Text>
          You agree to indemnify, defend, and hold harmless Myst and its
          affiliates from and against any claims, damages, losses, liabilities,
          and expenses arising out of or related to your use of the Site or
          violation of these Terms.
        </Text>
        <Title order={3} my={"xl"}>
          10. Changes to Terms
        </Title>
        <Text>
          Myst reserves the right to modify or update these Terms at any time.
          Changes will be posted on this page with a revised effective date.
          Your continued use of the Site after any changes constitutes your
          acceptance of the updated Terms.
        </Text>
        <Title order={3} my={"xl"}>
          11. Governing Law
        </Title>
        <Text>
          These Terms shall be governed by and construed in accordance with the
          laws of the State of Prince Edward Island, without regard to conflict
          of law principles. Any disputes shall be resolved exclusively in the
          state or federal courts located in Canada, Prince Edward Island.
        </Text>
        <Title order={3} my={"xl"}>
          12. Contact Us
        </Title>
        <Text>
          For questions or concerns regarding these Terms and Conditions, please
          contact us at mystdetailing@gmail.com.
        </Text>
      </Container>
    </HeadFootLayout>
  );
}
