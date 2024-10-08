import Collection from "../sections/Collection";
import FeaturedProducts from "../sections/FeaturedProducts";
import HeroSection from "../sections/HeroSection";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <FeaturedProducts />
      <Collection />
    </>
  );
}
