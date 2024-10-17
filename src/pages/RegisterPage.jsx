import { EyeIcon, EyeOffIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Col, Container, InputGroup, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import useToastContext from "../contexts/ToastContext";

export default function RegisterPage() {
  const { users, hashPassword, register, isLogged } = useAuthContext();
  const { toast } = useToastContext();
  const navigate = useNavigate();

  const [name, setName] = useState({
    value: "",
    isValid: false,
    isTouched: false,
    isDirty: false,
    errors: ["Required field"],
  });
  const [email, setEmail] = useState({
    value: "",
    isValid: false,
    isTouched: false,
    isDirty: false,
    errors: ["Required field"],
  });
  const [address, setAddress] = useState({
    value: "",
    isValid: false,
    isTouched: false,
    isDirty: false,
    errors: ["Required field"],
  });
  const [phone, setPhone] = useState({
    value: "",
    isValid: false,
    isTouched: false,
    isDirty: false,
    errors: ["Required field"],
  });
  const [password, setPassword] = useState({
    value: "",
    isValid: false,
    isTouched: false,
    isDirty: false,
    errors: ["Required field"],
  });
  const [confirmPassword, setConfirmPassword] = useState({
    value: "",
    isValid: false,
    isTouched: false,
    isDirty: false,
    errors: ["Required field"],
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  useEffect(() => {
    if (isLogged) {
      toast.success("You are logged in");
      navigate("/");
    }
  }, [isLogged, navigate, toast]);

  // Define state setters
  const setters = {
    name: setName,
    email: setEmail,
    address: setAddress,
    phone: setPhone,
    password: setPassword,
    confirmPassword: setConfirmPassword,
  };

  // Define validations
  const validations = {
    name: (value) => [value.trim().length > 2, ["Minimum 3 characters"]], // Minimum 3 characters
    email: (value) => {
      let errors = [];
      const isValidEmail =
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim()); // Valid email format
      const isUnique = users.every((user) => user.email !== value.trim()); // Email is unique

      if (!isValidEmail) {
        errors.push("Invalid email format");
      }
      if (!isUnique) {
        errors.push("Email already exists");
      }

      return [isValidEmail && isUnique, errors];
    },
    address: (value) => [value.trim().length > 20, ["Minimum 20 characters"]], // Minimum 20 characters
    phone: (value) => [
      /^(\+201\d{9}|01\d{9})$/.test(value.trim()),
      ["Invalid Egyptian phone number format"],
    ], // Valid Egyptian mobile phone number format
    password: (value) => {
      let errors = [];
      const hasMinLength = value.trim().length > 7; // Minimum 8 characters
      const hasUppercase = /[A-Z]/.test(value.trim()); // At least one uppercase letter
      const hasLowercase = /[a-z]/.test(value.trim()); // At least one lowercase letter
      const hasNumber = /[0-9]/.test(value.trim()); // At least one number
      const hasSpecialChar = /[^A-Za-z0-9]/.test(value.trim()); // At least one special character

      if (!hasMinLength) {
        errors.push("Minimum 8 characters");
      }
      if (!hasUppercase) {
        errors.push("At least one uppercase letter");
      }
      if (!hasLowercase) {
        errors.push("At least one lowercase letter");
      }
      if (!hasNumber) {
        errors.push("At least one number");
      }
      if (!hasSpecialChar) {
        errors.push("At least one special character");
      }
      return [
        hasMinLength &&
          hasUppercase &&
          hasLowercase &&
          hasNumber &&
          hasSpecialChar,
        errors,
      ];
    },
    confirmPassword: (value) => [
      value.trim() === password.value.trim(),
      ["Passwords do not match"],
    ], // Passwords match
  };

  // Validate form
  const validateForm = (e) => {
    const { id, value } = e.target;
    const [isValid, errors] = validations[id](value);
    const isTouched = true;
    const isDirty = value !== "";
    setters[id]({
      value,
      isValid,
      isTouched,
      isDirty,
      errors,
    });
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    let formValidations = [
      name.isValid,
      email.isValid,
      address.isValid,
      phone.isValid,
      password.isValid,
      confirmPassword.isValid,
    ];

    const isFormValid = formValidations.every((valid) => valid);
    if (!isFormValid) {
      Object.values(setters).forEach((setter) =>
        setter((prev) => ({
          ...prev,
          value: prev.value.trim(),
          isTouched: true,
        }))
      );
      return;
    }

    const hashedPassword = await hashPassword(password.value.trim());

    // Submit form
    const formData = {
      email: email.value.trim(),
      password: hashedPassword,
      name: name.value.trim(),
      address: address.value.trim(),
      phone: phone.value.trim(),
    };

    // Register user
    register(formData);
  };

  return (
    <Container className="my-5" style={{ maxWidth: "60rem" }}>
      <h2 className="text-center mb-4">Register</h2>
      <Form
        className="shadow rounded-3 p-4 w-100"
        onSubmit={handleSubmit}
        noValidate
      >
        <Row xs={1} md={2}>
          <Form.Group as={Col} className="mb-3" controlId="name">
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
                {name.errors.join(", ")}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="email">
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
                {email.errors.join(", ")}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="address">
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
                {address.errors.join(", ")}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="phone">
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
                {phone.errors.join(", ")}
              </Form.Control.Feedback>
            )}
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="password">
            <Form.Label>Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                required
                onChange={validateForm}
                value={password.value.trim().replaceAll(" ", "")}
                autoComplete="new-password"
                isValid={password.isDirty && password.isValid}
                isInvalid={password.isTouched && !password.isValid}
                style={{ borderRadius: "0.375rem 0 0 0.375rem" }}
              />
              <Button
                variant="outline-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
              {password.isTouched && !password.isValid && (
                <Form.Control.Feedback type="invalid">
                  {password.errors.join(", ")}
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>
          <Form.Group as={Col} className="mb-3" controlId="confirmPassword">
            <Form.Label>Confirm Password</Form.Label>
            <InputGroup hasValidation>
              <Form.Control
                type={showConfirmPassword ? "text" : "password"}
                placeholder="Confirm Password"
                required
                onChange={validateForm}
                value={confirmPassword.value.trim().replaceAll(" ", "")}
                autoComplete="off"
                isValid={confirmPassword.isDirty && confirmPassword.isValid}
                isInvalid={
                  confirmPassword.isTouched && !confirmPassword.isValid
                }
                style={{ borderRadius: "0.375rem 0 0 0.375rem" }}
              />
              <Button
                variant="outline-primary"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? <EyeOffIcon /> : <EyeIcon />}
              </Button>
              {confirmPassword.isTouched && !confirmPassword.isValid && (
                <Form.Control.Feedback type="invalid">
                  {confirmPassword.errors.join(", ")}
                </Form.Control.Feedback>
              )}
            </InputGroup>
          </Form.Group>
        </Row>
        <div className="d-flex justify-content-center">
          <Button
            variant="primary"
            type="submit"
            className="w-100 py-2 fs-5 text-uppercase fw-semibold"
            style={{ maxWidth: "15rem" }}
          >
            Register
          </Button>
        </div>

        <hr />

        <p>
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </Form>
    </Container>
  );
}
