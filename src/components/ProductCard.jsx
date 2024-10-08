import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { CoffeeIcon } from "lucide-react";
import { Badge } from "react-bootstrap";
import useCartContext from "../contexts/cartContext";

export default function ProductCard({ product }) {
  const { addToCart } = useCartContext();
  const { title, price, image, slug } = product;
  return (
    <Card
      className="mx-auto rounded-3 h-100 shadow border-0"
      style={{ width: "16rem" }}
    >
      {product.discount > 0 && (
        <Badge bg="danger" className="position-absolute top-0 end-0 z-1 m-2">
          {(product.discount * 100).toFixed(1)}% OFF
        </Badge>
      )}
      <Link to={`/products/${slug}`} className="overflow-hidden">
        <Card.Img
          variant="top"
          src={image
            .replaceAll(".jpg", "_x400.jpg")
            .replaceAll(".png", "_x400.png")
            .replaceAll(".webp", "_x400.webp")}
          className={`p-2 ${styles.cardImage}`}
          alt={title}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title
          as={Link}
          to={`/products/${slug}`}
          className="text-decoration-none h6"
        >
          {title}
        </Card.Title>
        <div className="d-flex flex-column align-items-center justify-content-center mt-auto">
          {product.discount > 0 ? (
            <Card.Text className="d-flex align-items-center gap-2 fw-bold fs-5 align-self-start">
              <span>EGP {(price - price * product.discount).toFixed(1)}</span>
              <span className="fs-6 text-decoration-line-through text-muted">
                EGP {price.toFixed(1)}
              </span>
            </Card.Text>
          ) : (
            <Card.Text className="fw-bold fs-5 align-self-start">
              <span>EGP {price.toFixed(1)}</span>
            </Card.Text>
          )}
          <Button
            variant="primary"
            className="w-100 text-uppercase d-flex align-items-center justify-content-center gap-2"
            style={{ maxWidth: "10rem" }}
            onClick={() => addToCart(product)}
          >
            Add to Cart
            <CoffeeIcon />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
