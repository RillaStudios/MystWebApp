import {
  Container,
  SimpleGrid,
  Title,
  Text,
  Space,
  Spoiler,
  Button,
} from "@mantine/core";
import { CarouselCard } from "../ui/Carousel";

export default function CarouselHero() {
  return (
    <Container maw={1200} mx="auto">
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing="lg" py={120}>
        <div>
          <Title order={1}>THE MYSTLE</Title>
          <Space h={20} />
          <Spoiler maxHeight={150} showLabel="Read more" hideLabel="Hide">
            <Text pb={5}>
              The Mystle ShopVac Extractor Kit seamlessly converts your standard
              ShopVac into a high-performance carpet extraction system.
              Engineered for powerful suction and equipped with a high-pressure
              spray nozzle, this kit delivers deep and effective cleaning for
              carpets, upholstery, and other soft surfaces.
            </Text>
            <Text pb={5}>
              With a 10-foot anti-crush vacuum hose and a 25-foot heavy-duty
              water line, the kit offers exceptional reach and flexibility,
              making it ideal for both residential and commercial applications.
              Whether you're a homeowner looking for a reliable solution or a
              professional seeking cost-effective performance, the Mystle
              Extractor Kit provides commercial-quality results—without the high
              cost of traditional carpet extractors.
            </Text>
            <Text pb={5}>
              Designed for quick and effortless setup, simply attach the kit to
              your ShopVac and begin cleaning immediately. Experience the
              convenience and power of professional carpet cleaning, right at
              your fingertips.
            </Text>
          </Spoiler>
          <Space h={20} />
          <Title order={2} fw={"bold"}>
            $349 CAD
          </Title>
          <Space h={20} />
          <Button size="lg">Buy Now</Button>
        </div>
        <div>
          <CarouselCard />
        </div>
      </SimpleGrid>
    </Container>
  );
}
