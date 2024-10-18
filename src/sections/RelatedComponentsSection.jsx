import { Splide, SplideSlide, SplideTrack } from "@splidejs/react-splide";
import ProductCard from "../components/ProductCard";
import CoolTitle from "../components/CoolTitle";

export default function RelatedComponentsSection({ relatedProducts }) {
  if (!relatedProducts || relatedProducts.length < 1) {
    return null;
  }

  return (
    <section className="my-5">
      <CoolTitle title="Related Products" />
      <Splide
        aria-label="Related Products"
        hasTrack={false}
        options={{
          autoplay: true,
          rewind: true,
          perPage: 4,
          perMove: 1,
          pagination: false,
          breakpoints: {
            1200: {
              perPage: 3,
            },
            992: {
              perPage: 2,
            },
            768: {
              perPage: 1,
            },
            576: {
              perPage: 2,
            },
            368: {
              perPage: 1,
            },
          },
        }}
      >
        <SplideTrack className="py-5">
          {relatedProducts.map((product) => (
            <SplideSlide key={product.title}>
              <ProductCard product={product} />
            </SplideSlide>
          ))}
        </SplideTrack>
      </Splide>
    </section>
  );
}
