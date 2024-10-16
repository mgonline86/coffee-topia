import { Card } from "react-bootstrap";

export default function ThankYouCard({
    data: { name, email, address, phone, paymentMethod, cardNumber=null },
  }) {
  return (
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
        {paymentMethod === "Credit Card" && cardNumber && (
          <p>
            <strong>Card Number:</strong> {"**** **** **** "}
            {cardNumber.slice(-4)}
          </p>
        )}
      </Card.Body>
    </Card>
  );
}
