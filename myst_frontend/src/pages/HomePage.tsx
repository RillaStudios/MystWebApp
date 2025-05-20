import { Box, Container, Divider, Title } from "@mantine/core";
import { CallToActionHero } from "../components/heros/CallToActionHero";
import { Comment } from "../components/heros/CommentHero";
import { ContactHero } from "../components/heros/ContactHero";
import HeadFootLayout from "../layouts/HeadFootLayout";
import AssembledInCanHero from "../components/heros/AssembledInCanHero";
import { FeaturesCardHero } from "../components/heros/FeatureCardHero";
import { FaqWithBg } from "../components/heros/FaqHero";
import CarouselHero from "../components/heros/CarouselHero";
import CountryPicker from "../components/ui/CountryPicker";

export default function HomePage() {
  return (
    <HeadFootLayout>
      <CallToActionHero />
      <CarouselHero />
      <CountryPicker />
      <FeaturesCardHero />
      <AssembledInCanHero />
      <FaqWithBg />
      <Box py={120}>
        <Container maw={1200} mx="auto">
          <Title order={1} style={{ textAlign: "center" }} mt="md" mb="lg">
            What our customers say
          </Title>
          <Divider my={50} />
          <Comment />
        </Container>
      </Box>
      <ContactHero />
    </HeadFootLayout>
  );
}
