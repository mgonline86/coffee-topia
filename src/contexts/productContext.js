import { createContext } from "react";
import products from "../data/products";

const ProductContext = createContext();

const comapre = (obj, key, operation, value) => {
  try {
    if (!obj[key]) return false;
    switch (operation) {
      case ">":
        return obj[key] > value;
      case ">=":
        return obj[key] >= value;
      case "<":
        return obj[key] < value;
      case "<=":
        return obj[key] <= value;
      case "=":
        return obj[key] === value;
      case "in":
        return obj[key].includes(value);
      case "like":
        if (typeof obj[key] === "string") {
          return obj[key].toLowerCase().includes(String(value).toLowerCase());
        }
        return false;
      default:
        return false;
    }
  } catch (error) {
    return false;
  }
};

export const ProductProvider = ({ children }) => {
  const brands = [...new Set(products.map((product) => product.brand))];

  const getProducts = (from = 0, to = 20, filters = []) => {
    if (filters.length > 0) {
      return products
        .filter((product) => {
          return filters.every((filter) =>
            comapre(product, filter.key, filter.operation, filter.value)
          );
        })
        .slice(from, to);
    }
    return products.slice(from, to);
  };

  const getProductBySlug = (slug) => {
    return products.find((product) => product.slug === slug);
  };

  const value = {
    products,
    brands,
    getProducts,
    getProductBySlug,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
