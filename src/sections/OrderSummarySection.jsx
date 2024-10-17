import { Stack } from "react-bootstrap";
import OrderSummaryItem from "../components/OrderSummaryItem";

export default function OrderSummarySection({
  data: { cartLineItems, subTotal, totalDiscount, shipping, total },
}) {
  if (cartLineItems.length === 0) {
    return null;
  }

  return (
    <Stack className="gap-3 position-sticky" style={{ top: "7.5rem" }}>
      {cartLineItems.map((item) => (
        <OrderSummaryItem key={item.product.id} item={item} />
      ))}

      <hr />

      <div>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0">Subtotal</p>
          <p className="m-0">EGP {subTotal.toFixed(2)}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0">Discount</p>
          <p className="m-0">- EGP {totalDiscount.toFixed(2)}</p>
        </div>
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0">Shipping</p>
          <p className="m-0">EGP {shipping.toFixed(2)}</p>
        </div>
      </div>

      <div className="d-flex flex-column">
        <div className="d-flex align-items-center justify-content-between">
          <p className="m-0 fs-5 fw-semibold">Total</p>
          <p className="m-0 fs-5 fw-semibold">EGP {total.toFixed(2)}</p>
        </div>
        <div className="text-muted" style={{ fontSize: "0.8rem" }}>
          * including 14% tax
        </div>
      </div>
    </Stack>
  );
}
