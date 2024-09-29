import { useContext } from "react";
import { useParams } from "react-router-dom";
import ProductContext from "../contexts/productContext";
import { Container } from "react-bootstrap";

export default function ProductPage() {
  const { slug } = useParams();
  const { getProductBySlug } = useContext(ProductContext);
  const product = getProductBySlug(slug);
  console.log(product);
  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Container>
      <div>{product.title}</div>
      <div>EGP {product.price}</div>
      <div dangerouslySetInnerHTML={{ __html: product.description }} />
    </Container>
  );
}
