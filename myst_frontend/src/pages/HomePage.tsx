import { CallToActionHero } from "../components/heros/CallToActionHero";
import { ContactHero } from "../components/heros/ContactHero";
import HeadFootLayout from "../layouts/HeadFootLayout";
import AssembledInCanHero from "../components/heros/AssembledInCanHero";
import { FeaturesCardHero } from "../components/heros/FeatureCardHero";
import { FaqWithBg } from "../components/heros/FaqHero";
import MystleVideoHero from "../components/heros/MystleVideoHero";
import ProductHero from "../components/heros/ProductHero";
import ReviewHero from "../components/heros/ReviewHero";
import { Helmet } from "react-helmet-async";

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>Myst Detailing | Home</title>
        <meta
          name="description"
          content="Myst Detailing offers high-performance car extractor kits for deep cleaning vehicle interiors. Trusted by professionals. Easy to use at home."
        />
        <meta
          name="keywords"
          content="car extractor kit, car interior cleaning, auto detailing tools, vehicle upholstery cleaner, Myst Detailing, Canada"
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://mystdetailing.ca/" />

        {/* Open Graph */}
        <meta property="og:type" content="product" />
        <meta property="og:url" content="https://mystdetailing.ca/" />
        <meta
          property="og:title"
          content="Myst Detailing – Premium Car Extractor Kits"
        />
        <meta
          property="og:description"
          content="Powerful, compact car extractor kits for pro-level vehicle interior cleaning. Shop now at Myst Detailing."
        />
        <meta
          property="og:image"
          content="https://mystdetailing.ca/images/og-extractor-kit.jpg"
        />
      </Helmet>
      <HeadFootLayout>
        <section>
          <CallToActionHero />
        </section>
        <section id="mystle">
          <ProductHero product_id={1} />
        </section>
        <section>
          <FeaturesCardHero />
        </section>
        <AssembledInCanHero />
        <section>
          <FaqWithBg />
        </section>
        <section>
          <MystleVideoHero />
        </section>
        <section>
          <ReviewHero />
        </section>
        <section id="contact">
          <ContactHero />
        </section>
      </HeadFootLayout>
    </>
  );
}
