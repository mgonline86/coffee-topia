import { ArrowLeftIcon } from "lucide-react";
import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function EmptyCartSection() {
  return (
    <Container as="section" className="my-5 text-center">
      <div className="d-flex flex-column align-items-center gap-4">
        <h1 className="text-primary">Your cart is empty!</h1>
        <Image
          src="/img/coffee-cart.webp"
          style={{ filter: "drop-shadow(20px 0 10px #00000060)" }}
          fluid
          width={200}
          height={200}
        />
        <Button variant="primary" as={Link} to="/products">
          <ArrowLeftIcon />
          Continue shopping
        </Button>
      </div>
    </Container>
  );
}
