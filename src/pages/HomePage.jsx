import FeaturedProducts from "../sections/FeaturedProducts";
import Footer from "../sections/Footer";
import HeroSection from "../sections/HeroSection";
import Collection from "../sections/Collection";


export default function HomePage() {
  return (
    <>
      <HeroSection />
      <hr/>
      <FeaturedProducts />
      <hr/>
      
      <Collection />
      <Footer />
    </>
  );
}
