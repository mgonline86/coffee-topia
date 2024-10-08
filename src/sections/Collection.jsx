import products from "../data/collection.json";
import CollectionCard from "../components/CollectionCard";
import { Col, Container, Row } from "react-bootstrap";

const Collection = () => {

  return (
    <Container>
      <h2 className="text-center">Collection</h2>
      <Row>
        {products.map((product) => (
          <Col key={product.title} className="gap-3">
            <CollectionCard product={product} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default Collection;
