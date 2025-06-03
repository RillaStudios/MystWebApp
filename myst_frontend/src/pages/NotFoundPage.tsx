import { Button, Center, Stack, Text } from "@mantine/core";
import HeadFootLayout from "../layouts/HeadFootLayout";
import { IconError404 } from "@tabler/icons-react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet-async";

/* 
A simple 404 page that displays a message when the user navigates to a non-existent route.
This page is rendered when the user tries to access a route that does not exist.

@returns {JSX.Element} The 404 page component.

@author IFD
*/
export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <HeadFootLayout>
      <Helmet>
        <title>Myst Detailing | 404 Not Found</title>
        <meta
          name="description"
          content="Sorry, we couldn't find the page you were looking for on Myst."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <Center>
        <Stack justify="center" align="center" style={{ height: "80vh" }}>
          <IconError404 size={200} color={"var(--mantine-color-primary-5)"} />
          <Text c="dimmed" size="lg">
            Sorry, we couldn't find the page you were looking for.
          </Text>
          <Button onClick={() => navigate("/")}>Back to Home</Button>
        </Stack>
      </Center>
    </HeadFootLayout>
  );
}
