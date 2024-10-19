import {
  BanIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  CircleEllipsisIcon,
  UndoIcon,
} from "lucide-react";
import { useState } from "react";
import { Button, Col, Collapse, Modal, Row } from "react-bootstrap";
import useAuthContext from "../contexts/AuthContext";
import OrderSummarySection from "../sections/OrderSummarySection";
import styles from "./OrderDetailsModal.module.css";
import ThankYouCard from "./ThankYouCard";
import useToastContext from "../contexts/ToastContext";

export default function OrderDetailsModal({ order }) {
  const { updateUserOrderStatus } = useAuthContext();
  const { toast } = useToastContext();

  const {
    id,
    total,
    cartLineItems,
    subTotal,
    totalDiscount,
    shipping,
    details,
    status,
  } = order;

  const [show, setShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [showCancelAlert, setShowCancelAlert] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleCancelOrder = () => {
    updateUserOrderStatus(id, "cancelled");
    setShowCancelAlert(false);
    toast.success("Order cancelled successfully");
  };

  return (
    <>
      <Button variant="link" className="p-0" onClick={handleShow}>
        <CircleEllipsisIcon />
      </Button>

      <Modal show={show} onHide={handleClose} size="xl" fullscreen="xl-down">
        <Modal.Header closeButton>
          <Modal.Title>
            {status.toUpperCase()} Order({id})
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {status === "pending" && (
            <Row className="mb-3">
              <Col className="d-flex justify-content-end">
                <Button
                  variant="outline-danger"
                  onClick={() => setShowCancelAlert(true)}
                >
                  <BanIcon /> Cancel
                </Button>
              </Col>
            </Row>
          )}
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

      <Modal
        show={showCancelAlert}
        onHide={() => setShowCancelAlert(false)}
        centered
        backdropClassName={styles.confirmationBackdrop}
      >
        <Modal.Header className="fs-4" closeButton>
          Are you sure? You want to cancel this order?
        </Modal.Header>
        <Modal.Footer className="align-items-end justify-content-start">
          <Button
            onClick={handleCancelOrder}
            variant="danger"
            className="flex-fill"
          >
            <BanIcon size={16} /> Yes, Cancel Order
          </Button>
          <Button
            onClick={() => setShowCancelAlert(false)}
            variant="outline-primary"
            className="flex-fill"
            autoFocus
          >
            <UndoIcon size={16} /> No, Go Back
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
