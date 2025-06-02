import axios from "axios";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";
import HeadFootLayout from "../layouts/HeadFootLayout";
import {
  ActionIcon,
  Anchor,
  Button,
  Card,
  Center,
  Container,
  Divider,
  Group,
  Space,
  Table,
  Text,
  Title,
} from "@mantine/core";
import { useClipboard } from "@mantine/hooks";
import { IconCopy } from "@tabler/icons-react";
import { notifications } from "@mantine/notifications";
import { useCurrency } from "../context/CurrencyContext";
import MystLogo from "../components/ui/logo";
import { Helmet } from "react-helmet-async";

// A type definition for the checkout session data structure
type CheckoutSession = {
  session?: {
    status: string;
    [key: string]: any;
  };
  items?: any;
  order_id?: number;
};

/* 
A React component for the Checkout Success page of Myst Detailing.
It retrieves the checkout session details from the URL, displays a confirmation message,
and provides order summary information including order ID, date, customer details, and purchased items.

@author IFD
*/
export default function CheckoutSuccessPage() {
  // State to hold the checkout session details
  const [session, setSession] = useState<CheckoutSession>({});

  // Hook to navigate programmatically
  const navigate = useNavigate();

  // Hook to manage clipboard operations
  const clipboard = useClipboard();

  // Hook to get the user's country from the currency context
  const { country } = useCurrency();

  /* 
  A useEffect hook that runs when the component mounts.
  It retrieves the session ID from the URL parameters and fetches the checkout session status
  from the server using Axios. If the session ID is not found, it logs an error and navigates to the home page.
  If the session is successfully fetched, it updates the session state with the response data.

  @author IFD
  */
  useEffect(() => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const sessionId = urlParams.get("session_id");

    if (!sessionId) {
      console.error("No session ID found in the URL.");

      navigate("/");

      return;
    }

    axios
      .get(`${MYST_AUTH_ENDPOINTS.CHECKOUT.GET_SESSION(sessionId)}`)
      .then((response) => {
        setSession(response.data);
      })
      .catch((error) => {
        console.error("Error fetching session status:", error);

        navigate("/");
      });
  }, []);

  // If no session data is available, return null to avoid rendering
  if (!session.session) {
    return null;
  }

  // If the session status is "open", redirect to the checkout page
  if (session.session.status === "open") {
    return <Navigate to="/checkout" />;
  }

  // If the session status is "complete", render the confirmation page
  if (session.session.status === "complete") {
    return (
      <HeadFootLayout>
        <Helmet>
          <title>Myst Detailing | Confirmation</title>
          <meta
            name="description"
            content="Thank you for your purchase of the Myst Detailing Car Extractor Kit. Your order has been successfully processed."
          />
          <meta
            name="keywords"
            content="
                order confirmation, purchase success, Myst Detailing, car extractor kit,
                car detailing products, online order confirmation, Canada
              "
          />
          <meta name="robots" content="noindex, nofollow" />
          <link
            rel="canonical"
            href="https://mystdetailing.ca/checkout/success"
          />
        </Helmet>
        <Container>
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
                Thank You for Your Order!
              </Title>
              <Space h="md" />
              <Text ta={"center"}>
                Your order has been successfully processed. You will receive a
                confirmation email shortly.
              </Text>
              <Divider my="md" />
              <Title order={3} ta={"center"} mt="md">
                Order Summary
              </Title>
              <Space h="md" />
              <Group justify="space-between">
                <Text size="md" display={"flex"}>
                  Order ID:{" "}
                  <Text component="span" fw={"bold"} display={"flex"} ml={4}>
                    {session.order_id}
                  </Text>
                </Text>
                <Text size="md" display={"flex"}>
                  Date:{" "}
                  <Text component="span" fw={"bold"} display={"flex"} ml={4}>
                    {new Date(session.session.created * 1000).toLocaleString(
                      `en-${country.toUpperCase()}`,
                      {
                        dateStyle: "short",
                      },
                    )}
                  </Text>
                </Text>
              </Group>
              <Space h="md" />
              <Group gap={4} mb={4}>
                <Text size="sm">Name:</Text>
                <Text fw={"bold"} size="sm">
                  {session.session.customer_details.name ?? "N/A"}
                </Text>
              </Group>
              <Group gap={4} mb={4}>
                <Text size="sm">Email:</Text>
                <Text fw={"bold"} size="sm">
                  {session.session.customer_details.email ?? "N/A"}
                </Text>
              </Group>
              <Group gap={4} mb={4}>
                <Text size="sm">Shipping:</Text>
                <Text fw={"bold"} size="sm">
                  {session.session.collected_information.shipping_details
                    .address
                    ? `${
                        session.session.collected_information.shipping_details
                          .address.line1
                      }${
                        session.session.collected_information.shipping_details
                          .address.line2
                          ? `, ${session.session.collected_information.shipping_details.address.line2}`
                          : ""
                      }, ${
                        session.session.collected_information.shipping_details
                          .address.city
                      }, ${
                        session.session.collected_information.shipping_details
                          .address.state
                      } ${
                        session.session.collected_information.shipping_details
                          .address.postal_code
                      }, ${
                        session.session.collected_information.shipping_details
                          .address.country
                      }`
                    : "N/A"}
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
                    <Table.Td>{session.items.data[0].description}</Table.Td>
                    <Table.Td>{session.items.data[0].quantity}</Table.Td>
                    <Table.Td>
                      {session.items.data[0].currency.toLocaleUpperCase()}$
                      {(session.items.data[0].amount_total / 100).toFixed(2)}
                    </Table.Td>
                  </Table.Tr>
                </Table.Tbody>
              </Table>
              <Space h="xl" />
              <Text ta={"center"}>
                You can view updates on your order by entering your order number
                on the <Anchor href="/track-order">Track Your Order</Anchor>{" "}
                page.
              </Text>
              <Space h="xl" />
              <Button onClick={() => navigate("/")}>Return to Home</Button>
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
        </Container>
      </HeadFootLayout>
    );
  }

  return null;
}
