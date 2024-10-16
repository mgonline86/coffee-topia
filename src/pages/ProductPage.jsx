import { useContext, useState } from "react";
import { Col, Container, Image, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import { useParams } from "react-router-dom";
import useCartContext from "../contexts/CartContext";
import ProductContext from "../contexts/ProductContext";
import PageTitle from "../components/PageTitle";

export default function ProductPage() {
  const { slug } = useParams();
  const { getProductBySlug } = useContext(ProductContext);
  const product = getProductBySlug(slug);

  const { updateCartQty, handleShowCart, maxQty } = useCartContext();

  // create state for qty
  const [qty, setQty] = useState(1);

  // handle input change
  const handleQuantityChange = (event) => {
    let newQty = parseInt(event.target.value);
    if (newQty < 1) {
      newQty = 1;
    }
    if (newQty > maxQty) {
      newQty = maxQty;
    }
    setQty(newQty);
  };

  // handle decrement qty by btn
  const decrementQty = () => {
    if (qty > 1) {
      setQty(qty - 1);
    }
  };

  // handle increment qty by btn
  const incrementQty = () => {
    setQty(qty + 1);
  };

  // handle add to cart
  const handleAddToCart = (e) => {
    e.preventDefault();
    updateCartQty(product, qty);
    handleShowCart();
  };

  if (!product) {
    return <div>Product not found</div>;
  }
  return (
    <Container className="my-5">
      <PageTitle title={`${product.title} | Coffee Topia`} />
      <Row>
        <Col
          xs={12}
          md={6}
          className="position-relative text-center text-md-start"
        >
          <Image
            src={product.image}
            width={500}
            height={500}
            fluid
            alt={product.title}
            loading="eager"
            className="position-sticky"
            style={{ top: "7.5rem" }}
          />
        </Col>
        <Col xs={12} md={6} className="d-flex flex-column gap-4">
          <h1 className="text-primary fw-bolder">{product.title}</h1>
          <h3 className="fw-bold">EGP {product.price} </h3>
          <Row as={Form} onSubmit={handleAddToCart}>
            <Col xs={12} md={4} className="mb-3 mb-md-0">
              <InputGroup className="h-100">
                <Button
                  variant="outline-secondary"
                  id="button-addon1"
                  onClick={decrementQty}
                  disabled={qty <= 1}
                >
                  -
                </Button>
                <Form.Control
                  name="qty"
                  type="number"
                  className="fs-5 text-center"
                  value={qty}
                  onChange={handleQuantityChange}
                  step={1}
                  min={1}
                  max={maxQty}
                />
                <Button
                  variant="outline-secondary"
                  id="button-addon1"
                  onClick={incrementQty}
                  disabled={qty >= maxQty}
                >
                  +
                </Button>
              </InputGroup>
            </Col>

            <Col xs={12} md={8}>
              <Button
                variant="primary"
                size="lg"
                className="w-100"
                type="submit"
              >
                Add to cart
              </Button>
            </Col>
          </Row>

          <hr />
          <h3 className="fw-bold">Description</h3>
          <p dangerouslySetInnerHTML={{ __html: product.description }} />
        </Col>
      </Row>
    </Container>
  );
}
