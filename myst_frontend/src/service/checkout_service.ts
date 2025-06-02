import { notifications } from "@mantine/notifications";
import type { CheckoutContextValue } from "@stripe/react-stripe-js";
import type { StripeCheckoutConfirmResult } from "@stripe/stripe-js";

export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export const proccessCheckout = async (
   checkout: CheckoutContextValue) => {

  const result: StripeCheckoutConfirmResult = await checkout.confirm({
    returnUrl: `${window.location.origin}/checkout/success?session_id=${checkout.id}`,
  });

  if (result.type === "error") {
    console.error(result.error);

      notifications.show({
        title: "Payment Error",
        message: result.error.message || "Your card was declined. Please try again.",
        color: "red",
        position: "bottom-center",
      });
  }

}