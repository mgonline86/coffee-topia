import { createContext } from "react";
import products from "../data/products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  // get unique values
  const brands = [...new Set(products.map((product) => product.brand))];
  const tags = [...new Set(products.flatMap((product) => product.tags))];
  const maxProductPrice = Math.max(...products.map((product) => product.price));
  const minProductPrice = Math.min(...products.map((product) => product.price));

  const getRelatedProducts = (product) => {
    return products.filter(
      (p) => p.brand === product.brand && p.id !== product.id
    );
  };

  const getProductBySlug = (slug) => {
    return products.find((product) => product.slug === slug);
  };

  const value = {
    products,
    brands,
    tags,
    maxProductPrice,
    minProductPrice,
    getProductBySlug,
    getRelatedProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
