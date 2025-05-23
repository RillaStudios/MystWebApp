import {
  Box,
  Button,
  Group,
  LoadingOverlay,
  SimpleGrid,
  Text,
  Textarea,
  TextInput,
  Title,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { ContactIconsList } from "../ui/ContactIcon";
import classes from "../../css/Contact.module.css";
import { handleContactSubmission } from "../../service/contact_service";
import { useDisclosure } from "@mantine/hooks";

export function ContactHero() {
  const [visible, { open, close }] = useDisclosure(false);

  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      email: "",
      name: "",
      message: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      message: (value) =>
        value.length < 2
          ? "Message should include at least 2 characters"
          : null,
    },
  });

  return (
    <div className={classes.wrapper}>
      <SimpleGrid cols={{ base: 1, sm: 2 }} spacing={50} maw={1200} mx="auto">
        <div>
          <Title className={classes.title}>Contact us</Title>
          <Text className={classes.description} mt="sm" mb={30}>
            Leave your email and we will get back to you within 24 hours
          </Text>

          <ContactIconsList />
        </div>

        <Box pos="relative">
          <LoadingOverlay
            visible={visible}
            zIndex={1000}
            overlayProps={{ radius: "sm", blur: 2 }}
            loaderProps={{ color: "primary" }}
          />
          <form
            onSubmit={form.onSubmit(async (values) => {
              open(); // Show the loading overlay
              try {
                await handleContactSubmission(values);

                form.reset();
              } finally {
                close(); // Hide the overlay when complete
              }
            })}
            className={classes.form}
          >
            <TextInput
              label="Email"
              placeholder="your@email.com"
              withAsterisk
              radius="md"
              key={form.key("email")}
              classNames={{
                input: form.errors.email ? classes.errorInput : classes.input,
                label: classes.inputLabel,
              }}
              {...form.getInputProps("email")}
            />
            <TextInput
              label="Name"
              placeholder="John Doe"
              mt="md"
              radius="md"
              key={form.key("name")}
              {...form.getInputProps("name")}
              classNames={{ input: classes.input, label: classes.inputLabel }}
            />
            <Textarea
              withAsterisk
              label="Your message"
              placeholder="Do you ship to France?"
              minRows={4}
              mt="md"
              radius="md"
              key={form.key("message")}
              classNames={{
                input: form.errors.email ? classes.errorInput : classes.input,
                label: classes.inputLabel,
              }}
              {...form.getInputProps("message")}
            />

            <Group justify="flex-end" mt="md">
              <Button className={classes.control} radius="md" type="submit">
                Send message
              </Button>
            </Group>
          </form>
        </Box>
      </SimpleGrid>
    </div>
  );
}
