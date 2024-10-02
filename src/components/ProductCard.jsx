import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styles from "./ProductCard.module.css";
import { CoffeeIcon } from "lucide-react";

export default function ProductCard({ product }) {
  const { title, price, image, slug } = product;
  return (
    <Card
      className="mx-auto rounded-3 h-100 shadow border-0"
      style={{ width: "16rem" }}
    >
      <Link to={`/products/${slug}`}>
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
          <Card.Text className="fw-bold fs-4 align-self-start">
            EGP {price}
          </Card.Text>
          <Button
            variant="primary"
            className="w-100 text-uppercase d-flex align-items-center justify-content-center gap-2"
            style={{ maxWidth: "10rem" }}
          >
            Add to Cart
            <CoffeeIcon />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
