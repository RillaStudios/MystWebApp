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

export function CallToActionHero() {
  const { colorScheme } = useMantineColorScheme();

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
            <Button variant="filled" color="primary" size="md">
              Buy Now
            </Button>
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
