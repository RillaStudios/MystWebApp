import {
  Button,
  Center,
  Container,
  Group,
  Overlay,
  Text,
  Title,
} from "@mantine/core";
import classes from "../../css/CallToActionHero.module.css";

export function CallToActionHero() {
  return (
    <div className={classes.wrapper}>
      <Overlay bg={"orange.4"} color="#000" opacity={0.65} zIndex={1} />

      <div className={classes.inner}>
        <Title className={classes.title}>
          Automated AI code reviews for{" "}
          <Text component="span" inherit className={classes.highlight}>
            any stack
          </Text>
        </Title>

        <Container size={640}>
          <Text size="lg" className={classes.description}>
            Build more reliable software with AI companion. AI is also trained
            to detect lazy developers who do nothing and just complain on
            Twitter.
          </Text>
        </Container>

        <Center mt="lg">
          <Group>
            <Button variant="filled" bg={"primary.5"} size="md">
              Buy Now
            </Button>
            <Button size="md" variant="outline">
              Learn More
            </Button>
          </Group>
        </Center>
      </div>
    </div>
  );
}
