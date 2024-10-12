import { Col, Row } from "react-bootstrap";
import useProductListContext from "../contexts/productListContext";
import ProductCard from "../components/ProductCard";

export default function ProductListView() {
  const { viewProducts } = useProductListContext();
  return (
    <Row className="g-4">
      {viewProducts.length === 0 && (
        <Col className="text-center my-5">
          <img
            src="img/not-found.webp"
            alt="not found"
            className="img-fluid"
            width={130}
            height={110}
          />
          <h2 className="mt-3 text-primary">No products found!</h2>
        </Col>
      )}
      {viewProducts.map((product, index) => (
        <Col key={product.id} xs={12} md={6} lg={4}>
          <ProductCard product={product} index={index} />
        </Col>
      ))}
    </Row>
  );
}
