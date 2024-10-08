import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function CollectionCard ({ product }) {
  const { title, image } = product;
  return (
    <Card
      className="mx-auto rounded-3 h-100 shadow border-0"
      style={{ width: "18rem" }}
    >
      <Link to={`/products/?brands=${encodeURI(title)}`}>
        <Card.Img variant="top" src={image} className="p-2" alt={title} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as={Link} to={`/products/?brands=${encodeURI(title)}`} className="text-decoration-none h5">
          {title}
        </Card.Title>

      </Card.Body>
    </Card>
  );
}
