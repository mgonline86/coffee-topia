import { SearchIcon, ShoppingCartIcon } from "lucide-react";
import { Badge, Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/cartContext";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function MainNavbar() {
  const { itemsCount } = useCartContext();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
        <div className="flex-grow-1 d-none d-lg-block">
          <SearchBar />
        </div>
        <div className="d-lg-none d-flex align-items-center justify-content-end gap-2">
          <Button
            variant="outline-primary"
            className="border-0"
            onClick={handleShow}
          >
            <SearchIcon />
          </Button>
          <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SearchBar name="searchMobile" autoFocus={true} />
            </Modal.Body>
          </Modal>
          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>
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
            <Nav.Link
              as={Link}
              to={"/cart"}
              className="position-relative py-0 mx-3"
            >
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
