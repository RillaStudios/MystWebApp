import { NumberInput } from "@mantine/core";

interface ProductQuantitySelectProps {
  quantity: string | number;
  setQuantity: (value: string | number) => void;
}

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
