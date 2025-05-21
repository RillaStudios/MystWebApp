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
import classes from "../../css/CallToActionHero.module.css";

export function CallToActionHero() {
  const { colorScheme } = useMantineColorScheme();

  const isDark = colorScheme === "dark";

  return (
    <div className={classes.wrapper}>
      <Overlay
        bg={isDark ? "orange.7" : "orange.5"}
        color={isDark ? "#fff" : "#000"}
        opacity={isDark ? 0.85 : 0.75}
        zIndex={1}
      />

      <div className={classes.inner}>
        <Title className={classes.title}>
          The{" "}
          <Text component="span" inherit c={"dark"}>
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
            <Button variant="filled" color="dark" size="md">
              Buy Now
            </Button>
            <Button
              size="md"
              variant="outline"
              color="white"
              styles={{
                root: {
                  borderColor: "white",
                },
              }}
            >
              Learn More
            </Button>
          </Group>
        </Center>
      </div>
    </div>
  );
}
