import { createContext, useContext } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import ProductContext from "./ProductContext";

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
  const hasDiscount = searchParams.get("discount") === "true";
  const sortByQuery = searchParams.get("sortBy");
  const sortBy = ["price-asc", "price-desc", "a-z", "z-a"].includes(sortByQuery)
    ? sortByQuery
    : "a-z";

  const handlePageChange = (page) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", page);
    navigate(`?${newSearchParams.toString()}`);
    window.scrollTo(0, 0);
  };
  const handleSearch = (event) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", 1);
    newSearchParams.set("q", event.target.value);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    window.scrollTo(0, 0);
  };
  const handlePriceMaxChange = (event) => {
    let newValue = parseInt(event.target.value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (!newValue) {
      newSearchParams.delete("maxPrice");
      navigate(`?${newSearchParams.toString()}`, { replace: true });
      window.scrollTo(0, 0);
      return;
    }
    newSearchParams.set("page", 1);
    newSearchParams.set("maxPrice", newValue);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    window.scrollTo(0, 0);
  };

  const handlePriceMinChange = (event) => {
    let newValue = parseInt(event.target.value);
    const newSearchParams = new URLSearchParams(searchParams);
    if (!newValue) {
      newSearchParams.delete("minPrice");
      navigate(`?${newSearchParams.toString()}`, { replace: true });
      window.scrollTo(0, 0);
      return;
    }
    newSearchParams.set("page", 1);
    newSearchParams.set("minPrice", newValue);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    window.scrollTo(0, 0);
  };

  const handleSelectBrand = (entry) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", 1);
    if (!entry) {
      newSearchParams.delete("brands");
    }
    newSearchParams.set("brands", entry.map((entry) => entry.value).join(","));
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    window.scrollTo(0, 0);
  };

  const handleSelectTag = (entry) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", 1);
    if (!entry) {
      newSearchParams.delete("tags");
    }
    newSearchParams.set("tags", entry.map((entry) => entry.value).join(","));
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    window.scrollTo(0, 0);
  };

  const handleToggleDiscount = () => {
    const newSearchParams = new URLSearchParams(searchParams);
    if (hasDiscount) {
      newSearchParams.delete("discount");
    } else {
      newSearchParams.set("discount", "true");
    }
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    window.scrollTo(0, 0);
  };

  const handleSortBy = (entry) => {
    const newSearchParams = new URLSearchParams(searchParams);
    newSearchParams.set("page", 1);
    newSearchParams.set("sortBy", entry.value);
    navigate(`?${newSearchParams.toString()}`, { replace: true });
    window.scrollTo(0, 0);
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
    window.scrollTo(0, 0);
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

      if (hasDiscount) {
        productSlice = productSlice.filter((product) => product.discount > 0);
      }

      switch (sortBy) {
        case "price-asc":
          productSlice = productSlice.sort((a, b) => a.price - b.price);
          break;
        case "price-desc":
          productSlice = productSlice.sort((a, b) => b.price - a.price);
          break;
        case "z-a":
          productSlice = productSlice.sort((a, b) =>
            b.title.localeCompare(a.title)
          );
          break;
        default:
          productSlice = productSlice.sort((a, b) =>
            a.title.localeCompare(b.title)
          );
          break;
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
        handleToggleDiscount,
        handleSortBy,
        handleReset,
        searchTerm,
        priceRange,
        selectedBrands,
        selectedTags,
        brands,
        tags,
        maxProductPrice,
        minProductPrice,
        hasDiscount,
        sortBy,
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
