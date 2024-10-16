import { CheckCircleIcon } from "lucide-react";
import { useEffect } from "react";
import useCartContext from "../contexts/CartContext";

export default function ThankYouSection({ children }) {
  const { setCart, cart } = useCartContext();
  useEffect(() => {
    window.scrollTo(0, 0);
    setCart(cart);
    return () => {
      setCart({});
    };
  });
  return (
    <>
      <div className="d-flex gap-2">
        <CheckCircleIcon size={40} color="green" />
        <h2>Thank you for your order</h2>
      </div>
      <p>
        Your order has been received and will be processed shortly. We will
        contact you with the details of your order.
      </p>
      {children}
    </>
  );
}
