import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export default function MainNavbar() {
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand as={Link} to={"/"}><img className="rounded" src="/logo.svg" alt="logo" width={80} height={80} /></Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav className="ms-auto my-2 my-lg-0">
            <Nav.Link as={Link} to={"/"}>
              Home
            </Nav.Link>
            <Nav.Link as={Link} to={"/products"}>
              Products
            </Nav.Link>
            <Nav.Link as={Link} to={"/cart"}>
              Cart
            </Nav.Link>
            <Nav.Link as={Link} to={"/profile"}>
              Profile
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Form.Control
              type="search"
              placeholder="Search"
              className="me-2"
              aria-label="Search"
            />
          </Form>
          <div className="d-flex gap-2 mx-2">
            <Button as={Link} to={"/login"} variant="secondary">Login</Button>
            <Button as={Link} to={"/register"} variant="primary">Register</Button>
          </div>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
