import axios from "axios";
import { MYST_AUTH_ENDPOINTS } from "../config/myst_api";
import { notifications } from "@mantine/notifications";

export const handleContactSubmission = async (values: {
  email: string;
  name: string;
  message: string;
}) => {
    await axios.post(
    MYST_AUTH_ENDPOINTS.CONTACT.SUBMIT,
    {
        email: values.email, 
        full_name: values.name,
        message: values.message,
    },).then(() => {
        notifications.show({
          title: `Contact form submitted`,
          message: `Thank you for your message! We will get back to you soon.`,
          position: "bottom-center",
          color: "green",
        })
    }).catch((error) => {
        notifications.show({
          title: `Failed to submit contact form`,
          message: `Error: ${error.message}`,
          position: "bottom-center",
          color: "red",
        })
        console.error("Error submitting contact form:", error);
    });
}