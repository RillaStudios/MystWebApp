import { Carousel } from "@mantine/carousel";
import { Card, em, Image } from "@mantine/core";
import classes from "../../../css/Carousel.module.css";
import { useMediaQuery } from "@mantine/hooks";
import type { ProductImage } from "../../../types/ProductImage";

/* 
A React component that displays a carousel of product images.
This component uses Mantine's Carousel to show images in a responsive layout.
It sorts the images by their order and displays them in a card with a maximum width.

@author IFD
*/
export function ProductImageCarousel({ images }: { images?: ProductImage[] }) {
  // Check if the screen width is less than or equal to 750px
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  // Create an array of Carousel slides from the images, sorted by order
  // If no images are provided, display a default image
  const slides = images && images.length > 0
    ? images
      .slice()
      .sort((a, b) => a.order - b.order)
      .map((image) => (
        <Carousel.Slide key={image.order}>
          <Image
            src={`${import.meta.env.VITE_ASSETS_URL}${image.image_url}`}
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
