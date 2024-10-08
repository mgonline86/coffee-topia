import { Row, Col, Image, Stack } from "react-bootstrap";

export default function OrderSummarySection() {
  return (
    <Stack>
      <Row>
        <Col>
          <Image src="img/coffee-cart.webp" thumbnail />
        </Col>
        <Col xs={10}>
          <h3>Product Name</h3>
        </Col>
      </Row>
    </Stack>
  );
}
