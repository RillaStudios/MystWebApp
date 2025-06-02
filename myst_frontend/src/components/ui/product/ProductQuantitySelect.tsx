import { NumberInput } from "@mantine/core";

// Type definition for the props of the ProductQuantitySelect component
interface ProductQuantitySelectProps {
  quantity: string | number;
  setQuantity: (value: string | number) => void;
}

/* 
A React component that renders a product quantity selection input.
This component allows users to select a quantity for a product, 
with validation to ensure the quantity is a positive integer.
It accepts props for the current quantity and a function to update the quantity.

@param {Object} props - The properties for the ProductQuantitySelect component.
@param {string | number} props.quantity - The current quantity of the product.
@param {function} props.setQuantity - A function to update the quantity of the product.

@author IFD
*/
export default function ProductQuantitySelect({
  quantity,
  setQuantity,
}: ProductQuantitySelectProps) {
  return (
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
  );
}
