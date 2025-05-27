import HeadFootLayout from "../layouts/HeadFootLayout";
import ProductHero from "../components/heros/ProductHero";

export default function BuyPage({ product_id }: { product_id?: number }) {
  // Default product_id to 1 if not provided
  product_id = product_id || 1;

  return (
    <HeadFootLayout>
      <ProductHero product_id={product_id} checkout />
    </HeadFootLayout>
  );
}
