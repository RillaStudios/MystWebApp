import { Button } from "@mantine/core";
import { useNavigate } from "react-router-dom";

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
