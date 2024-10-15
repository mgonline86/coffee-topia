import { MenuIcon } from "lucide-react";
import { useMemo, useState } from "react";
import { Nav, Offcanvas } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import { Link, useLocation } from "react-router-dom";

export default function MobileSidebar({ links }) {
  const [show, setShow] = useState(false);
  const { pathname, search } = useLocation();
  const currentPath = useMemo(() => pathname + search, [pathname, search]);
  const handleClose = () => {
    window.scrollTo(0, 0);
    setShow(false);
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="link"
        size="sm"
        className="position-relative"
        onClick={handleShow}
      >
        <MenuIcon />
      </Button>
      <Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            {" "}
            <Link to={"/"}>
              <img
                className="rounded"
                src="/logo.svg"
                alt="logo"
                width={75}
                height={45}
              />
            </Link>
          </Offcanvas.Title>
        </Offcanvas.Header>
        {links && links.length > 0 && (
          <Offcanvas.Body as={Nav} defaultActiveKey="/">
            {links.map((link) => (
              <Nav.Link
                as={Link}
                to={link.path}
                key={link.name}
                onClick={handleClose}
                active={currentPath === link.path}
                className="text-uppercase d-flex align-items-center p-3 fw-semibold text-primary navLink"
              >
                {link.icon}
                <span className="ms-2">{link.name}</span>
              </Nav.Link>
            ))}
          </Offcanvas.Body>
        )}
      </Offcanvas>
    </>
  );
}
