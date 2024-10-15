import { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import useAuthContext from "../contexts/AuthContext";
import useToastContext from "../contexts/ToastContext";

export default function LoginPage() {
  const { getUserByEmail, validatePassword, login, isLogged } =
    useAuthContext();
  const { toast } = useToastContext();
  const navigate = useNavigate();

  const [email, setEmail] = useState({
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

  useEffect(() => {
    if (isLogged) {
      toast.success("You are logged in", { position: "bottom-center" });
      navigate("/");
    }
  }, [isLogged, navigate, toast]);

  // Define state setters
  const setters = {
    email: setEmail,
    password: setPassword,
  };

  // Define validations
  const validations = {
    email: (value) => [
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value.trim()), // Valid email format
      ["Invalid email format"],
    ],
    password: (value) => [
      value.trim().length > 0, // Password is not empty
      ["Password is required"],
    ],
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
    let formValidations = [email.isValid, password.isValid];

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

    // check if user exists
    const user = await getUserByEmail(email.value);
    if (!user) {
      setEmail((prev) => ({
        ...prev,
        value: prev.value.trim(),
        isTouched: true,
        isValid: false,
        errors: ["User not found"],
      }));
      return;
    }

    // check if password is valid
    const isValidPassword = await validatePassword(
      password.value,
      user.password
    );
    if (!isValidPassword) {
      setPassword((prev) => ({
        ...prev,
        value: prev.value.trim(),
        isTouched: true,
        isValid: false,
        errors: ["Invalid password"],
      }));
      return;
    }

    // login
    login(user);
  };

  return (
    <Container className="my-5" style={{ maxWidth: "30rem" }}>
      <h2 className="text-center mb-4">Login</h2>
      <Form className="shadow rounded-3 p-4" onSubmit={handleSubmit} noValidate>
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
              {email.errors.join(", ")}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            required
            onChange={validateForm}
            value={password.value.trim().replaceAll(" ", "")}
            autoComplete="new-password"
            isValid={password.isDirty && password.isValid}
            isInvalid={password.isTouched && !password.isValid}
          />
          {password.isTouched && !password.isValid && (
            <Form.Control.Feedback type="invalid">
              {password.errors.join(", ")}
            </Form.Control.Feedback>
          )}
        </Form.Group>

        <Button
          className="w-100 py-2 fs-5 text-uppercase fw-semibold"
          variant="primary"
          type="submit"
        >
          Login
        </Button>

        <hr />

        <p>
          Don't have an account? <Link to="/register">Register</Link>
        </p>
      </Form>
    </Container>
  );
}
