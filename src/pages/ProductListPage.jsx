import { FilterIcon } from "lucide-react";
import { Card, Col, Container, Row } from "react-bootstrap";
import CustomOffcanvas from "../components/CustomOffcanvas";
import ProductListPagenation from "../sections/ProductListPagenation";
import ProductListView from "../sections/ProductListView";
import ProductsFilter from "../sections/ProductsFilter";
import { ProductListProvider } from "../contexts/productListContext";

export default function ProductListPageX() {
  return (
    <ProductListProvider>
      <Container className="my-3 my-lg-4 my-xl-5">
        <CustomOffcanvas>
          <CustomOffcanvas.Trigger variant="outline-primary border-0 my-2 d-xl-none d-flex align-items-center justify-content-center gap-1">
            <FilterIcon /> Filter
          </CustomOffcanvas.Trigger>
          <CustomOffcanvas.Offcanvas>
            <CustomOffcanvas.Offcanvas.Header closeButton>
              <CustomOffcanvas.Offcanvas.Title>
                Filter
              </CustomOffcanvas.Offcanvas.Title>
            </CustomOffcanvas.Offcanvas.Header>
            <CustomOffcanvas.Offcanvas.Body>
              <ProductsFilter />
            </CustomOffcanvas.Offcanvas.Body>
          </CustomOffcanvas.Offcanvas>
          <hr className="d-xl-none" />
        </CustomOffcanvas>
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
        <div className="position-sticky bottom-0 start-50 translate-middle-x py-3 z-2" style={{ width: "fit-content" }}>
          <ProductListPagenation />
        </div>
      </Container>
    </ProductListProvider>
  );
}
