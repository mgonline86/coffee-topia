import { SearchIcon } from "lucide-react";
import { Button, Modal } from "react-bootstrap";
import SearchBar from "./SearchBar";
import { useState } from "react";

export default function SearchModal() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        variant="link"
        size="sm"
        onClick={handleShow}
      >
        <SearchIcon />
      </Button>
      <Modal show={show} onHide={handleClose}>
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
    </>
  );
}
