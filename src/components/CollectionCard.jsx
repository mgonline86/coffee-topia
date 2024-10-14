import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";
import styles from "./CollectionCard.module.css";

export default function CollectionCard({ product }) {
  const { title, image } = product;
  return (
    <Card
      className={`mx-auto rounded-3 h-100 shadow border-0 ${styles.collectionCard}`}
    >
      <Link to={`/products/?brands=${encodeURI(title)}`}>
        <Card.Img
          variant="top"
          src={image}
          alt={title}
          className={styles.collectionCardImg}
        />
      </Link>
      <Card.Body className="d-flex flex-column p-2 p-md-3">
        <Card.Title
          as={Link}
          to={`/products/?brands=${encodeURI(title)}`}
          className={`text-decoration-none h6 ${styles.collectionCardTitle}`}
        >
          {title}
        </Card.Title>
      </Card.Body>
    </Card>
  );
}
