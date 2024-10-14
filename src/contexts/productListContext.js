import { createContext, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductContext from "../contexts/productContext";

const ProductListContext = createContext();

export const ProductListProvider = ({ children }) => {
  const { products, brands, tags, maxProductPrice, minProductPrice } =
    useContext(ProductContext);
  const productsPerPage = 24;

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  let currentPage = parseInt(searchParams.get("page")) || 1;
  const selectedBrands =
    searchParams.get("brands")?.split(",").filter(Boolean) || [];
  const selectedTags =
    searchParams.get("tags")?.split(",").filter(Boolean) || [];
  const searchTerm = searchParams.get("q") || "";
  const minPriceFromQuery =
    parseInt(searchParams.get("minPrice")) || minProductPrice;
  const maxPriceFromQuery =
    parseInt(searchParams.get("maxPrice")) || maxProductPrice;
  const priceRange = [minPriceFromQuery, maxPriceFromQuery];

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    navigate(`?${newSearchParams.toString()}`);
  };
  const handleSearch = (event) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", 1);
    newSearchParams.set("q", event.target.value);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };
  const handlePriceMaxChange = (event) => {
    let newValue = parseInt(event.target.value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (!newValue) {
      newSearchParams.delete("maxPrice");
      navigate(`?${newSearchParams.toString()}`, { replace: true });
      return;
    }
    newSearchParams.set("page", 1);
    newSearchParams.set("maxPrice", newValue);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handlePriceMinChange = (event) => {
    let newValue = parseInt(event.target.value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (!newValue) {
      newSearchParams.delete("minPrice");
      navigate(`?${newSearchParams.toString()}`, { replace: true });
      return;
    }
    newSearchParams.set("page", 1);
    newSearchParams.set("minPrice", newValue);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handleSelectBrand = (entry) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", 1);
    if (!entry) {
      newSearchParams.delete("brands");
    }
    newSearchParams.set("brands", entry.map((entry) => entry.value).join(","));
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  const handleSelectTag = (entry) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", 1);
    if (!entry) {
      newSearchParams.delete("tags");
    }
    newSearchParams.set("tags", entry.map((entry) => entry.value).join(","));
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };
  const handleReset = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.delete("page");
    newSearchParams.delete("q");
    newSearchParams.delete("brands");
    newSearchParams.delete("tags");
    newSearchParams.delete("minPrice");
    newSearchParams.delete("maxPrice");
    navigate(`?${newSearchParams.toString()}`, { replace: true });
  };

  let pagesCount = Math.ceil(products.length / productsPerPage);

  const viewProducts =
    (() => {
      let productSlice = [...products];
      if (currentPage <= 0 || currentPage > pagesCount) {
        currentPage = 1;
      }

      if (searchTerm) {
        productSlice = productSlice.filter((product) =>
          product.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      if (
        minPriceFromQuery !== minProductPrice ||
        maxPriceFromQuery !== maxProductPrice
      ) {
        productSlice = productSlice.filter((product) => {
          if (product.discount > 0) {
            return (
              product.price * (1 - product.discount) >= priceRange[0] &&
              product.price * (1 - product.discount) <= priceRange[1]
            );
          }
          return (
            product.price >= priceRange[0] && product.price <= priceRange[1]
          );
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

      pagesCount = Math.ceil(productSlice.length / productsPerPage);
      return productSlice.slice(
        (currentPage - 1) * productsPerPage,
        currentPage * productsPerPage
      );
    })() || [];

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
        handleReset,
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
