import products from "../data/collection.json";
import CollectionCard from "../components/CollectionCard";
import { Col, Container, Row } from "react-bootstrap";

const Collection = () => {
  return (
    <Container as="section" className="py-3 my-3 py-lg-5 my-lg-5">
      <h1 className="text-center mb-4 fw-bolder fancyFont text-primary">Collections</h1>
      <Row className="g-4">
        {products.map((product) => (
          <Col xs={6} sm key={product.title} className="text-center px-2 px-lg-3">
            <CollectionCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Collection;
