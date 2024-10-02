import { useContext, useEffect, useMemo, useState } from "react";
import {
  Card,
  Col,
  Container,
  Form,
  InputGroup,
  Pagination,
  Row,
} from "react-bootstrap";
import ProductCard from "../components/ProductCard";
import ProductContext from "../contexts/productContext";
import { useSearchParams } from "react-router-dom";
import Select from "react-select";

export default function ProductListPageX() {
  const { products } = useContext(ProductContext);
  const productsPerPage = 24;

  // get unique values
  const brands = useMemo(() => {
    return [...new Set(products.map((product) => product.brand))];
  }, [products]);
  const tags = useMemo(() => {
    return [...new Set(products.flatMap((product) => product.tags))];
  }, [products]);
  const maxProductPrice = useMemo(() => {
    return Math.max(...products.map((product) => product.price));
  }, [products]);
  const minProductPrice = useMemo(() => {
    return Math.min(...products.map((product) => product.price));
  }, [products]);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([
    minProductPrice,
    maxProductPrice,
  ]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handlePriceMaxChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      setPriceRange([priceRange[0], maxProductPrice]);
      return;
    }
    setPriceRange([priceRange[0], newValue]);
  };

  const handlePriceMinChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      setPriceRange([minProductPrice, priceRange[1]]);
      return;
    }
    setPriceRange([newValue, priceRange[1]]);
  };

  const handleSelectBrand = (entry) => {
    if (!entry) {
      setSelectedBrands([]);
      return;
    }
    setSelectedBrands(entry.map((entry) => entry.value));
  };

  const handleSelectTag = (entry) => {
    if (!entry) {
      setSelectedTags([]);
      return;
    }
    setSelectedTags(entry.map((entry) => entry.value));
  };

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromQuery = parseInt(searchParams.get("page")) || 1;
  const [currentPage, setCurrentPage] = useState(pageFromQuery);

  const handlePageChange = (page) => {
    page = parseInt(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    setSearchParams({ page: currentPage }, { shallow: true });
  }, [currentPage, setSearchParams]);

  const [pagesCount, setPagesCount] = useState(
    Math.ceil(products.length / productsPerPage)
  );

  const viewProducts = useMemo(() => {
    let productSlice = [...products];
    if (currentPage <= 0 || currentPage > pagesCount) {
      setCurrentPage(1);
    }

    if (searchTerm) {
      productSlice = productSlice.filter((product) =>
        product.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (
      priceRange[0] !== minProductPrice ||
      priceRange[1] !== maxProductPrice
    ) {
      productSlice = productSlice.filter((product) => {
        return product.price >= priceRange[0] && product.price <= priceRange[1];
      });
    }

    if (selectedBrands.length > 0) {
      productSlice = productSlice.filter((product) => {
        return selectedBrands.some((brand) => product.brand === brand);
      });
    }
    if (selectedTags.length > 0) {
      productSlice = productSlice.filter((product) => {
        return selectedTags.some((tag) => product.tags.includes(tag));
      });
    }

    setPagesCount(Math.ceil(productSlice.length / productsPerPage));
    return productSlice.slice(
      (currentPage - 1) * productsPerPage,
      currentPage * productsPerPage
    );
  }, [
    currentPage,
    products,
    pagesCount,
    selectedBrands,
    selectedTags,
    searchTerm,
    priceRange,
    maxProductPrice,
    minProductPrice,
  ]);

  return (
    <Container className="my-5">
      <Row>
        <Col xl={3} className="d-none d-xl-block">
          <Card
            className="border-0 shadow position-sticky"
            style={{ top: 100 }}
          >
            <Card.Body className="d-flex flex-column gap-4">
              <div>
                <Card.Title>Search</Card.Title>
                <Form.Control
                  type="search"
                  placeholder="Search"
                  aria-label="Search"
                  onChange={handleSearch}
                  value={searchTerm}
                />
              </div>
              <div>
                <Card.Title>Price</Card.Title>
                <div>
                  <InputGroup className="mb-3">
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
                  <InputGroup>
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
              </div>
              <div>
                <Card.Title>Brands</Card.Title>
                <Select
                  onChange={handleSelectBrand}
                  isMulti
                  options={brands.map((brand) => ({
                    value: brand,
                    label: brand,
                  }))}
                />
              </div>
              <div>
                <Card.Title>Tags</Card.Title>
                <Select
                  onChange={handleSelectTag}
                  isMulti
                  options={tags.map((tag) => ({
                    value: tag,
                    label: tag,
                  }))}
                />
              </div>
            </Card.Body>
          </Card>
        </Col>
        <Col>
          <Row className="g-4">
            {viewProducts.length === 0 && (
              <Col className="text-center my-5">
                <img
                  src="img/not-found.webp"
                  alt="not found"
                  className="img-fluid"
                  width={130}
                  height={110}
                />
                <h2 className="mt-3">No products found!</h2>
              </Col>
            )}
            {viewProducts.map((product) => (
              <Col key={product.id} xs={12} md={6} lg={4}>
                <ProductCard product={product} />
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      {viewProducts.length > 0 && (
        <Row className="mt-4 position-sticky bottom-0">
          <Col className="d-flex justify-content-center">
            <Pagination className="shadow rounded border-primary border">
              <Pagination.First
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(1)}
              />
              <Pagination.Prev
                disabled={currentPage <= 1}
                onClick={() => handlePageChange(currentPage - 1)}
              />
              <Pagination.Next
                disabled={currentPage >= pagesCount}
                onClick={() => handlePageChange(currentPage + 1)}
              />
              <Pagination.Last
                disabled={currentPage >= pagesCount}
                onClick={() => handlePageChange(pagesCount)}
              />
            </Pagination>
          </Col>
        </Row>
      )}
    </Container>
  );
}
