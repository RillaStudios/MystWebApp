import { Box, Center, Container, Image, Text, Title } from "@mantine/core";
import CanadaLeaf from "../../assets/canada_leaf.png";

export default function AssembledInCanHero() {
  return (
    <Box>
      <Container maw={800} mx="auto" py={120}>
        <Center>
          <Image h={150} w={150} src={CanadaLeaf} />
        </Center>
        <Title order={1} style={{ textAlign: "center" }} mt="md" mb="lg">
          Assembled in Canada
        </Title>
        <Text size="lg" style={{ textAlign: "center" }} mb="lg">
          Our products are proudly assembled in Canada, ensuring the highest
          quality and craftsmanship. We take pride in supporting local
          manufacturing and delivering exceptional products to our customers.
        </Text>
      </Container>
    </Box>
  );
}
