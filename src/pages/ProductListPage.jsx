import { FilterIcon } from "lucide-react";
import { Button, Card, Col, Container, Offcanvas, Row } from "react-bootstrap";
import { ProductListProvider } from "../contexts/ProductListContext";
import ProductListPagenation from "../sections/ProductListPagenation";
import ProductListView from "../sections/ProductListView";
import ProductsFilter from "../sections/ProductsFilter";
import { useState } from "react";

export default function ProductListPageX() {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <ProductListProvider>
      <Container className="my-3 my-lg-4 my-xl-5">
        <div>
          <Button
            variant="outline-primary"
            className="border-0 my-2 d-xl-none d-flex align-items-center justify-content-center gap-1"
            onClick={handleShow}
          >
            <FilterIcon /> Filter
          </Button>
          <Offcanvas show={show} onHide={handleClose}>
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>
                Filter
              </Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <ProductsFilter closeOffcanvas={handleClose} />
            </Offcanvas.Body>
          </Offcanvas>
          <hr className="d-xl-none" />
        </div>
        <Row>
          <Col xl={3} className="d-none d-xl-block">
            <Card>
              <Card.Header>
                <Card.Title className="d-flex align-items-center gap-2 text-primary">
                  <FilterIcon /> Filter
                </Card.Title>
              </Card.Header>
              <Card.Body>
                <ProductsFilter />
              </Card.Body>
            </Card>
          </Col>
          <Col>
            <ProductListView />
          </Col>
        </Row>
        <div
          className="position-sticky bottom-0 start-50 translate-middle-x py-3 z-2"
          style={{ width: "fit-content" }}
        >
          <ProductListPagenation />
        </div>
      </Container>
    </ProductListProvider>
  );
}
