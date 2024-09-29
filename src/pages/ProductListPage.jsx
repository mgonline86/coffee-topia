import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import { useContext } from "react";
import ProductContext from "../contexts/productContext";

export default function ProductListPage() {
  const { getProducts } = useContext(ProductContext);
  return (
    <Container className="my-5">
      <Row className="g-4">
        {getProducts().map((product) => (
          <Col key={product.id} xs={12} md={6} lg={4} xl>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
}
