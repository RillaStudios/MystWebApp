import {
  Box,
  Button,
  Center,
  Checkbox,
  Container,
  Divider,
  Group,
  Modal,
  Rating,
  Space,
  TextInput,
  Title,
  Input,
  Textarea,
  LoadingOverlay,
  Text,
} from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useForm } from "@mantine/form";
import axios from "axios";
import { MYST_AUTH_ENDPOINTS } from "../../config/myst_api";
import { notifications } from "@mantine/notifications";
import type { Review } from "../../types/Review";
import { useEffect, useRef, useState } from "react";
import { Comment } from "./CommentHero";
import { Carousel } from "@mantine/carousel";
import AutoScroll from "embla-carousel-auto-scroll";
import { useInViewport } from "@mantine/hooks";

/**
 * ReviewHero component renders a hero section for customer reviews.
 * It includes a modal form for submitting reviews and displays existing reviews.
 *
 * @component
 * @returns {JSX.Element} The rendered component.
 *
 * @author IFD
 * @since 2025-06-01
 */
export default function ReviewHero() {
  // State to control stored reviews
  const [reviews, setReviews] = useState<Review[]>([]);

  // State to control the modal visibility for the review form
  const [openedForm, { open: openForm, close: closeForm }] =
    useDisclosure(false);

  // State to control the loading overlay visibility
  const [openedLoader, { open: openLoader, close: closeLoader }] =
    useDisclosure(false);

  // Initialize the auto-scroll plugin for the carousel
  const autoScroll = useRef(AutoScroll({ speed: 1 }));

  // Use the useInViewport hook to check if the carousel is in the viewport
  // This is used to enable auto-scrolling only when the carousel is visible
  const { ref, inViewport } = useInViewport();

  // Effect to fetch reviews when the component mounts
  // This uses the getReviews function to fetch data from the server
  useEffect(() => {
    // Fetch reviews when the component mounts
    getReviews().then((fetchedReviews) => {
      setReviews(fetchedReviews);
    });
  }, []);

  // Initialize the form with default values and validation rules
  const form = useForm({
    // Form configuration
    // Using uncontrolled mode for better performance with large forms
    mode: "uncontrolled",
    initialValues: {
      name: "",
      rating: 5,
      email: "",
      comment: "",
      order_id: "",
      allowedOnPage: true,
    },

    // Validation rules for each field
    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      rating: (value) =>
        value >= 1 && value <= 5 ? null : "Rating must be between 1 and 5",
      order_id: (value) => {
        if (value.length == 0) {
          return "Order ID is required";
        }
        if (value.length !== 9) {
          return "Order ID must be 9 digits";
        }
        if (!/^\d+$/.test(value)) {
          return "Order ID must be numeric";
        }
        return null;
      },
    },
  });

  /* 
  A function to handle the form submission.

  It sends a POST request to the review submission endpoint with the form data.
  If the submission is successful, it resets the form and closes the modal.
  If there is an error, it displays an appropriate notification based on the error status code.
  The function also opens a loading overlay while the request is being processed.

  @param {typeof form.values}

  @author IFD
  @since: 2025-06-01
  */
  const handleSubmit = async (values: typeof form.values) => {
    // Open the loader
    openLoader();

    // Make the POST request to submit the review
    axios
      .post(`${MYST_AUTH_ENDPOINTS.REVIEW.SUBMIT}`, {
        order_id: values.order_id,
        review_text: values.comment,
        rating: values.rating,
        reviewer_name: values.name,
        reviewer_email: values.email,
        allowed_on_page: values.allowedOnPage,
      })
      .then((response) => {
        // Check if the response status is 201 (Created)
        if (response.status === 201) {
          form.reset();
          closeForm();

          notifications.show({
            title: "Success",
            message: "Your review has been submitted successfully!",
            color: "green",
            position: "bottom-center",
          });
        }
      })
      // Handle all errors that may occur during the request
      // Note that response codes represent specific errors
      .catch((error) => {
        console.error("Error submitting review:", error);

        if (error.response) {
          switch (error.response.status) {
            // 400 is a general bad request - could be due to validation errors
            // the frontend should handle form validation, but in case it doesn't,
            // we handle it here to provide user feedback
            case 400:
              notifications.show({
                title: "Error",
                message: "Please fill in all required fields correctly.",
                color: "red",
                position: "bottom-center",
              });
              break;
            // 404 indicates that the order ID was not found
            // this could mean the order ID is incorrect or does not exist
            case 404:
              notifications.show({
                title: "Error",
                message: "Order ID not found. Please check and try again.",
                color: "red",
                position: "bottom-center",
              });
              break;
            // 409 indicates that a review for this order already exists
            // this prevents duplicate reviews for the same order
            case 409:
              notifications.show({
                title: "Error",
                message: "A review for this order already exists.",
                color: "red",
                position: "bottom-center",
              });
              break;
            // 403 indicates that the review contains profanity
            // this is a safeguard against inappropriate content
            case 403:
              notifications.show({
                title: "Error",
                message: "Profanity left in reviews will not be tolerated.",
                color: "red",
                position: "bottom-center",
              });
              break;
            // Any other status code indicates an unexpected error
            // we handle it here to provide a generic error message
            default:
              notifications.show({
                title: "Error",
                message:
                  "An unexpected error occurred. Please try again later.",
                color: "red",
                position: "bottom-center",
              });
          }
        }
      })
      // Finally block to close the loader regardless of success or failure
      .finally(() => {
        closeLoader();
      });
  };

  /* 
  A function to get the reviews from the server.

  @author IFD
  @since: 2025-06-01
  */
  const getReviews = async () => {
    const response = await axios
      .get(MYST_AUTH_ENDPOINTS.REVIEW.GET)
      .catch((error) => {
        console.error("Error fetching reviews:", error);
      });

    const reviews: Review[] = response?.data || [];
    return reviews;
  };

  return (
    <>
      <Modal
        opened={openedForm}
        onClose={closeForm}
        title="Leave a Review"
        size="lg"
        radius={"lg"}
        padding={"lg"}
      >
        <Box pos="relative">
          <LoadingOverlay
            visible={openedLoader}
            zIndex={1000}
            overlayProps={{ radius: "lg", blur: 2 }}
            loaderProps={{ size: "lg", color: "primary", type: "dots" }}
          />
          <form onSubmit={form.onSubmit((values) => handleSubmit(values))}>
            <TextInput
              label="Order ID"
              placeholder="123456789"
              type="number"
              maxLength={9}
              withAsterisk
              key={form.key("order_id")}
              {...form.getInputProps("order_id")}
            />
            <Space h="md" />
            <TextInput
              label="Name"
              placeholder="John Doe (optional)"
              key={form.key("name")}
              {...form.getInputProps("name")}
            />
            <Space h="md" />
            <TextInput
              withAsterisk
              label="Email"
              placeholder="example@email.com"
              key={form.key("email")}
              {...form.getInputProps("email")}
            />
            <Space h="md" />
            <Input.Wrapper label="Rating" withAsterisk>
              <Rating
                key={form.key("rating")}
                {...form.getInputProps("rating")}
              />
            </Input.Wrapper>
            <Space h="md" />
            <Textarea
              label="Comment"
              placeholder="Leave a comment (optional)"
              autosize
              minRows={2}
              key={form.key("comment")}
              {...form.getInputProps("comment")}
            />
            <Space h="md" />
            <Checkbox
              mt="md"
              label="I agree to have my review published on the site"
              checked={form.values.allowedOnPage}
              key={form.key("allowedOnPage")}
              {...form.getInputProps("allowedOnPage", { type: "checkbox" })}
            />
            <Space h="md" />
            <Group justify="center" mt="md">
              <Button type="submit">Submit</Button>
            </Group>
          </form>
        </Box>
      </Modal>

      <Box py={120}>
        <Container maw={1200} mx="auto">
          <Title order={1} style={{ textAlign: "center" }} mt="md" mb="lg">
            What Our Customers Are Saying
          </Title>
          <Divider my={50} />
          {reviews.length > 0 ? (
            <div ref={ref}>
              <Carousel
                slideSize="35%"
                withControls={false}
                withIndicators={false}
                emblaOptions={{
                  align: "center",
                  loop: true,
                }}
                plugins={
                  reviews.length >= 4 && inViewport ? [autoScroll.current] : []
                }
              >
                {reviews.map((review, index) => (
                  <Carousel.Slide key={index}>
                    <Center>
                      <Comment
                        rating={review.rating}
                        reviewText={
                          review.review_text || "No comment provided."
                        }
                        reviewerName={review.reviewer_name}
                        createdDate={
                          review.created_at
                            ? new Date(review.created_at)
                            : new Date()
                        }
                        key={index}
                      />
                    </Center>
                  </Carousel.Slide>
                ))}
              </Carousel>
            </div>
          ) : (
            <Center>
              <Text size="lg" c="dimmed">
                No reviews yet. Be the first to leave a review!
              </Text>
            </Center>
          )}
          <Space h={50} />
          <Center>
            <Button onClick={openForm}>Leave a review</Button>
          </Center>
        </Container>
      </Box>
    </>
  );
}
