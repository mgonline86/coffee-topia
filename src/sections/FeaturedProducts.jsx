import products from "../data/featuredProducts.json";
import ProductCard from "../components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";

const FeaturedProducts = () => {
  return (
    <Container as="section" className="py-3 my-3 py-lg-5 my-lg-5">
      <h1 className="text-center mb-4 fw-bolder fancyFont text-primary">Featured Products</h1>
      <Row className="g-4">
        {products.map((product) => (
          <Col xs={6} sm key={product.title} className="text-center">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedProducts;
