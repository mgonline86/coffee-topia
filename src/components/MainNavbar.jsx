import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link, useLocation } from "react-router-dom";
import CartOffcanvas from "./CartOffcanvas";
import SearchBar from "./SearchBar";
import UserNavDropdown from "./UserNavDropdown";
import SearchModal from "./SearchModal";
import MobileSidebar from "./MobileSidebar";
import {
  CoffeeIcon,
  CupSodaIcon,
  HomeIcon,
  ShoppingBasketIcon,
} from "lucide-react";
import { useMemo } from "react";

export default function MainNavbar() {
  const { pathname, search } = useLocation();
  const currentPath = useMemo(() => pathname + search, [pathname, search]);

  const links = [
    {
      name: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      name: "Shop",
      path: "/products",
      icon: <ShoppingBasketIcon />,
    },
    {
      name: "Coffee",
      path: "/products?tags=coffee",
      icon: <CoffeeIcon />,
    },
    {
      name: "Mugs",
      path: "/products?tags=mugs",
      icon: <CupSodaIcon />,
    },
  ];

  return (
    <Navbar expand="lg" className="bg-white shadow" sticky="top">
      <Container className="gap-md-3">
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
        {links && links.length > 0 && (
          <Nav className="ms-auto my-2 my-lg-0 align-items-center d-none d-lg-flex">
            {links.map((link) => (
              <Nav.Link
                as={Link}
                to={link.path}
                key={link.name}
                active={currentPath === link.path}
                onClick={() => window.scrollTo(0, 0)}
              >
                {link.name}
              </Nav.Link>
            ))}
          </Nav>
        )}
        <div className="d-flex align-items-center justify-content-end gap-md-3">
          <div className="d-lg-none">
            <SearchModal />
          </div>
          <UserNavDropdown />
          <CartOffcanvas />
          <div className="d-lg-none">
            <MobileSidebar links={links} />
          </div>
        </div>
      </Container>
    </Navbar>
  );
}
