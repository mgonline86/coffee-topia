import { ShoppingCartIcon } from "lucide-react";
import { Badge, Col, Offcanvas, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/cartContext";
import EmptyCartSection from "../sections/EmptyCartSection";
import CartTableRow from "./CartTableRow";
import { useMemo } from "react";

export default function CartOffcanvas() {
  const {
    itemsCount,
    cartLineItems,
    subTotal,
    totalDiscount,
    handleCloseCart,
    handleShowCart,
    showCart,
  } = useCartContext();

  const total = useMemo(() => {
    return subTotal + totalDiscount;
  }, [subTotal, totalDiscount]);
  return (
    <>
      <Button
        onClick={handleShowCart}
        variant="link"
        className="position-relative"
      >
        <Badge
          bg="danger"
          pill
          className="position-absolute"
          style={{ top: "-0.3rem", right: "-0.2rem", fontSize: "0.65rem" }}
        >
          {itemsCount > 99 ? "99+" : itemsCount}
        </Badge>
        <ShoppingCartIcon />
      </Button>
      <Offcanvas show={showCart} onHide={handleCloseCart} placement="end">
        <Offcanvas.Header closeButton className="shadow-sm">
          <Offcanvas.Title>Your Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
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
        </Offcanvas.Body>
        <div className="p-3 shadow-lg">
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
      </Offcanvas>
    </>
  );
}
