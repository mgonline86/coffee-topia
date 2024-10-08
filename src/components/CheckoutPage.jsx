import { Col, Container, Row } from "react-bootstrap";
import OrderSummarySection from "../sections/OrderSummarySection";
// import useCartContext from "../contexts/cartContext";

export default function CheckoutPage() {
  // const { cart, subTotal } = useCartContext();

  return (
    <Container as="section" className="my-5">
      <Row>
        <Col xs={12} lg={6}>
          Checkout Form
        </Col>
        <Col xs={12} lg={6}>
          <OrderSummarySection />
        </Col>
      </Row>
    </Container>
  );
}
