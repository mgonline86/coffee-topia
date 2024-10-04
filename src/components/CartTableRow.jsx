import { Trash2Icon } from "lucide-react";
import { useCallback, useMemo } from "react";
import { Button, Col, Form, Image, InputGroup, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/cartContext";
import styles from "./CartTableRow.module.css";

export default function CartTableRow({ item }) {
  const { updateCartQty, removeFromCart } = useCartContext();

  const {
    product: { id, image, title, discount, price, slug },
    qty,
  } = item;

  const validateQty = useCallback(
    (e, id) => {
      if (e.target.value < 1) {
        updateCartQty(id, 1);
      }

      if (e.target.value > 99) {
        updateCartQty(id, 99);
      }
    },
    [updateCartQty]
  );

  const viewTotal = useMemo(() => {
    if (discount && discount > 0) {
      return (
        <div className="d-flex flex-column align-items-end justify-content-end gap-1">
          <span>EGP {(1 - discount) * price * qty}</span>
          <span
            className={`text-decoration-line-through text-muted ${styles.oldPrice}`}
          >
            EGP {(price * qty).toFixed(2)}
          </span>
        </div>
      );
    }
    return `EGP ${(price * qty).toFixed(2)}`;
  }, [discount, price, qty]);

  const viewPrice = useMemo(() => {
    if (discount && discount > 0) {
      return (
        <div className="d-flex flex-column align-items-end justify-content-end gap-1">
          <span>EGP {(1 - discount) * price}</span>
          <span
            className={`text-decoration-line-through text-muted ${styles.oldPrice}`}
          >
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
        lg={5}
        className={`border-end my-2 my-lg-0 ${styles.borderEndXsNone}`}
      >
        <Link
          to={`/products/${slug}`}
          className="text-decoration-none d-flex align-items-center gap-3"
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
            style={{ objectFit: "contain" }}
          />
          {title}
        </Link>
      </Col>
      <Col
        xs={12}
        lg
        className={`border-end text-end d-flex align-items-lg-center justify-content-lg-end mb-2 mb-lg-0 ${styles.borderEndXsNone}`}
      >
        <span className="d-lg-none me-2 fw-bold">Price:</span>
        {viewPrice}
      </Col>
      <Col
        xs={9}
        lg
        className={`border-end text-end d-flex align-items-center justify-content-lg-end mb-2 mb-lg-0 ${styles.borderEndXsNone}`}
      >
        <span className="d-lg-none me-2 fw-bold">Quantity:</span>
        <InputGroup size="sm" className="justify-content-lg-end">
          <Button
            variant="outline-secondary"
            onClick={() => updateCartQty(id, qty - 1)}
            disabled={qty < 2}
          >
            -
          </Button>
          <Form.Control
            type="number"
            value={qty}
            onChange={(e) => updateCartQty(id, Number(e.target.value))}
            min={1}
            max={99}
            onBlur={(e) => validateQty(e, id)}
            style={{ textAlign: "center", maxWidth: 60 }}
          />
          <Button
            variant="outline-secondary"
            onClick={() => updateCartQty(id, qty + 1)}
            disabled={qty > 98}
          >
            +
          </Button>
        </InputGroup>
      </Col>
      <Col
        xs={12}
        lg
        className={`border-end text-end d-flex align-items-lg-center justify-content-lg-end order-1 order-lg-0 ${styles.borderEndXsNone}`}
      >
        <span className="d-lg-none me-2 fw-bold">Total:</span>
        {viewTotal}
      </Col>
      <Col
        xs={3}
        lg
        className="text-end d-flex align-items-center justify-content-lg-end mb-2 mb-lg-0"
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
