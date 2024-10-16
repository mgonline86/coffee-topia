import { useMemo } from "react";
import { Badge, Image } from "react-bootstrap";
import styles from "./OrderSummaryItem.module.css";

export default function OrderSummaryItem({ item }) {
  const { product, qty } = item;

  const { discount, price, title, image, id } = product;

  const viewTotal = useMemo(() => {
    if (price === 0 || discount === 1) return "Free";
    if (discount && discount > 0) {
      return (
        <div className="d-flex flex-column align-items-end justify-content-end gap-1">
          <span>EGP {((1 - discount) * price * qty).toFixed(2)}</span>
          <span className="text-decoration-line-through text-muted oldPrice">
            EGP {(price * qty).toFixed(2)}
          </span>
        </div>
      );
    }
    return `EGP ${(price * qty).toFixed(2)}`;
  }, [discount, price, qty]);

  return (
    <div key={id} className="d-flex align-items-md-center gap-3">
      <div className="position-relative">
        <Badge
          bg="primary"
          pill
          className="position-absolute top-0 start-100 translate-middle"
        >
          {qty}
        </Badge>
        <Image
          src={image
            .replaceAll(".jpg", "_x200.jpg")
            .replaceAll(".png", "_x200.png")
            .replaceAll(".webp", "_x200.webp")}
          thumbnail
          width={60}
          height={60}
          className={styles.orderSummaryImg}
          alt={title}
          loading="lazy"
        />
      </div>
      <p className="m-0">{title}</p>
      <div className={`flex-grow-1 text-end ${styles.totalConatiner}`}>
        <span>{viewTotal} </span>
      </div>
    </div>
  );
}
