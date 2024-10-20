import { ArrowLeftIcon } from "lucide-react";
import { Button, Container, Image } from "react-bootstrap";
import { Link } from "react-router-dom";
import CoolTitle from "../components/CoolTitle";

export default function EmptyCartSection({ closeFunction = null }) {
  return (
    <Container as="section" className="my-5 text-center">
      <div className="d-flex flex-column align-items-center gap-4">
        <CoolTitle title="Your cart is empty!" />
        <Image
          src="/img/coffee-cart.webp"
          style={{ filter: "drop-shadow(20px 0 10px #00000060)" }}
          fluid
          width={200}
          height={200}
        />
        <Button
          variant="primary"
          as={Link}
          to="/products"
          onClick={closeFunction ? () => closeFunction() : undefined}
        >
          <ArrowLeftIcon className="me-2 point-left" />
          Continue shopping
        </Button>
      </div>
    </Container>
  );
}
