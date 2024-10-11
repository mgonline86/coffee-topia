import { createContext, useContext, useEffect, useMemo, useState } from "react";

const CartContext = createContext();

// Get cart from localStorage
const initialCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState(initialCart);
  const [showCart, setShowCart] = useState(false);
  const handleCloseCart = () => setShowCart(false);
  const handleShowCart = () => setShowCart(true);

  // Save cart to localStorage
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const cartLineItems = useMemo(() => Object.values(cart), [cart]);

  const itemsCount = useMemo(
    () => cartLineItems.reduce((acc, { qty }) => acc + qty, 0),
    [cartLineItems]
  );

  const addToCart = (product, newQty = 1) => {
    const strId = String(product.id);
    if (cart[strId]) {
      setCart((prev) => ({
        ...prev,
        [strId]: { ...prev[strId], qty: prev[strId].qty + newQty },
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        [strId]: { product, qty: newQty, timestamp: Date.now() },
      }));
    }
  };

  const removeFromCart = (id) => {
    const strId = String(id);
    if (cart[strId]) {
      setCart((prev) => {
        const { [strId]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const updateCartQty = (productId, qty) => {
    const strId = String(productId);
    if (qty < 1) {
      return;
    }

    if (cart[strId]) {
      setCart((prev) => ({
        ...prev,
        [strId]: { ...prev[strId], qty },
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        [strId]: { ...prev[strId], qty },
      }));
    }
  };

  const [subTotal, totalDiscount, shipping, total] = useMemo(() => {
    let subTotal = 0;
    let discount = 0;
    let total = 0;
    let shipping = 10;
    cartLineItems.forEach((item) => {
      subTotal += item.product.price * item.qty;
      discount += item.product.discount * item.product.price * item.qty;
    });
    total = subTotal - discount + shipping;
    return [subTotal, discount, shipping, total];
  }, [cartLineItems]);

  const value = {
    cart,
    cartLineItems,
    addToCart,
    removeFromCart,
    updateCartQty,
    showCart,
    handleCloseCart,
    handleShowCart,
    itemsCount,
    subTotal,
    totalDiscount,
    shipping,
    total,
  };
  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default function useCartContext() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCartContext must be used within a CartProvider");
  }

  return context;
}
