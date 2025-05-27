import React, { useEffect, useState } from "react";
import {
  useCheckout,
  PaymentElement,
  AddressElement,
} from "@stripe/react-stripe-js";
import type { StripeCheckoutConfirmResult } from "@stripe/stripe-js";
import HeadFootLayout from "../../layouts/HeadFootLayout";
import {
  Button,
  Container,
  Divider,
  Grid,
  Group,
  Space,
  Stepper,
  Title,
  Text,
  Image,
  TextInput,
  Checkbox,
} from "@mantine/core";
import axios from "axios";
import { MYST_AUTH_ENDPOINTS } from "../../config/myst_api";
import { notifications } from "@mantine/notifications";

export default function CustomCheckout({
  product_img_url,
}: {
  product_img_url?: string;
}) {
  const checkout = useCheckout();
  const [sameAsShipping, setSameAsShipping] = useState(true);
  const [active, setActive] = useState(0);

  const nextStep = () => {
    if (active === 0) {
      const { email } = personalInfo;
      if (!email) {
        notifications.show({
          title: "Missing Email",
          message: "Please fill in email field.",
          color: "red",
        });
        return;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          notifications.show({
            title: "Invalid Email",
            message: "Please enter a valid email address.",
            color: "red",
          });
          return;
        }
      }
    }
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  if (!checkout) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    axios
      .get(MYST_AUTH_ENDPOINTS.PRODUCT.GET_BY_ID(1))
      .then((response) => {
        // You can use the product data here if needed
        console.log("Product data:", response.data);
      })
      .catch((error) => {
        console.error("Error fetching product data:", error);
        // Handle the error (e.g., show an error message to the user)
      });
  }, [checkout.lineItems[0].id]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const result: StripeCheckoutConfirmResult = await checkout.confirm();

    if (result.type === "error") {
      console.error(result.error);
      // Handle the error (e.g., show an error message to the user)
    } else {
      // Payment succeeded
      console.log("Payment succeeded");
      // Handle successful payment (e.g., show a success message, redirect to a confirmation page)
    }
  };

  const [personalInfo, setPersonalInfo] = useState({
    email: "",
  });

  const handlePersonalInfoChange = (field: string, value: string) => {
    setPersonalInfo((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <HeadFootLayout>
      <Container py={50} size={"lg"}>
        <Grid gutter="xl">
          <Grid.Col span={{ base: 12, md: 7 }}>
            <form onSubmit={handleSubmit}>
              <Title order={3}>Complete Your Purchase</Title>
              <Divider mb={"sm"} />
              <Space h="lg" />
              <Stepper
                active={active}
                onStepClick={setActive}
                size="md"
                wrap={false}
                allowNextStepsSelect={false}
              >
                {/* Personal Details */}
                <Stepper.Step label="Contact Info">
                  <Title order={3} mb={"sm"} mt={"lg"}>
                    Enter Your Email
                  </Title>
                  {active === 0 && (
                    <TextInput
                      label="Email"
                      placeholder="Enter your email"
                      value={personalInfo.email}
                      onChange={(e) => {
                        handlePersonalInfoChange(
                          "email",
                          e.currentTarget.value,
                        );
                      }}
                      required
                      type="email"
                      className="email-input"
                    />
                  )}
                </Stepper.Step>

                {/* Address Details */}
                <Stepper.Step label="Shipping">
                  <Title order={3} mb={"sm"} mt={"lg"}>
                    Shipping Address
                  </Title>
                  {active === 1 && (
                    <>
                      <AddressElement
                        key="shipping"
                        options={{
                          mode: "shipping",
                        }}
                      />

                      <Space h="xl" />

                      <Checkbox
                        label="Billing address same as shipping address"
                        checked={sameAsShipping}
                        onChange={function (event) {
                          if (event.currentTarget.checked) {
                            checkout.billingAddress = checkout.shippingAddress;
                          }

                          return setSameAsShipping(event.currentTarget.checked);
                        }}
                        mb="xl"
                      />

                      {!sameAsShipping && (
                        <>
                          <Title order={3} mb={"sm"}>
                            Billing Address
                          </Title>
                          <AddressElement
                            key="billing"
                            options={{
                              mode: "billing",
                            }}
                          />
                        </>
                      )}
                    </>
                  )}
                </Stepper.Step>

                {/* Card Details */}
                <Stepper.Step label="Payment">
                  <Title order={3} mb={"sm"} mt={"lg"}>
                    Payment Method
                  </Title>
                  {active === 2 && <PaymentElement key="payment" />}
                </Stepper.Step>

                {/* Confirmation */}
                <Stepper.Completed>
                  Completed, click back button to get to previous step
                </Stepper.Completed>
              </Stepper>

              <Group justify="center" mt="xl">
                {active > 0 && (
                  <Button variant="outline" onClick={prevStep}>
                    Back
                  </Button>
                )}
                <Button onClick={nextStep}>Next step</Button>
              </Group>
            </form>
          </Grid.Col>
          <Grid.Col span={{ base: 12, md: 5 }}>
            <Title order={3}>Order Summary</Title>
            <Divider mb={"sm"} />
            <Image
              src={product_img_url || "images/no_prod_image.jpeg"}
              alt="Product Image"
              mb="md"
              radius={"md"}
            />
            <Text>
              {checkout.lineItems[0].name} x {checkout.lineItems[0].quantity}
            </Text>
            <Space h="xs" />
            <Divider mb="md" />
            <Text>Subtotal: {checkout.total.subtotal.amount}</Text>
            <Space h="xs" />
            <Text>
              Tax:{" "}
              {checkout.total.taxExclusive.amount + checkout.tax.status ||
                "0.00"}
            </Text>
            <Space h="xs" />
            <Divider mb="md" />
            <Text>Total: {checkout.total.total.amount}</Text>
          </Grid.Col>
        </Grid>
      </Container>
    </HeadFootLayout>
  );
}
