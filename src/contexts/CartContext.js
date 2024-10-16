import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import useToastContext from "./ToastContext";

const CartContext = createContext();

// Get cart from localStorage
const initialCart = localStorage.getItem("cart")
  ? JSON.parse(localStorage.getItem("cart"))
  : {};

export const CartProvider = ({ children }) => {
  const maxQty = 99;
  const { toast } = useToastContext();
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

  const currentQty = useCallback(
    (productId) => {
      return cart[String(productId)]?.qty || 0;
    },
    [cart]
  );

  const removeFromCart = (id) => {
    const strId = String(id);
    if (cart[strId]) {
      setCart((prev) => {
        const { [strId]: _, ...rest } = prev;
        return rest;
      });
    }
  };

  const updateCartQty = (product, qty=1) => {
    // if qty is less than 1 exit
    const strId = String(product.id);
    if (qty < 1) {
      return;
    }

    // if max qty reached
    const oldQty = currentQty(strId);
    if (qty + oldQty > maxQty) {
      qty = maxQty;
      toast.info(`Max quantity is ${maxQty} per product`);
    }

    if (cart[strId]) {
      setCart((prev) => ({
        ...prev,
        [strId]: { ...prev[strId], qty },
      }));
    } else {
      setCart((prev) => ({
        ...prev,
        [strId]: { product, qty, timestamp: Date.now() },
      }));
    }
  };

  const [subTotal, totalDiscount, shipping, total] = useMemo(() => {
    let subTotal = 0;
    let discount = 0;
    let total = 0;
    let shipping = 0;
    if (cartLineItems.length > 0) {
      shipping = 10;
      cartLineItems.forEach((item) => {
        subTotal += item.product.price * item.qty;
        discount += item.product.discount * item.product.price * item.qty;
      });
    }
    total = subTotal - discount + shipping;
    return [subTotal, discount, shipping, total];
  }, [cartLineItems]);

  const value = {
    cart,
    setCart,
    cartLineItems,
    updateCartQty,
    removeFromCart,
    showCart,
    handleCloseCart,
    handleShowCart,
    itemsCount,
    subTotal,
    totalDiscount,
    shipping,
    total,
    maxQty,
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
