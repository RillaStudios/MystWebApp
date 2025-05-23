import {
  Container,
  SimpleGrid,
  Title,
  Text,
  Space,
  Spoiler,
  Button,
  Group,
} from "@mantine/core";
import { CarouselCard } from "../ui/Carousel";
import { useCurrency } from "../../context/CurrencyContext";
import { useEffect, useState } from "react";
import { NumberInput } from "@mantine/core";
import { useNavigate } from "react-router-dom";

export default function CarouselHero({ checkout }: { checkout?: boolean }) {
  const { rate, currency, loading } = useCurrency();
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState<string | number>("1");

  const raw_price = 299.99;

  // Price state
  useEffect(() => {
    // Fetch the exchange rate for the new currency
    // and update the rate state
    if (loading) {
      return;
    }

    const priceInLocalCurrency = rate * raw_price * Number(quantity);

    const formattedPrice = new Intl.NumberFormat(undefined, {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(priceInLocalCurrency);

    setPrice(formattedPrice);
  }, [loading, rate, currency, quantity]);

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
          {checkout ? (
            <Group gap={4}>
              <Title order={2} fw={"bold"}>
                {price}
              </Title>
              <Text size="sm" c="dimmed">
                + tax
              </Text>
            </Group>
          ) : (
            <Title order={2} fw={"bold"}>
              {price}
            </Title>
          )}
          <Space h={20} />
          {checkout && (
            <>
              <NumberInput
                label="Quantity"
                min={1}
                max={100}
                allowDecimal={false}
                allowNegative={false}
                defaultValue={1}
                value={quantity}
                onChange={setQuantity}
                maw={75}
                onBlur={() => {
                  if (typeof quantity === "string") {
                    const parsedQuantity = parseInt(quantity);

                    if (isNaN(parsedQuantity) || parsedQuantity < 1) {
                      setQuantity(1);
                    } else {
                      setQuantity(parsedQuantity);
                    }
                  }
                }}
              />
              <Space h={20} />
            </>
          )}
          <Button
            size="lg"
            onClick={() => {
              if (checkout) {
                // Handle checkout logic here
                console.log("Proceeding to checkout with quantity:", quantity);
                navigate("/checkout", {
                  state: { product_id: 1, quantity: quantity },
                });
              } else {
                // Handle buy now logic here
                console.log("Buying now with quantity:", quantity);
              }
            }}
          >
            {checkout ? "Proceed to Checkout" : "Buy Now"}
          </Button>
        </div>
        <div>
          <CarouselCard />
        </div>
      </SimpleGrid>
    </Container>
  );
}
