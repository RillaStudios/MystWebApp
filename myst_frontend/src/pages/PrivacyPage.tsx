import { Container, Title, Text, Divider } from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";
import { Helmet } from "react-helmet-async";

export default function PrivacyPage() {
  return (
    <HeadFootLayout>
      <Helmet>
        <title>Myst Detailing | Privacy Policy</title>
        <meta
          name="description"
          content="Read the privacy policy of Myst Detailing. Learn how we collect, use, and protect your personal information when you use our website and services."
        />
        <meta
          name="keywords"
          content="
              privacy policy, data protection, personal information, Myst Detailing,
              user privacy, Canada privacy laws, car detailing website privacy
            "
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mystdetailing.ca/privacy-policy" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mystdetailing.ca/privacy-policy"
        />
        <meta property="og:title" content="Myst Detailing | Privacy Policy" />
        <meta
          property="og:description"
          content="Understand how Myst Detailing handles your personal data and privacy on our site and services."
        />
        <meta
          property="og:image"
          content="https://mystdetailing.ca/images/og-extractor-kit.jpg"
        />
      </Helmet>

      <Container mb={"xl"} maw={1200} mx="auto">
        <Title order={1} style={{ textAlign: "center" }} my={"xl"}>
          Privacy Policy
        </Title>
        <Divider my={50} />
        <Text>Effective Date: May 25th, 2025</Text>
        <Text>
          At Myst, your privacy is important to us. This Privacy Policy outlines
          how we collect, use, and protect the personal information you provide
          when visiting our website, www.themyst.co, or interacting with us in
          any other way.
        </Text>
        <Text>
          By using our site, you agree to the collection and use of your
          information in accordance with this policy.
        </Text>
        <Title order={3} my={"xl"}>
          1. Information We Collect
        </Title>
        <Text>
          We collect the following types of information when you interact with
          our site:
          {"\n"}
          <ol type="a">
            <li>
              Personal Information
              <Text>
                When you place an order, create an account, or contact us, we
                may collect:
                {"\n"}
                <ul>
                  <li>Full name</li>
                  <li>Email address</li>
                  <li>Shipping and billing address</li>
                  <li>Phone number</li>
                  <li>
                    Payment information (processed securely via third-party
                    processors)
                  </li>
                </ul>
              </Text>
            </li>
            <li>
              Automatically Collected Information
              <Text>
                When you visit our site, we may automatically collect:
                {"\n"}
                <ul>
                  <li>IP address</li>
                  <li>Browser type and version</li>
                  <li>Device type</li>
                  <li>Pages visited and time spent on the site</li>
                  <li>Referral URL</li>
                  <li>Cookies and usage data (see Section 6)</li>
                </ul>
              </Text>
            </li>
          </ol>
        </Text>
        <Title order={3} my={"xl"}>
          2. How We Use Your Information
        </Title>
        <Text>
          We use your information to:
          {"\n"}
          <ul>
            <li>Process and fulfill orders</li>
            <li>Provide order confirmations and shipping updates</li>
            <li>Respond to customer inquiries or support requests</li>
            <li>Improve our website and shopping experience</li>
            <li>
              Send updates, marketing, or promotional emails (you can opt out at
              any time)
            </li>
            <li>Prevent fraudulent activity and ensure security</li>
          </ul>
        </Text>
        <Title order={3} my={"xl"}>
          3. How We Share Your Information
        </Title>
        <Text>
          We do not sell, trade, or rent your personal information to third
          parties. However, we may share your data with:
          {"\n"}
          <ul>
            <li>
              Service providers (e.g., payment processors, shipping partners)
            </li>
            <li>Marketing tools (e.g., email platforms, analytics services)</li>
            <li>
              Law enforcement or regulatory authorities if required by law
            </li>
          </ul>
          All third parties we work with are required to handle your data
          responsibly and securely.
        </Text>
        <Title order={3} my={"xl"}>
          4. Your Rights and Choices
        </Title>
        <Text>
          Depending on your location, you may have the right to:
          {"\n"}
          <ul>
            <li>Access, correct, or delete your personal information</li>
            <li>Opt out of marketing communications</li>
            <li>Request a copy of the data we have about you</li>
            <li>Withdraw consent (where applicable)</li>
          </ul>
          To make any of these requests, email us at mystdetailing@gmail.com.
        </Text>
        <Title order={3} my={"xl"}>
          5. Data Retention
        </Title>
        <Text>
          We retain your personal information only as long as necessary to
          fulfill the purposes outlined in this policy, including legal and
          accounting obligations. You can request deletion at any time.
        </Text>
        <Title order={3} my={"xl"}>
          6. Cookies & Tracking Technologies
        </Title>
        <Text>
          We use cookies and similar tracking technologies to:
          {"\n"}
          <ul>
            <li>Save your preferences</li>
            <li>Analyze website traffic and improve performance</li>
            <li>Provide a more personalized shopping experience</li>
          </ul>
          You can control cookie preferences through your browser settings or
          opt out of certain tracking (e.g., Google Analytics).
        </Text>
        <Title order={3} my={"xl"}>
          7. Data Security
        </Title>
        <Text>
          We implement appropriate security measures — including SSL encryption
          and secure servers — to protect your personal information. However, no
          method of transmission over the Internet is 100% secure, and we cannot
          guarantee absolute security.
        </Text>
        <Title order={3} my={"xl"}>
          8. Children’s Privacy
        </Title>
        <Text>
          Our website is not intended for children under 13. We do not knowingly
          collect personal information from children. If you believe a child has
          submitted information to us, please contact us and we will promptly
          delete it.
        </Text>
        <Title order={3} my={"xl"}>
          9. International Users
        </Title>
        <Text>
          If you are accessing our site from outside of Canada, be aware that
          your information will be transferred to and processed in Canada, where
          data protection laws may differ from those in your country.
        </Text>
        <Title order={3} my={"xl"}>
          10. Changes to This Policy
        </Title>
        <Text>
          We may update this Privacy Policy periodically. When we do, we will
          revise the “Effective Date” at the top of this page. Continued use of
          the site after changes are posted constitutes your acceptance of the
          revised policy.
        </Text>
        <Title order={3} my={"xl"}>
          11. Contact Us
        </Title>
        <Text>
          If you have questions about this Privacy Policy or how your data is
          used, contact us at mystdetailing@gmail.com.
        </Text>
      </Container>
    </HeadFootLayout>
  );
}
