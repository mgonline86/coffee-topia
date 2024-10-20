import { Col, Image, Row } from "react-bootstrap";
import CoolTitle from "../components/CoolTitle";
import ProductCard from "../components/ProductCard";
import SlideUpAnimation from "../components/SlideUpAnimation";
import useProductListContext from "../contexts/ProductListContext";

export default function ProductListView() {
  const { viewProducts } = useProductListContext();
  return (
    <Row className="g-4">
      {viewProducts.length === 0 && (
        <Col className="text-center my-5">
          <Image
            src="/img/not-found.webp"
            alt="not found"
            fluid
            width={130}
            height={110}
          />
          <div className="mt-3 text-primary">
            <CoolTitle title="No products found!" />
          </div>
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
