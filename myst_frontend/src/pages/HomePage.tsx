import {
  Box,
  Button,
  Center,
  Container,
  Divider,
  Space,
  Title,
} from "@mantine/core";
import { CallToActionHero } from "../components/heros/CallToActionHero";
import { Comment } from "../components/heros/CommentHero";
import { ContactHero } from "../components/heros/ContactHero";
import HeadFootLayout from "../layouts/HeadFootLayout";
import AssembledInCanHero from "../components/heros/AssembledInCanHero";
import { FeaturesCardHero } from "../components/heros/FeatureCardHero";
import { FaqWithBg } from "../components/heros/FaqHero";
import CarouselHero from "../components/heros/CarouselHero";
import MystleVideoHero from "../components/heros/MystleVideoHero";

export default function HomePage() {
  return (
    <HeadFootLayout>
      <CallToActionHero />
      <section id="mystle">
        <CarouselHero />
      </section>
      <FeaturesCardHero />
      <AssembledInCanHero />
      <FaqWithBg />
      <MystleVideoHero />
      <Box py={120}>
        <Container maw={1200} mx="auto">
          <Title order={1} style={{ textAlign: "center" }} mt="md" mb="lg">
            What Our Customers Are Saying
          </Title>
          <Divider my={50} />
          <Comment />
          <Space h={50} />
          <Center>
            <Button>Leave a review</Button>
          </Center>
        </Container>
      </Box>
      <section id="contact">
        <ContactHero />
      </section>
    </HeadFootLayout>
  );
}
