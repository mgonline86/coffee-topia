import products from "../data/featuredProducts.json";
import ProductCard from "../components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";
import CoolTitle from "../components/CoolTitle";
import SlideUpAnimation from "../components/SlideUpAnimation";

const FeaturedProducts = () => {
  return (
    <Container as="section" className="py-3 my-3 py-lg-5 my-lg-5">
      <CoolTitle title="Featured Products" />
      <Row className="g-4">
        {products.map((product) => (
          <Col
            xs={6}
            sm
            key={product.title}
            className="text-center px-2 px-lg-3"
          >
            <SlideUpAnimation>
              <ProductCard product={product} />
            </SlideUpAnimation>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedProducts;
