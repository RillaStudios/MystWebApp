import { Carousel } from "@mantine/carousel";
import { Card, em, Image } from "@mantine/core";
import classes from "../../css/Carousel.module.css";
import PROD_IMG_1 from "../../assets/prod_img_1.png";
import PROD_IMG_2 from "../../assets/prod_img_2.png";
import PROD_IMG_3 from "../../assets/prod_img_3.png";
import PROD_IMG_4 from "../../assets/prod_img_4.png";
import PROD_IMG_5 from "../../assets/prod_img_5.png";
import PROD_IMG_6 from "../../assets/prod_img_6.png";
import { useMediaQuery } from "@mantine/hooks";

const images = [
  PROD_IMG_1,
  PROD_IMG_2,
  PROD_IMG_3,
  PROD_IMG_4,
  PROD_IMG_5,
  PROD_IMG_6,
];

export function CarouselCard() {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const slides = images.map((image) => (
    <Carousel.Slide key={image}>
      <Image src={image} height={isMobile ? 300 : 500} />
    </Carousel.Slide>
  ));

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
