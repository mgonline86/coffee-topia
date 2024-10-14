import { CheckCircleIcon } from "lucide-react";
import { useEffect } from "react";
import { Card } from "react-bootstrap";
import useCartContext from "../contexts/cartContext";

export default function ThankYouSection({
  data: { name, email, address, phone, paymentMethod, cardNumber },
}) {
  const { setCart, cart } = useCartContext();
  useEffect(() => {
    window.scrollTo(0, 0);
    setCart(cart);
    return () => {
      setCart({});
    };
  });
  return (
    <>
      <div className="d-flex gap-2">
        <CheckCircleIcon size={40} color="green" />
        <h2>Thank you for your order</h2>
      </div>
      <p>
        Your order has been received and will be processed shortly. We will
        contact you with the details of your order.
      </p>
      <Card>
        <Card.Header>
          <Card.Title>Order Details</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>
            <strong>Name:</strong> {name}
          </p>
          <p>
            <strong>Email:</strong> {email}
          </p>
          <p>
            <strong>Address:</strong> {address}
          </p>
          <p>
            <strong>Phone:</strong> {phone}
          </p>
          <p>
            <strong>Payment Method:</strong> {paymentMethod}
          </p>
          {paymentMethod === "Credit Card" && (
            <p>
              <strong>Card Number:</strong> {"**** **** **** "}
              {cardNumber.slice(-4)}
            </p>
          )}
        </Card.Body>
      </Card>
    </>
  );
}
