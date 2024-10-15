import { Form, InputGroup } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Select from "react-select";
import useProductListContext from "../contexts/ProductListContext";

export default function ProductsFilter({ closeOffcanvas = null }) {
  const {
    handleSearch,
    handlePriceMaxChange,
    handlePriceMinChange,
    handleSelectBrand,
    handleSelectTag,
    handleReset,
    selectedBrands,
    selectedTags,
    searchTerm,
    priceRange,
    brands,
    tags,
    maxProductPrice,
    minProductPrice,
  } = useProductListContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (closeOffcanvas) {
      closeOffcanvas();
    }
  };

  return (
    <Form className="d-flex flex-column" onSubmit={handleSubmit}>
      <Button variant="link" onClick={handleReset} className="align-self-end p-0">Reset</Button>
      <Form.Group controlId="productQuery">
        <Form.Label className="fs-6 fw-semibold">Search</Form.Label>
        <Form.Control
          type="search"
          placeholder="Search"
          aria-label="Search"
          onChange={handleSearch}
          value={searchTerm}
          name="productQuery"
        />
      </Form.Group>
      <hr className="text-muted" />
      <Form.Group className="d-flex flex-column gap-2">
        <p className="fs-6 mb-2 fw-semibold">Price</p>
        <div>
          <InputGroup size="sm" className="mb-3">
            <InputGroup.Text>Min</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Min"
              aria-label="Min"
              min={minProductPrice}
              max={maxProductPrice}
              onChange={handlePriceMinChange}
              value={priceRange[0]}
              name="minPrice"
            />
            <InputGroup.Text>EGP</InputGroup.Text>
          </InputGroup>
          <InputGroup size="sm">
            <InputGroup.Text>Max</InputGroup.Text>
            <Form.Control
              type="number"
              placeholder="Max"
              aria-label="Max"
              min={minProductPrice}
              max={maxProductPrice}
              onChange={handlePriceMaxChange}
              value={priceRange[1]}
              name="maxPrice"
            />
            <InputGroup.Text>EGP</InputGroup.Text>
          </InputGroup>
        </div>
      </Form.Group>
      <hr className="text-muted" />
      <Form.Group controlId="brands">
        <Form.Label className="fs-6 fw-semibold">Brands</Form.Label>
        <Select
          onChange={handleSelectBrand}
          isMulti
          options={brands.map((brand) => ({
            value: brand,
            label: brand,
          }))}
          value={selectedBrands.map((brand) => ({
            value: brand,
            label: brand,
          }))}
          inputId="brands"
        />
      </Form.Group>
      <hr className="text-muted" />
      <Form.Group controlId="tags">
        <Form.Label className="fs-6 fw-semibold">Tags</Form.Label>
        <Select
          onChange={handleSelectTag}
          isMulti
          value={selectedTags.map((tag) => ({
            value: tag,
            label: tag,
          }))}
          options={tags.map((tag) => ({
            value: tag,
            label: tag,
          }))}
          inputId="tags"
        />
      </Form.Group>
      <hr className="text-muted d-lg-none" />
      <Button variant="primary" type="submit" className="d-lg-none">
        Apply
      </Button>
    </Form>
  );
}
