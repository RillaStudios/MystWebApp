import {
  Box,
  Button,
  Container,
  Group,
  Space,
  TextInput,
  Title,
  Text,
  Center,
  LoadingOverlay,
  ActionIcon,
  Card,
  Anchor,
  Table,
  Divider,
} from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";
import { IconCopy, IconHash } from "@tabler/icons-react";
import { useState } from "react";
import axios from "axios";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";
import { notifications } from "@mantine/notifications";
import { useClipboard, useDisclosure } from "@mantine/hooks";
import MystLogo from "../components/ui/logo";
import { useCurrency } from "../context/CurrencyContext";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

// A type definition for the order details structure
type OrderDetails = {
  order: {
    [key: string]: any;
  };
  customer: {
    [key: string]: any;
  };
  product: {
    [key: string]: any;
  };
  addresses: {
    [key: string]: any;
  };
};

export default function TrackOrderPage() {
  // Order number state
  const [orderNumber, setOrderNumber] = useState("");

  // Order error state
  const [orderError, setOrderError] = useState("");

  // State to track if order details are in view
  const [orderInView, setOrderInView] = useState(false);

  // State to hold the order details
  const [orderDetails, setOrderDetails] = useState<OrderDetails | null>(null);

  // Mantine hooks for opening and closing the loading overlay
  const [visible, { open, close }] = useDisclosure(false);

  // Hook to get the user's country from the currency context
  const { country } = useCurrency();

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Hook to manage clipboard operations
  const clipboard = useClipboard();

  /* 
  A function to validate the order number input.

  It checks if the order number is empty, too short, or contains non-numeric characters.
  If any validation fails, it sets an appropriate error message and returns false.
  If validation passes, it clears the error message and returns true.

  @param {string}

  @return {boolean} - Returns true if the order number is valid, false otherwise.

  @author IFD
  */
  const validateOrderNumber = (number: string): boolean => {
    number = number.trim();

    if (number.length === 0) {
      setOrderError("Order number cannot be empty.");
      return false;
    } else if (number.length < 9) {
      setOrderError("Order number must be at least 8 characters long.");
      return false;
    } else if (!/^\d+$/.test(number)) {
      setOrderError("Order number must only contain numbers.");
      return false;
    } else {
      setOrderError("");
      return true;
    }
  };

  /* 
  A function to handle the order tracking process.
  It first validates the order number using the validateOrderNumber function.
  If the validation fails, it returns early without proceeding further.
  If the validation passes, it opens a loading overlay and makes an API call
  to fetch the order details using the provided order number.
  If the API call is successful, it sets the orderInView state to true and updates
  the orderDetails state with the fetched data.
  If the API call fails, it sets the orderInView state to false and displays an error notification
  based on the error response. If the error is a 404, it shows a "Order Not Found" notification.
  Finally, it closes the loading overlay.

  @author IFD
  */
  const handleTrackOrder = () => {
    if (!validateOrderNumber(orderNumber)) {
      return;
    }

    open();

    axios
      .get(
        `${MYST_AUTH_ENDPOINTS.ORDER.GET_ORDER_BY_ID(parseInt(orderNumber))}`,
      )
      .then((response) => {
        setOrderInView(true);
        // Here you would typically update the state to display the order details
        console.log("Order details:", response.data);

        setOrderDetails(response.data);
      })
      .catch((error) => {
        setOrderInView(false);

        console.error("Error fetching order details:", error);

        if (error.response.status === 404) {
          notifications.show({
            title: "Order Not Found",
            message: "No order found with the provided number.",
            color: "yellow",
            position: "bottom-center",
          });
        } else {
          if (error.response && error.response.data) {
            notifications.show({
              title: "Error",
              message:
                error.response.data.detail || "An unexpected error occurred.",
              color: "red",
              position: "bottom-center",
            });
          }
        }
      })
      .finally(() => {
        close();
      });
  };

  /* 
  A function to get the color associated with an order status.
  It takes a status string as input and returns a color string based on the status.

  @param {string} status - The order status to get the color for.

  @return {string} - Returns a color string corresponding to the order status.

  @author IFD
  */
  const getOrderStatusColor = (status: string) => {
    switch (status) {
      case "processing":
        return "orange";
      case "shipped":
        return "blue";
      case "delivered":
        return "green";
      case "cancelled":
        return "red";
      default:
        return "gray";
    }
  };

  /* 
  A function to get the shipping company name based on the company identifier.
  It takes a company string as input and returns a formatted company name.

  @param {string | null} company - The shipping company identifier.

  @return {string} - Returns the formatted shipping company name or "N/A" if the company is null.

  @author IFD
  */
  const getShippingCompanyName = (company: string | null) => {
    if (!company) return "N/A";

    switch (company.toLowerCase()) {
      case "fedex":
        return "FedEx";
      case "ups":
        return "UPS";
      case "dhl":
        return "DHL";
      case "canada_post":
        return "Canada Post";
      case "purolator":
        return "Purolator";
      default:
        return "Other";
    }
  };

  return (
    <HeadFootLayout>
      <Helmet>
        <title>Myst Detailing | Track Order</title>
        <meta
          name="description"
          content="Track your Myst Detailing Car Extractor Kit order. Enter your order details to get real-time updates on shipping and delivery status."
        />
        <meta
          name="keywords"
          content="
      track order, order tracking, shipping status, Myst Detailing,
      car extractor kit delivery, order updates, Canada
    "
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mystdetailing.ca/track-order" />

        {/* Open Graph */}
        <meta property="og:type" content="website" />
        <meta
          property="og:url"
          content="https://mystdetailing.ca/track-order"
        />
        <meta property="og:title" content="Myst Detailing | Track Order" />
        <meta
          property="og:description"
          content="Get real-time updates and track your Myst Detailing Car Extractor Kit order status and delivery."
        />
        <meta
          property="og:image"
          content="https://mystdetailing.ca/images/og-extractor-kit.jpg"
        />
      </Helmet>

      <Container my={"xl"}>
        <Title order={1} ta={"center"}>
          Track Your Order
        </Title>
        <Space h={"xl"} />
        <Group gap={"md"} justify={"center"} align={"end"}>
          <TextInput
            placeholder="Enter your order number"
            leftSection={<IconHash size={16} />}
            w={400}
            type="number"
            value={orderNumber}
            onChange={(event) => {
              if (event.currentTarget.value.length > 9) {
                return;
              }

              if (orderError) {
                setOrderError("");
              }

              return setOrderNumber(event.currentTarget.value);
            }}
            error={orderError}
          />
          <Button onClick={handleTrackOrder}>Track Order</Button>
        </Group>
        <Box pos={"relative"}>
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ size: "lg", color: "primary", type: "dots" }}
          />
          <Container>
            {orderInView ? (
              <Box mih={"50vh"}>
                <Space h={"xl"} />
                <Center w={"100%"}>
                  <Card
                    shadow="sm"
                    padding="lg"
                    my={"xl"}
                    radius="md"
                    w={"100%"}
                    maw={"550"}
                    withBorder
                  >
                    <Center>
                      <MystLogo width={200} />
                    </Center>
                    <Divider my="md" />
                    <Title order={2} ta={"center"}>
                      Order Details
                    </Title>
                    <Space h="md" />
                    <Center>
                      <Text ta={"center"} size="md" display={"flex"}>
                        Status:{" "}
                        <Text
                          component="span"
                          fw={"bold"}
                          display={"flex"}
                          ml={4}
                          c={getOrderStatusColor(
                            orderDetails?.order.order_status || "unknown",
                          )}
                        >
                          {orderDetails?.order.order_status
                            ? orderDetails.order.order_status
                                .charAt(0)
                                .toUpperCase() +
                              orderDetails.order.order_status.slice(1)
                            : "N/A"}
                        </Text>
                      </Text>
                    </Center>
                    {orderDetails?.order.shipping_company && (
                      <>
                        <Divider my="md" />
                        <Title order={3} ta={"center"}>
                          Tracking
                        </Title>
                        <Space h="md" />
                        <Group justify="space-between">
                          <Text size="md" display={"flex"}>
                            Company:{" "}
                            <Text
                              component="span"
                              fw={"bold"}
                              display={"flex"}
                              ml={4}
                            >
                              {getShippingCompanyName(
                                orderDetails?.order.shipping_company,
                              )}
                            </Text>
                          </Text>
                          <Text size="md" display={"flex"}>
                            Tracking #:{" "}
                            <Text
                              component="span"
                              fw={"bold"}
                              display={"flex"}
                              ml={4}
                            >
                              {orderDetails?.order.tracking_number || "N/A"}
                            </Text>
                          </Text>
                        </Group>
                      </>
                    )}
                    <Divider my="md" />
                    <Title order={3} ta={"center"} mt="md">
                      Order Summary
                    </Title>
                    <Space h="md" />
                    <Group justify="space-between">
                      <Text size="md" display={"flex"}>
                        Order ID:{" "}
                        <Text
                          component="span"
                          fw={"bold"}
                          display={"flex"}
                          ml={4}
                        >
                          {orderDetails?.order.order_id}
                        </Text>
                      </Text>
                      <Text size="md" display={"flex"}>
                        Date:{" "}
                        <Text
                          component="span"
                          fw={"bold"}
                          display={"flex"}
                          ml={4}
                        >
                          {new Date(
                            orderDetails?.order.order_date * 1000,
                          ).toLocaleString(`en-${country.toUpperCase()}`, {
                            dateStyle: "short",
                          })}
                        </Text>
                      </Text>
                    </Group>
                    <Space h="md" />
                    <Group gap={4} mb={4}>
                      <Text size="sm">Name:</Text>
                      <Text fw={"bold"} size="sm">
                        {orderDetails?.customer.customer_name ?? "N/A"}
                      </Text>
                    </Group>
                    <Group gap={4} mb={4}>
                      <Text size="sm">Email:</Text>
                      <Text fw={"bold"} size="sm">
                        {orderDetails?.customer.customer_email ?? "N/A"}
                      </Text>
                    </Group>
                    <Group gap={4} mb={4}>
                      <Text size="sm">Shipping:</Text>
                      <Text fw={"bold"} size="sm">
                        {(() => {
                          if (!orderDetails || !orderDetails.addresses)
                            return "N/A";

                          // Find shipping address
                          const shippingAddress = Array.isArray(
                            orderDetails.addresses,
                          )
                            ? orderDetails.addresses.find(
                                (addr) => addr.address_type === "shipping",
                              )
                            : null;

                          if (!shippingAddress) return "N/A";

                          const addr = shippingAddress;
                          return `${addr.street_address_one}${
                            addr.street_address_two
                              ? `, ${addr.street_address_two}`
                              : ""
                          }, ${addr.city}, ${addr.prov_state} ${
                            addr.postal_zip_code
                          }, ${addr.country.toUpperCase()}`;
                        })()}
                      </Text>
                    </Group>
                    <Space h="xl" />
                    <Table>
                      <Table.Thead>
                        <Table.Tr>
                          <Table.Th>Item</Table.Th>
                          <Table.Th>Quantity</Table.Th>
                          <Table.Th>Price</Table.Th>
                        </Table.Tr>
                      </Table.Thead>
                      <Table.Tbody>
                        <Table.Tr>
                          <Table.Td>
                            {orderDetails?.product.product_name ?? "N/A"}
                          </Table.Td>
                          <Table.Td>
                            {orderDetails?.order.quantity ?? "N/A"}
                          </Table.Td>
                          <Table.Td>
                            {orderDetails?.order.currency.toLocaleUpperCase() ??
                              "N/A"}
                            ${orderDetails?.order.total_amount ?? "N/A"}
                          </Table.Td>
                        </Table.Tr>
                      </Table.Tbody>
                    </Table>
                    <Space h="xl" />
                    <Button onClick={() => navigate("/")}>
                      Return to Home
                    </Button>
                    <Space h="xl" />
                    <Group gap={4} align="center" justify="center">
                      <Text ta="center" size="sm" p={0} m={0}>
                        If you have any questions, please email{" "}
                      </Text>
                      <Anchor size="sm">mystdetailing@gmail.com</Anchor>
                      <ActionIcon
                        size="xs"
                        variant="transparent"
                        onClick={() => {
                          clipboard.copy("mystdetailing@gmail.com");
                          notifications.show({
                            title: "Email Copied",
                            message:
                              "mystdetailing@gmail.com successfully copied to clipboard",
                            color: "green",
                            autoClose: 2000,
                            position: "bottom-center",
                          });
                        }}
                      >
                        <IconCopy
                          style={{ width: "100%", height: "100%" }}
                          stroke={1.5}
                        />
                      </ActionIcon>
                    </Group>
                  </Card>
                </Center>
              </Box>
            ) : (
              <Box h={"50vh"}>
                <Center h={"100%"}>
                  <Text c="dimmed">Order details will appear here.</Text>
                </Center>
              </Box>
            )}
          </Container>
        </Box>
      </Container>
    </HeadFootLayout>
  );
}
