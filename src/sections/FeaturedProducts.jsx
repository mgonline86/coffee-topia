import products from "../data/featuredProducts.json";
import ProductCard from "../components/ProductCard";
import { Col, Container, Row } from "react-bootstrap";

const FeaturedProducts = () => {

  return (
    <Container>
      <h2 className="text-center">Featured Products</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.title} className="gap-2">
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FeaturedProducts;
