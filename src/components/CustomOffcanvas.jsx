import { createContext, useContext, useState } from "react";
import { Button, Offcanvas } from "react-bootstrap";

const CustomOffcanvasContext = createContext();

function useCustomOffcanvasContext() {
  const context = useContext(CustomOffcanvasContext);

  if (!context) {
    throw new Error(
      "useCustomOffcanvasContext must be used within a CustomOffcanvasProvider"
    );
  }

  return context;
}

export default function CustomOffcanvas({ children }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <CustomOffcanvasContext.Provider value={{ show, handleClose, handleShow }}>
      {children}
    </CustomOffcanvasContext.Provider>
  );
}

CustomOffcanvas.Trigger = function CustomOffcanvasTrigger({
  children,
  ...props
}) {
  const { handleShow } = useCustomOffcanvasContext();
  return (
    <Button onClick={handleShow} {...props}>
      {children}
    </Button>
  );
};

CustomOffcanvas.Offcanvas = function CustomOffcanvasOffcanvas({
  children,
  ...props
}) {
  const { show, handleClose } = useCustomOffcanvasContext();
  return (
    <Offcanvas show={show} onHide={handleClose} {...props}>
      {children}
    </Offcanvas>
  );
};

CustomOffcanvas.Offcanvas.Header = Offcanvas.Header;

CustomOffcanvas.Offcanvas.Title = Offcanvas.Title;

CustomOffcanvas.Offcanvas.Body = Offcanvas.Body;
