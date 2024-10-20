import { Trash2Icon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import styles from "./CartTableRow.module.css";

export default function CartTableRow({
  item,
  compactView = false,
  closeCart = null,
}) {
  const { updateCartQty, removeFromCart, maxQty } = useCartContext();

  const { product, qty } = item;

  const { id, image, title, discount, price, slug } = product;

  const validateQty = useCallback(
    (e) => {
      if (e.target.value < 1) {
        updateCartQty(product, 1);
      }

      if (e.target.value > maxQty) {
        updateCartQty(product, maxQty);
      }
    },
    [updateCartQty, product, maxQty]
  );

  const viewTotal = useMemo(() => {
    if (price === 0 || discount === 1) return "Free";

    if (discount && discount > 0) {
      return (
        <div className="d-flex flex-column align-items-lg-end justify-content-lg-end gap-1">
          <span>EGP {((1 - discount) * price * qty).toFixed(2)}</span>
          <span className="text-decoration-line-through text-muted oldPrice text-start">
            EGP {(price * qty).toFixed(2)}
          </span>
        </div>
      );
    }
    return `EGP ${(price * qty).toFixed(2)}`;
  }, [discount, price, qty]);

  const viewPrice = useMemo(() => {
    if (price === 0 || discount === 1) return "Free";

    if (discount && discount > 0) {
      return (
        <div className="d-flex flex-column align-items-lg-end justify-content-lg-end gap-1">
          <span>EGP {((1 - discount) * price).toFixed(2)}</span>
          <span className="text-decoration-line-through text-muted oldPrice text-start">
            EGP {price.toFixed(2)}
          </span>
        </div>
      );
    }
    return `EGP ${price.toFixed(2)}`;
  }, [discount, price]);

  return (
    <Row className="align-items-stretch border-bottom pb-3">
      <Col
        xs={12}
        lg={compactView ? undefined : 5}
        className={`my-2 ${compactView ? "border-end-0" : styles.borderEnd}${
          compactView ? "" : " my-lg-0"
        }`}
      >
        <Link
          to={`/products/${slug}`}
          className="text-decoration-none d-flex align-items-center gap-3"
          onClick={closeCart ? () => closeCart() : undefined}
        >
          <Image
            src={image
              .replaceAll(".jpg", "_x200.jpg")
              .replaceAll(".png", "_x200.png")
              .replaceAll(".webp", "_x200.webp")}
            thumbnail
            fluid
            width={100}
            height={100}
            alt={title}
            className={styles.cartRowImg}
            loading="lazy"
          />
          {title}
        </Link>
      </Col>
      <Col
        xs={12}
        lg={compactView ? undefined : true}
        className={`text-end d-flex mb-2 ${
          compactView ? "border-end-0" : styles.borderEnd
        }${
          compactView
            ? ""
            : " align-items-lg-center justify-content-lg-end mb-lg-0"
        }`}
      >
        <span className={`me-2 fw-bold${compactView ? "" : " d-lg-none"}`}>
          Price:
        </span>
        {viewPrice}
      </Col>
      <Col
        xs={9}
        lg={compactView ? undefined : true}
        className={`text-end d-flex align-items-center mb-2 ${
          compactView ? "border-end-0" : styles.borderEnd
        }${compactView ? "" : " mb-lg-0 justify-content-lg-end"}`}
      >
        <span className={`me-2 fw-bold${compactView ? "" : " d-lg-none"}`}>
          Quantity:
        </span>
        <InputGroup
          size="sm"
          className={`${compactView ? undefined : "  justify-content-lg-end"}`}
        >
          <Button
            variant="outline-primary"
            onClick={() => updateCartQty(product, qty - 1)}
            disabled={qty < 2}
          >
            -
          </Button>
          <Form.Control
            type="number"
            value={qty}
            onChange={(e) => updateCartQty(product, Number(e.target.value))}
            min={1}
            max={maxQty}
            onBlur={(e) => validateQty(e)}
            className={`text-center border-primary border-start-0 border-end-0 ${styles.qtyInput}`}
            name="qty"
          />
          <Button
            variant="outline-primary"
            onClick={() => updateCartQty(product, qty + 1)}
            disabled={qty > 98}
          >
            +
          </Button>
        </InputGroup>
      </Col>
      <Col
        xs={12}
        lg={compactView ? undefined : true}
        className={`text-end d-flex order-1 ${
          compactView ? "border-end-0" : styles.borderEnd
        }${
          compactView
            ? ""
            : " align-items-lg-center justify-content-lg-end order-lg-0"
        }`}
      >
        <span className={`me-2 fw-bold${compactView ? "" : " d-lg-none"}`}>
          Total:
        </span>
        {viewTotal}
      </Col>
      <Col
        xs={3}
        lg={compactView ? undefined : true}
        className={`text-end d-flex align-items-center mb-2${
          compactView ? "" : " justify-content-lg-end mb-lg-0"
        }`}
      >
        <Button
          variant="outline-danger"
          size="sm"
          className="border-0"
          onClick={() => removeFromCart(id)}
        >
          <Trash2Icon />
        </Button>
      </Col>
    </Row>
  );
}
