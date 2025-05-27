import { notifications } from "@mantine/notifications";

export const nextStep = (active: number, setActive: (value: number | ((prevState: number) => number)) => void, email: string) => {
    if (active === 0) {
      if (!email) {
        notifications.show({
          title: "Missing Email",
          message: "Please fill in email field.",
          color: "red",
        });
        return;
      } else {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          notifications.show({
            title: "Invalid Email",
            message: "Please enter a valid email address.",
            color: "red",
          });
          return;
        }
      }
    }
    setActive((current) => (current < 4 ? current + 1 : current));
  };

  export const prevStep = (setActive: (value: number | ((prevState: number) => number)) => void) =>
    setActive((current) => (current > 0 ? current - 1 : current));