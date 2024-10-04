import { Col, Pagination, Row } from "react-bootstrap";
import useProductListContext from "../contexts/productListContext";

export default function ProductListPagenation() {
  const { viewProducts, pagesCount, currentPage, handlePageChange } =
    useProductListContext();

  if (viewProducts.length === 0) {
    return null;
  }
  return (
    <Row className="mt-4 position-sticky bottom-0">
      <Col className="d-flex justify-content-center">
        <Pagination className="shadow rounded border-primary border">
          <Pagination.First
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(1)}
          />
          <Pagination.Prev
            disabled={currentPage <= 1}
            onClick={() => handlePageChange(currentPage - 1)}
          />
          <Pagination.Next
            disabled={currentPage >= pagesCount}
            onClick={() => handlePageChange(currentPage + 1)}
          />
          <Pagination.Last
            disabled={currentPage >= pagesCount}
            onClick={() => handlePageChange(pagesCount)}
          />
        </Pagination>
      </Col>
    </Row>
  );
}
