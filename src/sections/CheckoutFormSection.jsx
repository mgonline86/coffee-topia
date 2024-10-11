import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export default function CheckoutFormSection() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("cashOnDelivery");
  const [cardNumber, setCardNumber] = useState("");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const errors = {};
    if (!name) {
      errors.name = "Name is required";
    }
    if (!email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Email is invalid";
    }
    if (!address) {
      errors.address = "Address is required";
    }
    if (!phone) {
      errors.phone = "Phone is required";
    } else if (!/^\d+$/.test(phone)) {
      errors.phone = "Phone is invalid";
    }
    if (paymentMethod === "creditCard") {
      if (!cardNumber) {
        errors.cardNumber = "Card number is required";
      } else if (!/^\d+$/.test(cardNumber)) {
        errors.cardNumber = "Card number is invalid";
      }
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!validateForm()) {
      alert(JSON.stringify(errors));
      return;
    }

    const formData = {
      name,
      email,
      address,
      phone,
      paymentMethod,
      cardNumber,
    };

    console.log(formData);
  };

  return (
    <Form
      className="bg-secondary text-primary rounded-4 p-5"
      onSubmit={handleSubmit}
    >
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter name"
          required
          onChange={(e) => setName(e.target.value)}
          value={name}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter email"
          required
          onChange={(e) => setEmail(e.target.value)}
          value={email}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formAddress">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter address"
          required
          onChange={(e) => setAddress(e.target.value)}
          value={address}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPhone">
        <Form.Label>Phone</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter phone"
          required
          onChange={(e) => setPhone(e.target.value)}
          value={phone}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPaymentMethod">
        <p className="mb-2">Payment Method</p>
        <Form.Check
          inline
          label="Cash on Delivery"
          name="paymentMethod"
          type="radio"
          id="cashOnDelivery"
          onChange={() => setPaymentMethod("cashOnDelivery")}
          required
          checked={paymentMethod === "cashOnDelivery"}
        />
        <Form.Check
          inline
          label="Credit Card"
          name="paymentMethod"
          type="radio"
          id="creditCard"
          onChange={() => setPaymentMethod("creditCard")}
          required
          checked={paymentMethod === "creditCard"}
        />
      </Form.Group>

      {paymentMethod === "creditCard" && (
        <Form.Group className="mb-3" controlId="formCardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter card number"
            required
            onChange={(e) => setCardNumber(e.target.value)}
            value={cardNumber}
          />
        </Form.Group>
      )}

      <Button
        variant="primary"
        type="submit"
        className="w-100 py-2 fs-5 text-uppercase fw-semibold"
      >
        Order
      </Button>
    </Form>
  );
}
