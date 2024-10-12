import { ShoppingCartIcon } from "lucide-react";
import { Col, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/cartContext";
import EmptyCartSection from "../sections/EmptyCartSection";
import CartTableRow from "./CartTableRow";
import CustomOffcanvas from "./CustomOffcanvas";

export default function CartOffcanvas() {
  const { cartLineItems, total, handleCloseCart, handleShowCart, showCart } =
    useCartContext();
  return (
    <CustomOffcanvas>
      <CustomOffcanvas.Trigger
        onClick={handleShowCart}
        variant="link"
        className="border-0 p-0"
      >
        <ShoppingCartIcon />
      </CustomOffcanvas.Trigger>
      <CustomOffcanvas.Offcanvas
        show={showCart}
        onHide={handleCloseCart}
        placement="end"
      >
        <CustomOffcanvas.Offcanvas.Header closeButton>
          <CustomOffcanvas.Offcanvas.Title>
            Your Cart
          </CustomOffcanvas.Offcanvas.Title>
        </CustomOffcanvas.Offcanvas.Header>
        <CustomOffcanvas.Offcanvas.Body>
          {cartLineItems.length === 0 ? (
            <EmptyCartSection closeFunction={handleCloseCart} />
          ) : (
            <>
              {cartLineItems.map((item) => (
                <CartTableRow
                  key={item.product.id}
                  item={item}
                  compactView={true}
                />
              ))}
            </>
          )}
        </CustomOffcanvas.Offcanvas.Body>
        <div className="p-3">
          <Row>
            <Col className="fw-bold fs-5">Total:</Col>
            <Col xs="auto" className="fw-bold text-end fs-5">
              EGP {total.toFixed(2)}
            </Col>
          </Row>
          <div>
            <p className="m-0" style={{ fontSize: "0.8rem" }}>
              *Shipping and taxes calculated at checkout
            </p>
          </div>
          <Row className="mt-3">
            <Col>
              <Button
                variant="outline-primary"
                className="w-100"
                onClick={handleCloseCart}
                as={Link}
                to="/cart"
              >
                Cart
              </Button>
            </Col>
            <Col>
              <Button
                variant="primary"
                className="w-100"
                onClick={handleCloseCart}
                as={Link}
                to="/checkout"
              >
                Checkout
              </Button>
            </Col>
          </Row>
        </div>
      </CustomOffcanvas.Offcanvas>
    </CustomOffcanvas>
  );
}
