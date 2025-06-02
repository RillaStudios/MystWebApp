import {
  AspectRatio,
  Center,
  Container,
  Stack,
  Text,
  Title,
} from "@mantine/core";

/* 
A React component that displays a video hero section for the Mystle Extractor Kit.
This component includes a title, a description, and an embedded YouTube video showcasing the product in action.

@author IFD
*/
export default function MystleVideoHero() {
  return (
    <Container maw={1200} mx="auto" pt={120}>
      <Stack gap={50}>
        <div>
          <Center>
            <Stack gap={20}>
              <Title ta={"center"} order={1}>
                High Performance, Zero Hassle
              </Title>
              <Text ta={"center"} pb={5}>
                Elevate your cleaning routine with the Mystle Extractor Kit.
                Watch it tackle stubborn stains and deep-set dirt with ease — no
                bulky machines, just smart design and powerful results.
              </Text>
            </Stack>
          </Center>
        </div>
        <div>
          <AspectRatio ratio={16 / 9}>
            <iframe
              src="https://www.youtube.com/embed/8nDjXtbkQIo?si=0Uo4-P7TnUvOj7EE"
              title="YouTube video player"
              style={{ border: 0, borderRadius: "0.5rem" }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          </AspectRatio>
        </div>
      </Stack>
    </Container>
  );
}
