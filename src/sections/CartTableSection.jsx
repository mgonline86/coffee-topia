import { Card, Col, Container, Row } from "react-bootstrap";
import CartTableRow from "../components/CartTableRow";
import useCartContext from "../contexts/cartContext";

export default function CartTableSection() {
  const { cart, subTotal } = useCartContext();

  return (
    <Container as="section" className="my-5">
      <Card>
        <Card.Header>
          <Card.Title className="text-primary text-center fw-bold fs-4 text-uppercase">
            Your Cart
          </Card.Title>
        </Card.Header>
        <Card.Body className="d-flex flex-column gap-3 pt-0">
          <Row
            className="border-bottom py-3 fw-semibold text-uppercase sticky-top bg-white z-3 d-none d-lg-flex"
            style={{ top: 70 }}
          >
            <Col md={5}>Product</Col>
            <Col className="text-end">Price</Col>
            <Col className="text-end">Quantity</Col>
            <Col className="text-end">Total</Col>
            <Col className="text-end">Remove</Col>
          </Row>
          {Object.values(cart).map((item) => (
            <CartTableRow key={item.product.id} item={item} />
          ))}
          <Row>
            <Col className="fw-bold text-end fs-5" xs sm={8} md={9} lg={10}>
              Subtotal:
            </Col>
            <Col className="fw-bold text-end fs-5">EGP {subTotal}</Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
