import {
  AddressElement,
  PaymentElement,
  useCheckout,
} from "@stripe/react-stripe-js";
import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  em,
  Grid,
  Group,
  Loader,
  LoadingOverlay,
  Space,
  Stepper,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import OrderSummary from "../ui/product/OrderSummary";
import {
  proccessCheckout,
  validateEmail,
} from "../../service/checkout_service";
import { useState } from "react";
import { notifications } from "@mantine/notifications";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";

/* 
A custom checkout component that integrates with Stripe's Checkout API.
It allows users to enter their email, shipping address, billing address,
and payment details in a step-by-step manner.

It uses Stripe's AddressElement and PaymentElement components
to handle address and payment information securely.

It also includes a summary of the order on the right side of the page.

@author IFD
@since 2025-05-27
*/
export default function CustomCheckout({
  product_img_url,
}: {
  product_img_url?: string;
  product_id: number;
}) {
  // Checkout state management
  const checkout = useCheckout();

  // Stepper state management
  const [active, setActive] = useState(0);

  // Email input state management
  const [email, setEmail] = useState("");

  // Email error state management
  const [emailError, setEmailError] = useState<string | null>(null);

  // Loading overlay state management
  const [visible, { open, close }] = useDisclosure(false);

  // Theming state management
  const { colorScheme } = useMantineColorScheme();

  //Media query to check if the screen is small
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  // Shipping and billing address state management
  const [shippingAddress, setShippingAddress] = useState<{
    address: {
      line1: string;
      line2: string | null;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    name: string;
  }>({
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "CA",
    },
    name: "",
  });

  // Billing address state management
  const [billingAddress, setBillingAddress] = useState<{
    address: {
      line1: string;
      line2: string | null;
      city: string;
      state: string;
      postal_code: string;
      country: string;
    };
    name: string;
  }>({
    address: {
      line1: "",
      line2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "CA",
    },
    name: "",
  });

  // State to track if the shipping and billing addresses are complete
  const [shippingAddressComplete, setShippingAddressComplete] = useState(false);
  const [billingAddressComplete, setBillingAddressComplete] = useState(false);

  // State to track if the billing address is the same as the shipping address
  const [sameAsShipping, setSameAsShipping] = useState(true);

  /* 
  A function to handle the next step in the checkout process.
  It increments the active step in the stepper, 
  ensuring it does not exceed the maximum step count (3 in this case).

  @author IFD
  @since 2025-05-27
  */
  const nextStep = async () => {
    if (active === 0) {
      if (!validateEmail(email)) {
        setEmailError("Email address is not valid.");
        return;
      }

      try {
        await checkout.updateEmail(email);
      } catch (error) {
        console.error("Error updating email:", error);
      }

      // Proceed to the next step
      setActive((current) => (current < 2 ? current + 1 : current));
    } else if (active === 1) {
      // Custom validation logic for shipping address here
      if (!shippingAddressComplete) {
        notifications.show({
          title: "Shipping address incomplete",
          message: "Please complete your shipping address.",
          color: "red",
          position: "bottom-center",
        });
        return;
      } else {
        await checkout.updateShippingAddress(shippingAddress);

        if (sameAsShipping) {
          setBillingAddress(shippingAddress);
          await checkout.updateBillingAddress(shippingAddress);
        } else {
          if (!billingAddressComplete) {
            notifications.show({
              title: "Billing address incomplete",
              message: "Please complete your billing address.",
              color: "red",
              position: "bottom-center",
            });
            return;
          } else {
            await checkout.updateBillingAddress(billingAddress);
          }
        }
      }

      setActive((current) => (current < 2 ? current + 1 : current));
    }
  };

  /* 
  A function to handle the previous step in the checkout process.
  It decrements the active step in the stepper,
  ensuring it does not go below 0.

  @author IFD
  @since 2025-05-27
  */
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  /* 
  A function to handle key down events in the form.
  It listens for the "Enter" key press and prevents the default form submission behavior,
  allowing the next step in the checkout process to be triggered instead.

  @author IFD
  @since 2025-05-27
  */
  const handleKeyDown = async (event: React.KeyboardEvent) => {
    if (event.key === "Enter") {
      event.preventDefault();
      if (active < 2) {
        nextStep();
      }
    }
  };

  // If no checkout object is available, show a loading indicator
  // This can happen if the Stripe Checkout context is not properly initialized
  // or if the component is rendered before the Stripe elements are ready.
  if (!checkout) {
    return (
      <Center style={{ height: "100vh" }}>
        <Loader size={"lg"} type="dots" c={"primary"} />
      </Center>
    );
  }

  // Render the checkout form with a stepper for navigation
  // It includes steps for entering personal details, address details, and payment method.
  return (
    <Container py={50} size={"lg"}>
      <Grid gutter="xl">
        <Grid.Col span={{ base: 12, md: 7 }}>
          <Box pos="relative">
            <LoadingOverlay
              visible={visible}
              zIndex={1000}
              overlayProps={{ radius: "sm", blur: 2 }}
              loaderProps={{ size: "xl", color: "primary", type: "dots" }}
            />
            <form
              onSubmit={async (event) => {
                event.preventDefault();

                open(); // Show loading overlay

                await proccessCheckout(checkout);

                close(); // Hide loading overlay
              }}
              onKeyDown={handleKeyDown}
            >
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
                <Stepper.Step label="Contact">
                  <Title order={3} mb={"sm"} mt={"lg"}>
                    Enter Your Email
                  </Title>
                  {active === 0 && (
                    <TextInput
                      label="Email"
                      placeholder="Enter your email"
                      value={email}
                      error={emailError}
                      onChange={(event) => {
                        setEmail(event.currentTarget.value);
                        setEmailError(null);
                      }}
                      required
                      styles={{
                        section: {
                          marginBottom: "1rem",
                        },
                        label: {
                          fontSize: "0.93rem",
                          marginBottom: "0.25rem",
                          transition:
                            "transform 0.5s cubic-bezier(0.19, 1, 0.22, 1), opacity 0.5s cubic-bezier(0.19, 1, 0.22, 1)",
                          fontFamily:
                            '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif',
                          fontWeight: 400,
                          lineHeight: "1.15",
                        },
                        input: {
                          padding: "0.75rem",
                          borderRadius: "5px",
                          border: `1px solid ${
                            colorScheme === "dark" ? "#444" : "#ccc"
                          }`,
                          boxShadow:
                            "0px 1px 1px rgba(0, 0, 0, 0.03), 0px 3px 6px rgba(0, 0, 0, 0.02)",
                          fontSize: "16px",
                          lineHeight: "1",
                          height: "auto",
                        },
                      }}
                    />
                  )}
                </Stepper.Step>

                {/* Address Details */}
                <Stepper.Step label="Address">
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
                        onChange={function (event) {
                          setShippingAddressComplete(event.complete);

                          if (event.complete) {
                            setShippingAddress({
                              address: event.value.address,
                              name: event.value.name,
                            });
                          }
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
                            onChange={function (event) {
                              setBillingAddressComplete(event.complete);

                              if (event.complete) {
                                setBillingAddress({
                                  address: event.value.address,
                                  name: event.value.name,
                                });
                              }
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
                  {active === 2 && (
                    <PaymentElement
                      key="payment"
                      options={{
                        fields: {
                          billingDetails: {
                            name: "never",
                            phone: "never",
                            address: {
                              line1: "never",
                              line2: "never",
                              city: "never",
                              state: "never",
                              postalCode: "never",
                              country: "never",
                            },
                          },
                        },
                      }}
                    />
                  )}
                </Stepper.Step>

                {/* Confirmation */}
                <Stepper.Completed>
                  Completed, click back button to get to previous step
                </Stepper.Completed>
              </Stepper>

              {/* Stepper Navigation */}
              <Group justify="center" mt="xl">
                {active > 0 && (
                  <Button
                    variant="outline"
                    w={isMobile ? "100%" : "auto"}
                    onClick={prevStep}
                  >
                    Back
                  </Button>
                )}
                <Button
                  key={`next-step-${active}`}
                  w={isMobile ? "100%" : "auto"}
                  onClick={active !== 2 ? nextStep : undefined}
                  type={active === 2 ? "submit" : "button"}
                >
                  {active === 2 ? "Place Order" : "Next step"}
                </Button>
              </Group>
            </form>
          </Box>
        </Grid.Col>
        <Grid.Col span={{ base: 12, md: 5 }}>
          {/* Order Summary Component */}
          <OrderSummary
            product_img_url={product_img_url}
            checkout={checkout}
            isMobile={isMobile}
          />
        </Grid.Col>
      </Grid>
    </Container>
  );
}
