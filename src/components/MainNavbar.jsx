import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/cartContext";
import { ShoppingCartIcon } from "lucide-react";

export default function MainNavbar() {
  const { itemsCount } = useCartContext();
  return (
    <Navbar expand="lg" className="bg-white shadow" sticky="top">
      <Container>
        <Navbar.Brand as={Link} to={"/"}>
          <img
            className="rounded"
            src="/logo.svg"
            alt="logo"
            width={75}
            height={45}
          />
        </Navbar.Brand>
        <Form className="d-flex flex-grow-1" style={{ maxWidth: "30rem" }}>
          <Form.Control
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll" className="flex-grow-0">
          <Nav className="ms-auto my-2 my-lg-0 align-items-center">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/products"}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to={"/profile"}>
              Profile
            </Nav.Link>
            <Nav.Link as={Link} to={"/cart"} className="position-relative py-0 mx-3">
              <ShoppingCartIcon />
              <Badge
                bg="danger"
                pill
                className="position-absolute top-0 start-100 translate-middle"
              >
                {itemsCount > 99 ? "99+" : itemsCount}
              </Badge>
            </Nav.Link>
          </Nav>

          <div className="d-flex gap-2 mx-2">
            <Button as={Link} to={"/login"} variant="secondary">
              Login
            </Button>
            <Button as={Link} to={"/register"} variant="primary">
              Register
            </Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
