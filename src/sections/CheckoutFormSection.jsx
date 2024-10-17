import { BanknoteIcon, CreditCardIcon } from "lucide-react";
import { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import useAuthContext from "../contexts/AuthContext";
import useCartContext from "../contexts/CartContext";
import ThankYouSection from "./ThankYouSection";
import ThankYouCard from "../components/ThankYouCard";

export default function CheckoutFormSection({ closeSummary = null }) {
  const { user, setUser, updateUserInUsers } = useAuthContext();
  const { subTotal, totalDiscount, shipping, total, cartLineItems } =
    useCartContext();

  // Define states
  const [showThankYou, setShowThankYou] = useState(false);
  const [name, setName] = useState({
    value: user?.name || "",
    isValid: user?.name ? true : false,
    isTouched: user?.name ? true : false,
    isDirty: user?.name ? true : false,
  });
  const [email, setEmail] = useState({
    value: user?.email || "",
    isValid: user?.email ? true : false,
    isTouched: user?.email ? true : false,
    isDirty: user?.email ? true : false,
  });
  const [address, setAddress] = useState({
    value: user?.address || "",
    isValid: user?.address ? true : false,
    isTouched: user?.address ? true : false,
    isDirty: user?.address ? true : false,
  });
  const [phone, setPhone] = useState({
    value: user?.phone || "",
    isValid: user?.phone ? true : false,
    isTouched: user?.phone ? true : false,
    isDirty: user?.phone ? true : false,
  });
  const [paymentMethod, setPaymentMethod] = useState("Cash On Delivery");
  const [cardNumber, setCardNumber] = useState({
    value: "",
    isValid: false,
    isTouched: false,
    isDirty: false,
  });

  // Define state setters
  const setters = {
    name: setName,
    email: setEmail,
    address: setAddress,
    phone: setPhone,
    paymentMethod: setPaymentMethod,
    cardNumber: (newState) => {
      const trimmedValue = newState.value;
      if (trimmedValue.length > 19) {
        const alteredState = {
          ...newState,
          value: trimmedValue.slice(0, 19),
        };
        return setCardNumber((prev) => ({ ...prev, ...alteredState }));
      }
      return setCardNumber((prev) => ({ ...prev, ...newState }));
    },
  };

  // Define validations
  const validations = {
    name: (value) => value.trim().length > 2, // Minimum 3 characters
    email: (value) =>
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim()), // Valid email format
    address: (value) => value.trim().length > 20, // Minimum 20 characters
    phone: (value) => /^(\+201\d{9}|01\d{9})$/.test(value.trim()), // Valid Egyptian phone number format
    cardNumber: (value) => {
      const processedValue = value.trim().slice(0, 19).replaceAll(" ", ""); // Remove whitespace and limit to 16 digits
      return /^\d{16}$/.test(processedValue); // Valid card number format
    },
  };

  // Validate form
  const validateForm = (e) => {
    const { id, value } = e.target;
    const isValid = validations[id](value);
    const isTouched = true;
    const isDirty = value !== "";
    setters[id]({
      value,
      isValid,
      isTouched,
      isDirty,
    });
  };

  // Handle form submission
  const handleSubmit = (event) => {
    event.preventDefault();
    let formValidations = [
      name.isValid,
      email.isValid,
      address.isValid,
      phone.isValid,
    ];
    if (paymentMethod === "Credit Card") {
      formValidations.push(cardNumber.isValid);
    }
    const isFormValid = formValidations.every((valid) => valid);
    if (!isFormValid) {
      setName((prev) => ({
        ...prev,
        value: prev.value.trim(),
        isTouched: true,
      }));
      setEmail((prev) => ({
        ...prev,
        value: prev.value.trim(),
        isTouched: true,
      }));
      setAddress((prev) => ({
        ...prev,
        value: prev.value.trim(),
        isTouched: true,
      }));
      setPhone((prev) => ({
        ...prev,
        value: prev.value.trim(),
        isTouched: true,
      }));
      if (paymentMethod === "Credit Card") {
        setCardNumber((prev) => ({
          ...prev,
          isTouched: true,
        }));
      }
      return;
    }

    // Submit form
    const formData = {
      name: name.value.trim(),
      email: email.value.trim(),
      address: address.value.trim(),
      phone: phone.value.trim(),
      paymentMethod,
      cardNumber: cardNumber.value.replaceAll(" ", "").trim(),
    };

    if (user) {
      const oldOrders = [...user.orders];

      // limit to 10 orders for preview purposes
      if (oldOrders.length >= 10) {
        oldOrders.shift();
      }

      delete formData.cardNumber;

      const newOrder = {
        id: `#${Date.now()}`,
        date: Date(),
        cartLineItems,
        details: formData,
        subTotal,
        totalDiscount,
        shipping,
        total,
      };

      const updatedOrders = [newOrder, ...oldOrders];
      setUser((prev) => {
        return { ...prev, orders: updatedOrders };
      });

      updateUserInUsers({ ...user, orders: updatedOrders });
    }

    setShowThankYou(true);
    if (closeSummary) closeSummary();
  };

  if (showThankYou) {
    return (
      <ThankYouSection>
        <ThankYouCard
          data={{
            name: name.value,
            email: email.value,
            address: address.value,
            phone: phone.value,
            paymentMethod,
            cardNumber: cardNumber.value,
          }}
        />
      </ThankYouSection>
    );
  }

  return (
    <Form
      className="bg-secondary text-primary rounded-4 py-4 px-3 p-lg-5 shadow"
      onSubmit={handleSubmit}
      noValidate
    >
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Name</Form.Label>
        <Form.Control
          type="text"
          placeholder="John Doe"
          required
          onChange={validateForm}
          value={name.value}
          autoFocus
          autoComplete="name"
          isValid={name.isDirty && name.isValid}
          isInvalid={name.isTouched && !name.isValid}
        />
        {name.isTouched && !name.isValid && (
          <Form.Control.Feedback type="invalid">
            Name must be at least 3 characters
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="email">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="text"
          placeholder="johndoe@example"
          required
          onChange={validateForm}
          value={email.value}
          autoComplete="email"
          isValid={email.isDirty && email.isValid}
          isInvalid={email.isTouched && !email.isValid}
        />
        {email.isTouched && !email.isValid && (
          <Form.Control.Feedback type="invalid">
            Invalid email
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="address">
        <Form.Label>Address</Form.Label>
        <Form.Control
          type="text"
          placeholder="456 Elm St, Example City, USA, 90210"
          required
          onChange={validateForm}
          value={address.value}
          autoComplete="address"
          isValid={address.isDirty && address.isValid}
          isInvalid={address.isTouched && !address.isValid}
        />
        {address.isTouched && !address.isValid && (
          <Form.Control.Feedback type="invalid">
            Address must be at least 20 characters
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Mobile Number</Form.Label>
        <Form.Control
          type="text"
          placeholder="+20123456789"
          required
          onChange={validateForm}
          value={phone.value}
          autoComplete="phone"
          isValid={phone.isDirty && phone.isValid}
          isInvalid={phone.isTouched && !phone.isValid}
        />
        {phone.isTouched && !phone.isValid && (
          <Form.Control.Feedback type="invalid">
            Invalid phone number
          </Form.Control.Feedback>
        )}
      </Form.Group>

      <Form.Group className="mb-3">
        <p className="mb-1">Payment Method</p>
        <Form.Check
          inline
          className="d-inline-flex align-items-center gap-1"
          label={
            <>
              <BanknoteIcon /> Cash on Delivery
            </>
          }
          name="paymentMethod"
          type="radio"
          id="cashOnDelivery"
          onChange={() => setPaymentMethod("Cash On Delivery")}
          required
          checked={paymentMethod === "Cash On Delivery"}
        />
        <Form.Check
          inline
          className="d-inline-flex align-items-center gap-1"
          label={
            <>
              <CreditCardIcon /> Credit Card
            </>
          }
          name="paymentMethod"
          type="radio"
          id="creditCard"
          onChange={() => setPaymentMethod("Credit Card")}
          required
          checked={paymentMethod === "Credit Card"}
        />
      </Form.Group>

      {paymentMethod === "Credit Card" && (
        <Form.Group className="mb-3" controlId="cardNumber">
          <Form.Label>Card Number</Form.Label>
          <Form.Control
            type="text"
            placeholder="1234 5678 9012 3456"
            required
            onChange={validateForm}
            value={
              cardNumber.value
                ?.slice(0, 19)
                ?.match(/\d{1,4}/g)
                ?.join(" ") || ""
            }
            autoComplete="cc-number"
            isValid={cardNumber.isDirty && cardNumber.isValid}
            isInvalid={cardNumber.isTouched && !cardNumber.isValid}
          />
          {cardNumber.isTouched && !cardNumber.isValid && (
            <Form.Control.Feedback type="invalid">
              Invalid card number
            </Form.Control.Feedback>
          )}
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
