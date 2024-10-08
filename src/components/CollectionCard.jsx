import Card from "react-bootstrap/Card";
import { Link } from "react-router-dom";

export default function CollectionCard ({ product }) {
  const { title, price, image, slug } = product;
  return (
    <Card
      className="mx-auto rounded-3 h-100 shadow border-0"
      style={{ width: "18rem" }}
    >
      <Link to={`/products/${slug}`}>
        <Card.Img variant="top" src={image} className="p-2" alt={title} />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title as={Link} to={`/products/${slug}`} className="text-decoration-none h5">
          {title}
        </Card.Title>
        <div className="d-flex flex-column align-items-center justify-content-center mt-auto">
          <Card.Text className="fw-bold fs-2 align-self-start">{price}</Card.Text>

        </div>
      </Card.Body>
    </Card>
  );
}
