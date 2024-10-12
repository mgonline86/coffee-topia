import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import { CartProvider } from "./contexts/cartContext";
import { ProductProvider } from "./contexts/productContext";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import CheckoutPage from "./components/CheckoutPage";
import ScrollToTop from "./components/ScrollToTop";
import Footer from "./sections/Footer";
import PageTitle from "./components/PageTitle";

function App() {
  return (
    <CartProvider>
      <ProductProvider>
        <BrowserRouter>
          <ScrollToTop />
          <MainNavbar />
          <Routes>
            <Route
              path="/cart"
              element={
                <>
                <PageTitle title="Cart | Coffee Topia" />
                  <CartPage />
                </>
              }
            />
            <Route
              path="/checkout"
              element={
                <>
                <PageTitle title="Checkout | Coffee Topia" />
                  <CheckoutPage />
                </>
              }
            />
            <Route
              path="/profile"
              element={
                <>
                <PageTitle title="Profile | Coffee Topia" />
                  <ProfilePage />
                </>
              }
            />
            <Route
              path="/register"
              element={
                <>
                <PageTitle title="Register | Coffee Topia" />
                  <RegisterPage />
                </>
              }
            />
            <Route
              path="/login"
              element={
                <>
                <PageTitle title="Login | Coffee Topia" />
                  <LoginPage />
                </>
              }
            />
            <Route
              path="/products/:slug"
              element={
                <>
                <PageTitle title="Product | Coffee Topia" />
                  <ProductPage />
                </>
              }
            />
            <Route
              path="/products"
              element={
                <>
                <PageTitle title="ProductList | Coffee Topia" />
                  <ProductListPage />
                </>
              }
            />
            <Route
              path="/"
              element={
                <>
                <PageTitle title="Coffee Topia" />
                  <HomePage />
                </>
              }
            />
            <Route
              path="*"
              element={
                <>
                <PageTitle title="Coffee Topia" />
                  <HomePage />
                </>
              }
            />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ProductProvider>
    </CartProvider>
  );
}

export default App;
