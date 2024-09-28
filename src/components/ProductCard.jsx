import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

export default function ProductCard() {
  return (
    <Card className="mx-auto rounded-3" style={{ width: "18rem" }}>
      <Card.Img variant="top" src="https://cdn.shopify.com/s/files/1/0720/3150/2585/files/DolceGusto-Starbucks-LatteMacchiato.jpg" className="p-2" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text className="fw-bold fs-2">
          $18
        </Card.Text>
        <div className="d-flex justify-content-center">
            <Button variant="primary" className="w-100 text-uppercase" style={{maxWidth: "10rem"}}>Add to Cart</Button>
        </div>
      </Card.Body>
    </Card>
  );
}
