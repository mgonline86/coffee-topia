import { Form, InputGroup, Stack } from "react-bootstrap";
import Select from "react-select";
import useProductListContext from "../contexts/productListContext";

export default function ProductsFilter() {
  const {
    handleSearch,
    handlePriceMaxChange,
    handlePriceMinChange,
    handleSelectBrand,
    handleSelectTag,
    searchTerm,
    priceRange,
    brands,
    tags,
    maxProductPrice,
    minProductPrice,
  } = useProductListContext();
  return (
    <Stack>
      <div className="d-flex flex-column">
        <Form.Group>
          <Form.Label className="fs-6 fw-semibold">Search</Form.Label>
          <Form.Control
            type="search"
            placeholder="Search"
            aria-label="Search"
            onChange={handleSearch}
            value={searchTerm}
          />
        </Form.Group>
        <hr className="text-muted" />
        <Form.Group className="d-flex flex-column gap-2">
          <Form.Label className="fs-6 fw-semibold">Price</Form.Label>
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
              />
              <InputGroup.Text>EGP</InputGroup.Text>
            </InputGroup>
          </div>
        </Form.Group>
        <hr className="text-muted" />
        <Form.Group>
          <Form.Label className="fs-6 fw-semibold">Brands</Form.Label>
          <Select
            onChange={handleSelectBrand}
            isMulti
            options={brands.map((brand) => ({
              value: brand,
              label: brand,
            }))}
          />
        </Form.Group>
        <hr className="text-muted" />
        <Form.Group>
          <Form.Label className="fs-6 fw-semibold">Tags</Form.Label>
          <Select
            onChange={handleSelectTag}
            isMulti
            options={tags.map((tag) => ({
              value: tag,
              label: tag,
            }))}
          />
        </Form.Group>
      </div>
    </Stack>
  );
}
