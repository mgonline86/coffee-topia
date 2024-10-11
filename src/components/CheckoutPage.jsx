import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import useCartContext from "../contexts/cartContext";
import OrderSummarySection from "../sections/OrderSummarySection";
import { useNavigate } from "react-router-dom";
import CheckoutFormSection from "../sections/CheckoutFormSection";

export default function CheckoutPage() {
  const { total, cartLineItems } = useCartContext();

  const [open, setOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (cartLineItems.length < 1) {
      navigate("/cart", { replace: true });
    }
  }, [cartLineItems, navigate]);

  return (
    <Container as="section" className="my-5">
      <Row className="g-5">
        <Col xs={12} lg={6} className="d-block d-lg-none">
          <div
            className="d-flex align-items-center justify-content-between"
            onClick={() => setOpen(!open)}
          >
            <Button
              variant="link"
              className="px-0"
              aria-controls="order-summary-collapse"
              aria-expanded={open}
            >
              {open ? (
                <>
                  Hide Order Summary
                  <ChevronUpIcon />
                </>
              ) : (
                <>
                  Show Order Summary
                  <ChevronDownIcon />
                </>
              )}
            </Button>
            <p className="m-0 fs-5 fw-semibold">EGP {total.toFixed(2)}</p>
          </div>
          <Collapse in={open}>
            <div id="order-summary-collapse" className="py-3">
              <OrderSummarySection />
            </div>
          </Collapse>
        </Col>
        <Col xs={12} lg={6}>
          <CheckoutFormSection />
        </Col>
        <Col xs={12} lg={6} className="d-none d-lg-block">
          <OrderSummarySection />
        </Col>
      </Row>
    </Container>
  );
}
