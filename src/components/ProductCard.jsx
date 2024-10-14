import { CoffeeIcon } from "lucide-react";
import { Badge } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import useCartContext from "../contexts/cartContext";
import styles from "./ProductCard.module.css";

export default function ProductCard({ product, index = null }) {
  const { addToCart, handleShowCart } = useCartContext();
  const { title, price, image, slug } = product;
  return (
    <Card
      className={`mx-auto rounded-3 h-100 shadow border-0 ${styles.productCard}`}
    >
      {product.discount > 0 && (
        <Badge
          bg="danger"
          className={`position-absolute top-0 end-0 z-1 m-2 ${styles.productCardBadge}`}
        >
          {(product.discount * 100).toFixed(1)}% OFF
        </Badge>
      )}
      <Link to={`/products/${slug}`}>
        <Card.Img
          variant="top"
          src={image
            .replaceAll(".jpg", "_x400.jpg")
            .replaceAll(".png", "_x400.png")
            .replaceAll(".webp", "_x400.webp")}
          className={styles.productCardImg}
          alt={title}
          loading={index !== null && index < 8 ? "eager" : "lazy"} // preload images if first row
        />
      </Link>
      <Card.Body className="d-flex flex-column p-2 p-md-3">
        <Card.Title
          as={Link}
          to={`/products/${slug}`}
          className={`text-decoration-none h6 text-start ${styles.productCardTitle}`}
        >
          {title}
        </Card.Title>
        <div className="d-flex flex-column align-items-center justify-content-center mt-auto">
          {product.discount > 0 ? (
            <Card.Text
              as="div"
              className={`d-flex align-items-baseline gap-2 fw-bold fs-5 align-self-start flex-wrap flex-md-nowrap mb-2 mb-md-3 ${styles.productCardPriceContainer}`}
            >
              <span className={styles.productCardPrice}>
                EGP {(price - price * product.discount).toFixed(1)}
              </span>
              <span
                className={`text-decoration-line-through fs-6 text-muted ${styles.productCardPrice}`}
              >
                EGP {price.toFixed(1)}
              </span>
            </Card.Text>
          ) : (
            <Card.Text
              className={`fw-bold align-self-start mb-2 mb-md-3 fs-5 ${styles.productCardPrice}`}
            >
              EGP {price.toFixed(1)}
            </Card.Text>
          )}
          <Button
            variant="primary"
            className={`w-100 text-uppercase d-flex align-items-center justify-content-center gap-2 py-1 py-sm-2 ${styles.productCardBtn}`}
            onClick={() => {
              addToCart(product);
              handleShowCart();
            }}
          >
            Add to Cart
            <CoffeeIcon className={styles.productCardBtnIcon} />
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}
