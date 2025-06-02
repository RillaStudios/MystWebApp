import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

/* 
A React component that renders a "Buy Now" button for the Myst Detailing website.
This button can either redirect to a checkout page or a buy page based on the `checkoutButton` prop.
It accepts props for quantity, product ID, and button size, allowing customization of the button's behavior and appearance.

@param {Object} props - The properties for the BuyNowButton component.
@param {boolean} [props.checkoutButton=false] - If true, redirects to the checkout page; otherwise, redirects to the buy page.
@param {number} [props.quantity=1] - The quantity of the product to purchase.
@param {number} [props.product_id=1] - The ID of the product to purchase.
@param {string} [props.size="md"] - The size of the button, can be "sm", "md", or "lg".

@author IFD
*/
export default function BuyNowButton({
  checkoutButton,
  quantity = 1,
  product_id = 1,
  size = "md",
}: {
  checkoutButton?: boolean;
  quantity?: number;
  product_id?: number;
  size?: "sm" | "md" | "lg";
}) {
  // Hook to navigate programmatically
  const navigate = useNavigate();

  return (
    <Button
      size={size}
      onClick={() => {
        if (checkoutButton) {
          navigate("/checkout", {
            state: { product_id: product_id, quantity: quantity },
            preventScrollReset: false,
          });
          window.scrollTo(0, 0);
        } else {
          navigate("/buy", {
            state: { product_id: product_id },
            preventScrollReset: false,
          });
          window.scrollTo(0, 0);
        }
      }}
    >
      {checkoutButton ? "Proceed to Checkout" : "Buy Now"}
    </Button>
  );
}
