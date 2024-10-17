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
    handleToggleDiscount,
    handleReset,
    selectedBrands,
    selectedTags,
    searchTerm,
    priceRange,
    brands,
    tags,
    maxProductPrice,
    minProductPrice,
    hasDiscount,
  } = useProductListContext();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (closeOffcanvas) {
      closeOffcanvas();
    }
  };

  return (
    <Form className="d-flex flex-column" onSubmit={handleSubmit}>
      <Button
        variant="link"
        onClick={handleReset}
        className="align-self-end p-0"
      >
        Reset
      </Button>
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
          <Form.Check
            type="switch"
            className="mt-3"
            id="discount"
            label="Has Discount"
            checked={hasDiscount}
            onChange={handleToggleDiscount}
          />
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
          styles={{
            control: (styles, { isFocused }) => ({
              ...styles,
              backgroundColor: "white",
              borderColor: "var(--bs-primary)",
              "&:hover": {
                borderColor: "var(--bs-primary)",
              },
              boxShadow: isFocused ? "0 0 0 1px var(--bs-primary)" : "none",
            }),
            option: (styles, { isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                backgroundColor: isDisabled
                  ? undefined
                  : isSelected
                  ? "var(--bs-primary)"
                  : isFocused
                  ? "#eee"
                  : undefined,
                color: isDisabled
                  ? "#ccc"
                  : isSelected
                  ? "white"
                  : "var(--bs-primary)",
                cursor: isDisabled ? "not-allowed" : "default",
              };
            },
          }}
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
          styles={{
            control: (styles, { isFocused }) => ({
              ...styles,
              backgroundColor: "white",
              borderColor: "var(--bs-primary)",
              "&:hover": {
                borderColor: "var(--bs-primary)",
              },
              boxShadow: isFocused ? "0 0 0 1px var(--bs-primary)" : "none",
            }),
            option: (styles, { isDisabled, isFocused, isSelected }) => {
              return {
                ...styles,
                backgroundColor: isDisabled
                  ? undefined
                  : isSelected
                  ? "var(--bs-primary)"
                  : isFocused
                  ? "#eee"
                  : undefined,
                color: isDisabled
                  ? "#ccc"
                  : isSelected
                  ? "white"
                  : "var(--bs-primary)",
                cursor: isDisabled ? "not-allowed" : "default",
              };
            },
          }}
        />
      </Form.Group>
      <hr className="text-muted d-lg-none" />
      <Button variant="primary" type="submit" className="d-lg-none">
        Apply
      </Button>
    </Form>
  );
}
