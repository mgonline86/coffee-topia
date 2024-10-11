import products from "../data/collection.json";
import CollectionCard from "../components/CollectionCard";
import { Col, Container, Row } from "react-bootstrap";

const Collection = () => {
  return (
    <Container as="section" className="py-5 my-5">
      <h1 className="text-center mb-4 fw-bolder fancyFont text-primary">Collection</h1>
      <Row className="g-4">
        {products.map((product) => (
          <Col key={product.title} className="text-center">
            <CollectionCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Collection;
