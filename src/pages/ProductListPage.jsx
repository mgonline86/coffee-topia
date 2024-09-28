import { Col, Container, Row } from "react-bootstrap";
import ProductCard from "../components/ProductCard";

export default function ProductListPage() {
  return (
    <Container className="my-5">
      <Row className="g-4">
        <Col xs={12} md={6} lg={4} xl>
          <ProductCard />
        </Col>
        <Col xs={12} md={6} lg={4} xl>
          <ProductCard />
        </Col>
        <Col xs={12} md={6} lg={4} xl>
          <ProductCard />
        </Col>
        <Col xs={12} md={6} lg={4} xl>
          <ProductCard />
        </Col>
      </Row>
    </Container>
  );
}
