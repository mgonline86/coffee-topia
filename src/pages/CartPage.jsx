import useCartContext from "../contexts/cartContext";
import CartTableSection from "../sections/CartTableSection";
import EmptyCartSection from "../sections/EmptyCartSection";

export default function CartPage() {
  const { itemsCount } = useCartContext();

  if (itemsCount < 1) {
    return <EmptyCartSection />;
  }

  return <CartTableSection />;
}
