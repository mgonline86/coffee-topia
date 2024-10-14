import { useCallback, useContext, useState } from "react";
import {
  Card,
  Form,
  Image,
  ListGroup,
  InputGroup,
  Button,
} from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductContext from "../contexts/productContext";
import { SearchIcon } from "lucide-react";

export default function SearchBar({
  name = "search",
  autoFocus = false,
  closeModal = null,
}) {
  const { products } = useContext(ProductContext);
  const [searchTerm, setSearchTerm] = useState("");

  const navigate = useNavigate();

  const handleFormSubmit = (event) => {
    event.preventDefault();
    setSearchTerm("");
    navigate(`/products?q=${encodeURIComponent(searchTerm.trim())}`);
    if (closeModal) {
      closeModal();
    }
  };

  const filteredProducts = useCallback(
    (searchTerm) => {
      return products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.trim().toLowerCase())
      );
    },
    [products]
  );

  const handleListItemClick = () => {
    setSearchTerm("");
    if (closeModal) {
      closeModal();
    }
  };

  return (
    <Form
      className="d-flex flex-column position-relative w-100"
      style={{ maxWidth: "30rem" }}
      onSubmit={handleFormSubmit}
    >
      <InputGroup className="me-2">
        <Form.Control
          type="search"
          name={name}
          placeholder="Search"
          aria-label="Search"
          value={searchTerm}
          autoFocus={autoFocus}
          autoComplete="off"
          onChange={(e) => setSearchTerm(e.target.value)}
          onBlur={(e) => setSearchTerm(e.target.value.trim())}
        />
        <Button variant="outline-primary" type="submit">
          <SearchIcon />
        </Button>
      </InputGroup>

      {searchTerm && (
        <Card className="position-absolute top-100 start-0 mt-2 shadow w-100">
          <Card.Header>
            <Card.Title>{`Found ${
              filteredProducts(searchTerm).length
            } results`}</Card.Title>
          </Card.Header>
          <Card.Body>
            <ListGroup style={{ maxHeight: "20rem", overflowY: "auto" }}>
              {filteredProducts(searchTerm).length === 0 ? (
                <p>No results found</p>
              ) : (
                filteredProducts(searchTerm).map(({ slug, image, title }) => (
                  <ListGroup.Item
                    key={slug}
                    as={Link}
                    action
                    to={`/products/${slug}`}
                    onClick={handleListItemClick}
                  >
                    <div className="d-flex gap-3">
                      <div>
                        <Image
                          src={image}
                          thumbnail
                          width={60}
                          height={60}
                          style={{
                            objectFit: "cover",
                            objectPosition: "center",
                            minWidth: 60,
                          }}
                          alt={title}
                          loading="lazy"
                        />
                      </div>
                      <p className="m-0">{title}</p>
                    </div>
                  </ListGroup.Item>
                ))
              )}
            </ListGroup>
          </Card.Body>
        </Card>
      )}
    </Form>
  );
}
