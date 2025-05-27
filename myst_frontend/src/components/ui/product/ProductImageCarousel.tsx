import { Carousel } from "@mantine/carousel";
import { Card, em, Image } from "@mantine/core";
import classes from "../../../css/Carousel.module.css";
import { useMediaQuery } from "@mantine/hooks";
import type { ProductImage } from "../../../types/ProductImage";

export function ProductImageCarousel({ images }: { images?: ProductImage[] }) {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const slides = images
    ? images
        .slice()
        .sort((a, b) => a.order - b.order)
        .map((image) => (
          <Carousel.Slide key={image.order}>
            <Image
              src={`http://localhost:8000${image.image_url}`}
              height={isMobile ? 300 : 500}
            />
          </Carousel.Slide>
        ))
    : [
        <Carousel.Slide key="default">
          <Image
            src="/images/no_prod_image.jpeg"
            height={isMobile ? 300 : 500}
          />
        </Carousel.Slide>,
      ];

  return (
    <Card
      radius="md"
      withBorder
      padding="xl"
      maw={isMobile ? 300 : 500}
      mx="auto"
    >
      <Card.Section>
        <Carousel
          withIndicators
          emblaOptions={{ loop: true }}
          classNames={{
            root: classes.carousel,
            controls: classes.carouselControls,
            indicator: classes.carouselIndicator,
          }}
        >
          {slides}
        </Carousel>
      </Card.Section>
    </Card>
  );
}
