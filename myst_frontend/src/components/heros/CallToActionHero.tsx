import {
  Button,
  Center,
  Container,
  Group,
  Overlay,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { HashLink } from "react-router-hash-link";
import classes from "../../css/CallToActionHero.module.css";
import BuyNowButton from "../ui/buttons/buy_now_button";

/* 
A React component that displays a call-to-action hero section for the Myst Detailing website.
This component includes a title, a description, and buttons for purchasing and learning more about the Mystle product.

@author IFD
*/
export function CallToActionHero() {
  // Use Mantine's color scheme to determine if the theme is dark or light
  const { colorScheme } = useMantineColorScheme();

  // Determine if the current color scheme is dark
  const isDark = colorScheme === "dark";

  return (
    <div className={classes.wrapper}>
      <Overlay
        bg={isDark ? "dark" : "light"}
        color={isDark ? "#fff" : "#000"}
        opacity={0.8}
        zIndex={1}
      />

      <div className={classes.inner}>
        <Title className={classes.title}>
          The{" "}
          <Text component="span" inherit c={"primary"}>
            Ultimate
          </Text>{" "}
          Extractor Kit
        </Title>

        <Container size={640}>
          <Text size="md" className={classes.description}>
            Powerful. Portable. Precision Cleaning by Myst – Because Your Car
            Deserves More Than a Wipe Down.
          </Text>
        </Container>

        <Center mt="lg">
          <Group>
            <BuyNowButton product_id={1} quantity={1} isMobile={false} />
            <Button
              component={HashLink}
              to="/#mystle"
              smooth
              size="md"
              variant="outline"
              color="white"
            >
              Learn More
            </Button>
          </Group>
        </Center>
      </div>
    </div>
  );
}
