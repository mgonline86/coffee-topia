import { Pagination } from "react-bootstrap";
import useProductListContext from "../contexts/ProductListContext";

export default function ProductListPagenation() {
  const { viewProducts, pagesCount, currentPage, handlePageChange } =
    useProductListContext();

  if (viewProducts.length === 0) {
    return null;
  }
  return (
    <Pagination className="shadow rounded border border-2 border-primary m-0">
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
  );
}
