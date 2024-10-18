import { Col, Row } from "react-bootstrap";
import useProductListContext from "../contexts/ProductListContext";
import ProductCard from "../components/ProductCard";
import SlideUpAnimation from "../components/SlideUpAnimation";

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
        <Col xs={6} sm key={product.id} className="px-2 px-lg-3">
          <SlideUpAnimation>
            <ProductCard product={product} index={index} />
          </SlideUpAnimation>
        </Col>
      ))}
    </Row>
  );
}
