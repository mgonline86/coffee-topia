import { Card, Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import CartTableRow from "../components/CartTableRow";
import useCartContext from "../contexts/CartContext";

export default function CartTableSection() {
  const { cartLineItems, total } = useCartContext();

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
          {cartLineItems.map((item) => (
            <CartTableRow key={item.product.id} item={item} />
          ))}
          <Row>
            <Col className="fw-bold text-end fs-5" xs sm={8} md={9} lg={10}>
              Total:
            </Col>
            <Col className="fw-bold text-end fs-5">EGP {total.toFixed(2)}</Col>
          </Row>
          <Row className="mt-4">
            <Col className="d-flex justify-content-center justify-content-lg-end">
              <Link
                to="/checkout"
                variant="primary"
                className="btn btn-primary w-100 py-2 fs-5 text-uppercase fw-semibold"
                style={{ maxWidth: 300 }}
              >
                Checkout
              </Link>
            </Col>
          </Row>
        </Card.Body>
      </Card>
    </Container>
  );
}
