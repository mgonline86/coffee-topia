import { ChevronDownIcon, ChevronUpIcon, CircleEllipsisIcon } from "lucide-react";
import { useState } from "react";
import { Button, Col, Collapse, Modal, Row } from "react-bootstrap";
import OrderSummarySection from "../sections/OrderSummarySection";
import ThankYouCard from "./ThankYouCard";

export default function OrderDetailsModal({ order }) {
  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);

  const { total, cartLineItems, subTotal, totalDiscount, shipping, details } =
    order;

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="link" className="p-0" onClick={handleShow}>
        <CircleEllipsisIcon />
      </Button>

      <Modal show={show} onHide={handleClose} size="xl" fullscreen="xl-down">
        <Modal.Header closeButton>
          <Modal.Title>Order Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row className="g-3 g-lg-5 ">
            <Col xs={12} lg={6} className="d-block d-lg-none">
              <div
                className="d-flex align-items-center justify-content-between"
                onClick={() => setOpen(!open)}
              >
                <Button
                  variant="link"
                  className="px-0 fs-6"
                  aria-controls="order-summary-collapse"
                  aria-expanded={open}
                >
                  {open ? (
                    <>
                      Hide Summary
                      <ChevronUpIcon />
                    </>
                  ) : (
                    <>
                      Show Summary
                      <ChevronDownIcon />
                    </>
                  )}
                </Button>
                <p className="m-0 fs-6 fw-semibold">EGP {total.toFixed(2)}</p>
              </div>
              <Collapse in={open}>
                <div id="order-summary-collapse" className="py-3">
                  <OrderSummarySection
                    data={{
                      cartLineItems,
                      subTotal,
                      totalDiscount,
                      shipping,
                      total,
                    }}
                  />
                </div>
              </Collapse>
            </Col>
            <Col xs={12} lg={6}>
              <ThankYouCard data={details} />
            </Col>
            <Col xs={12} lg={6} className="d-none d-lg-block">
              <OrderSummarySection
                data={{
                  cartLineItems,
                  subTotal,
                  totalDiscount,
                  shipping,
                  total,
                }}
              />
            </Col>
          </Row>
        </Modal.Body>
      </Modal>
    </>
  );
}
