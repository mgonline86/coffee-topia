import { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../contexts/productContext";
import { Col, Container, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";

export default function ProductPage() {
  const { slug } = useParams();
  const { getProductBySlug } = useContext(ProductContext);
  const product = getProductBySlug(slug);
  console.log(product);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Container className="my-5">
      <Row>
        <Col xs={12} md={6}>
          <Image src={product.image} width={400} height={400} fluid />
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column gap-4">
          <h2>{product.title} </h2>
          <h3>LE {product.price} </h3>
          <Row>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <InputGroup className="h-100">
                <Button variant="outline-secondary" id="button-addon1">
                  -
                </Button>
                <Form.Control type="number" className="fs-5 text-center" />
                <Button variant="outline-secondary" id="button-addon1">
                  +
                </Button>
              </InputGroup>
            </Col>

            <Col xs={12} md={8}>
              <Button variant="primary" size="lg" className="w-100">
                Add to cart
              </Button>
            </Col>
          </Row>

          <p dangerouslySetInnerHTML={{ __html: product.description }} />
        </Col>
      </Row>
    </Container>
  );
}
