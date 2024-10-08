import products from "../data/featuredProducts.json";
import ProductCard from "../components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";

const FeaturedProducts = () => {
  return (
    <Container as="section" className="py-5">
      <h2 className="text-center mb-4 fw-bolder">Featured Products</h2>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.title} className="text-center">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedProducts;
