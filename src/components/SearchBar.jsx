import { useCallback, useContext, useState } from "react";
import { Card, Form, Image, ListGroup } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import ProductContext from "../contexts/productContext";

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
    navigate("/"); // workaround at products page
    setTimeout(() => navigate(`/products?q=${searchTerm}`), 10);
    if (closeModal) {
      closeModal();
    }
  };

  const filteredProducts = useCallback(
    (searchTerm) => {
      return products.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    },
    [products]
  );
  return (
    <Form
      className="d-flex flex-column position-relative"
      style={{ maxWidth: "30rem" }}
      onSubmit={handleFormSubmit}
    >
      <Form.Control
        type="search"
        name={name}
        placeholder="Search"
        className="me-2"
        aria-label="Search"
        value={searchTerm}
        autoFocus={autoFocus}
        autoComplete="off"
        onChange={(e) => setSearchTerm(e.target.value.trim())}
      />
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
                    onClick={() => setSearchTerm("")}
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
