import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductContext from "../contexts/productContext";

const ProductListContext = createContext();

export const ProductListProvider = ({ children }) => {
  const { products, brands, tags, maxProductPrice, minProductPrice } =
    useContext(ProductContext);
  const productsPerPage = 24;

  const [searchParams, setSearchParams] = useSearchParams();
  const pageFromQuery = parseInt(searchParams.get("page")) || 1;
  const brandsFromQuery = searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const tagsFromQuery = searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const searchTermFromQuery = searchParams.get("q") || "";
  const minPriceFromQuery = parseInt(searchParams.get("minPrice"));
  const maxPriceFromQuery = parseInt(searchParams.get("maxPrice"));
  const [currentPage, setCurrentPage] = useState(pageFromQuery);
  const [searchTerm, setSearchTerm] = useState(searchTermFromQuery);
  const [priceRange, setPriceRange] = useState([
    minPriceFromQuery || minProductPrice,
    maxPriceFromQuery || maxProductPrice,
  ]);
  const [selectedBrands, setSelectedBrands] = useState(brandsFromQuery);
  const [selectedTags, setSelectedTags] = useState(tagsFromQuery);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  const handlePriceMaxChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      setPriceRange([priceRange[0], maxProductPrice]);
      return;
    }
    setPriceRange([priceRange[0], newValue]);
    setCurrentPage(1);
  };

  const handlePriceMinChange = (event) => {
    const newValue = parseInt(event.target.value);
    if (isNaN(newValue)) {
      setPriceRange([minProductPrice, priceRange[1]]);
      return;
    }
    setPriceRange([newValue, priceRange[1]]);
    setCurrentPage(1);
  };

  const handleSelectBrand = (entry) => {
    if (!entry) {
      setSelectedBrands([]);
      return;
    }
    setSelectedBrands(entry.map((entry) => entry.value));
    setCurrentPage(1);
  };

  const handleSelectTag = (entry) => {
    if (!entry) {
      setSelectedTags([]);
      return;
    }
    setSelectedTags(entry.map((entry) => entry.value));
    setCurrentPage(1);
  };

  const handlePageChange = (page) => {
    page = parseInt(page);
    setCurrentPage(page);
  };

  useEffect(() => {
    const params = new URLSearchParams();
    if (searchTerm) {
      params.set("q", searchTerm);
    }
    if (priceRange[0] !== minProductPrice) {
      params.set("minPrice", priceRange[0]);
    }
    if (priceRange[1] !== maxProductPrice) {
      params.set("maxPrice", priceRange[1]);
    }
    if (selectedBrands.length > 0) {
      params.set("brands", selectedBrands.join(","));
    }
    if (selectedTags.length > 0) {
      params.set("tags", selectedTags.join(","));
    }
    params.set("page", currentPage);

    setSearchParams(params);
  }, [
    currentPage,
    selectedBrands,
    selectedTags,
    searchTerm,
    priceRange,
    minProductPrice,
    maxProductPrice,
    setSearchParams,
  ]);

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
        if (product.discount > 0) {
          return (
            product.price * (1 - product.discount) >= priceRange[0] &&
            product.price * (1 - product.discount) <= priceRange[1]
          );
        }
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
    <ProductListContext.Provider
      value={{
        viewProducts,
        pagesCount,
        currentPage,
        handlePageChange,
        handleSearch,
        handlePriceMaxChange,
        handlePriceMinChange,
        handleSelectBrand,
        handleSelectTag,
        searchTerm,
        priceRange,
        selectedBrands,
        selectedTags,
        brands,
        tags,
      }}
    >
      {children}
    </ProductListContext.Provider>
  );
};

export default function useProductListContext() {
  const context = useContext(ProductListContext);

  if (!context) {
    throw new Error(
      "useProductListContext must be used within a ProductListProvider"
    );
  }

  return context;
}
