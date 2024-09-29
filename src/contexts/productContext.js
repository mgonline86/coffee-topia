import { createContext, useState } from "react";
import productsData from "../data/products";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState(productsData);

  const getProducts = (from = 0, to = 20) => {
    return products.slice(from, to);
  };

  const getProductBySlug = (slug) => {
    return products.find((product) => product.slug === slug);
  };

  const value = {
    setProducts,
    products,
    getProducts,
    getProductBySlug,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export default ProductContext;
