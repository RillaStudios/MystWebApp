import { IconDashboard, IconBarbell, IconHomeSpark } from "@tabler/icons-react";
import {
  Badge,
  Card,
  Container,
  Group,
  SimpleGrid,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import classes from "../../css/FeatureCard.module.css";

const mockdata = [
  {
    title: "Deep cleaning power",
    description:
      "Effectively clean carpets, upholstery, and soft surfaces with ease, tackling stubborn stains and dirt.",
    icon: IconDashboard,
  },
  {
    title: "Long lasting durability",
    description:
      "Includes a 10ft anti-crush vacuum hose and 25ft water line made for maximum durability and reach during large or small cleaning jobs.",
    icon: IconBarbell,
  },
  {
    title: "Professional results at home",
    description:
      "Achieve professional-grade carpet cleaning without the cost of traditional carpet extractors.",
    icon: IconHomeSpark,
  },
];

export function FeaturesCardHero() {
  const theme = useMantineTheme();

  const features = mockdata.map((feature) => (
    <Card
      key={feature.title}
      shadow="md"
      radius="md"
      className={classes.card}
      padding="xl"
    >
      <feature.icon size={50} stroke={1.5} color={theme.colors.primary[6]} />
      <Text fz="lg" fw={500} className={classes.cardTitle} mt="md">
        {feature.title}
      </Text>
      <Text fz="sm" c="dimmed" mt="sm">
        {feature.description}
      </Text>
    </Card>
  ));

  return (
    <Container size="lg" py="xl">
      <Group justify="center">
        <Badge variant="filled" size="lg">
          Next-Level Cleaning Starts Here
        </Badge>
      </Group>

      <Title order={2} className={classes.title} ta="center" mt="sm">
        Powerful cleaning, minimal setup, built for everyday use
      </Title>

      <Text c="dimmed" className={classes.description} ta="center" mt="md">
        The Mystle is engineered to simplify deep cleaning with a lightweight
        system that connects directly to your vacuum and water line — no tools,
        no headaches. Just plug in and power through grime, dust, and spills
        wherever they hide.
      </Text>

      <SimpleGrid cols={{ base: 1, md: 3 }} spacing="xl" mt={50}>
        {features}
      </SimpleGrid>
    </Container>
  );
}
