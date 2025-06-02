import HeadFootLayout from "../layouts/HeadFootLayout";
import ProductHero from "../components/heros/ProductHero";
import { Helmet } from "react-helmet-async";

export default function BuyPage({ product_id }: { product_id?: number }) {
  // Default product_id to 1 if not provided
  product_id = product_id || 1;

  return (
    <HeadFootLayout>
      <Helmet>
        <title>Myst Detailing | Buy Now</title>
        <meta
          name="description"
          content="Purchase the Myst Detailing Car Extractor Kit. Choose how many kits you want before proceeding to checkout. Trusted, professional-grade car cleaning equipment."
        />
        <meta
          name="keywords"
          content="
            buy car extractor kit, car extractor kit purchase, car interior cleaning,
            auto detailing tools, vehicle upholstery cleaner, Myst Detailing, Canada,
            car cleaning products, professional car cleaning equipment, purchase extractor kits
          "
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mystdetailing.ca/buy" />

        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://mystdetailing.ca/buy" />
        <meta
          property="og:title"
          content="Buy Myst Detailing Car Extractor Kit – Select Quantity"
        />
        <meta
          property="og:description"
          content="Order the Myst Detailing Car Extractor Kit today. Choose the quantity and get professional-grade cleaning tools shipped to your door."
        />
        <meta
          property="og:image"
          content="https://mystdetailing.ca/images/og-extractor-kit.jpg"
        />
      </Helmet>
      <ProductHero product_id={product_id} checkout />
    </HeadFootLayout>
  );
}
