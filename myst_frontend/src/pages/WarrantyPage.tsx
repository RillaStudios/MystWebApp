import { Container, Title, Text, Divider } from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";

export default function WarrantyPage() {
  return (
    <HeadFootLayout>
      <Container mb={"xl"} maw={1200} mx="auto">
        <Title order={1} style={{ textAlign: "center" }} my={"xl"}>
          The Mystle – 1-Year Limited Warranty
        </Title>
        <Divider my={50} />
        <Title order={3} my={"xl"}>
          What This Warranty Covers
        </Title>
        <Text>
          This warranty covers defects in materials and workmanship under normal
          use and proper care for a period of one (1) year from the date of
          purchase.
        </Text>
        <Text>
          Specifically, the warranty applies to:
          {"\n"}
          <ul>
            <li>Malfunctions due to manufacturing defects</li>
            <li>
              Failures of internal components or parts under normal household
              usage
            </li>
            <li>
              Structural or functional flaws not caused by external factors
            </li>
          </ul>
        </Text>
        <Text>
          If a covered defect arises and a valid claim is received within the
          warranty period, Myst will, at its discretion:
          {"\n"}
          <ul>
            <li>Repair The Mystle using new or refurbished parts,</li>
            <li>
              Replace The Mystle with a new or refurbished product of equal
              value, or
            </li>
            <li>Refund the original purchase price with proof of purchase.</li>
          </ul>
        </Text>
        <Title order={3} my={"xl"}>
          What This Warranty Covers
        </Title>
        <Text>
          This limited warranty does not cover:
          {"\n"}
          <ul>
            <li>
              Normal wear and tear (including scratches, fading, or
              discoloration)
            </li>
            <li>
              Damage due to accident, misuse, abuse, neglect, fire, liquid
              contact, or other external causes
            </li>
            <li>Improper care, maintenance, or cleaning</li>
            <li>Unauthorized modifications or repairs</li>
            <li>Loss or theft</li>
            <li>
              Use of The Mystle outside of its intended purpose or in
              commercial/industrial settings
            </li>
          </ul>
        </Text>
        <Title order={3} my={"xl"}>
          How to Make a Warranty Claim
        </Title>
        <Text>
          To initiate a warranty claim, please contact our customer support team
          with the following:
          {"\n"}
          <ol>
            <li>
              Your original proof of purchase (receipt or order confirmation)
            </li>
            <li>A detailed description of the issue</li>
            <li>Photos or videos showing the defect (if applicable)</li>
          </ol>
          {"\n"}
          You can submit your claim via email. Please email us at
          mystdetailing@gmail.com. Please allow 2–3 business days for a
          response.
        </Text>
        <Title order={3} my={"xl"}>
          Shipping Costs
        </Title>
        <Text>
          You are responsible for all shipping costs related to returns,
          replacements, or repairs.
        </Text>
        <Title order={3} my={"xl"}>
          Limitations & Legal Rights
        </Title>
        <Text>
          This warranty gives you specific legal rights. You may also have other
          rights, which vary by state or country.
        </Text>
        <Text>
          The Mystle 1-Year Limited Warranty is non-transferable and only
          applies to purchases made directly from Myst.
        </Text>
        <Title order={3} my={"xl"}>
          Need Help?
        </Title>
        <Text>
          We’re here for you. For questions about your warranty or help with
          your product, reach out to our support team anytime at
          mystdetailing@gmail.com.
        </Text>
      </Container>
    </HeadFootLayout>
  );
}
