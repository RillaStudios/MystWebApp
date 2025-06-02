import { notifications } from "@mantine/notifications";
import type { CheckoutContextValue } from "@stripe/react-stripe-js";
import type { StripeCheckoutConfirmResult } from "@stripe/stripe-js";

/* 
Validates an email address using a regular expression.

@param {string} email - The email address to validate.

@return {boolean} - Returns true if the email is valid, false otherwise.

@author IFD
*/
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/* 
A function to process a checkout using Stripe's Checkout API.

@param {CheckoutContextValue} checkout - The Stripe Checkout context value containing the checkout session details.

@return {Promise<void>} - A promise that resolves when the checkout is processed.

@author IFD
*/
export const proccessCheckout = async (
   checkout: CheckoutContextValue) => {

  // Check if the checkout session is valid 
  const result: StripeCheckoutConfirmResult = await checkout.confirm({
    returnUrl: `${window.location.origin}/checkout/success?session_id=${checkout.id}`,
  });

  // Handle error result of the checkout session
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