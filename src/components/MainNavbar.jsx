import { SearchIcon } from "lucide-react";
import { useState } from "react";
import { Modal } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import CartOffcanvas from "./CartOffcanvas";
import SearchBar from "./SearchBar";
import UserNavDropdown from "./UserNavDropdown";

export default function MainNavbar() {
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
        <div className="flex-grow-1 d-none d-lg-flex justify-content-center">
          <SearchBar />
        </div>
        <div className="d-flex align-items-center justify-content-end gap-1 gap-md-2">
          <Button
            variant="link"
            className="border-0 px-0 d-lg-none"
            onClick={handleShow}
          >
            <SearchIcon />
          </Button>
          <Modal show={show} onHide={handleClose} className="d-lg-none">
            <Modal.Header closeButton>
              <Modal.Title>Search</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <SearchBar
                name="searchMobile"
                autoFocus={true}
                closeModal={handleClose}
              />
            </Modal.Body>
          </Modal>
          <Navbar.Collapse id="navbarScroll" className="flex-grow-0">
            <Nav className="ms-auto my-2 my-lg-0 align-items-center">
              <Nav.Link as={Link} to={"/"}>
                Home
              </Nav.Link>
              <Nav.Link as={Link} to={"/products"}>
                All Products
              </Nav.Link>
              <Nav.Link as={Link} to="/products?tags=coffee">
                Coffee
              </Nav.Link>
              <Nav.Link as={Link} to="/products?tags=mugs">
                Mugs
              </Nav.Link>
            </Nav>
            <UserNavDropdown />
          </Navbar.Collapse>

          <CartOffcanvas />

          <Navbar.Toggle aria-controls="navbarScroll" />
        </div>
      </Container>
    </Navbar>
  );
}
