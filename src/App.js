import { BrowserRouter, Route, Routes } from "react-router-dom";
import CheckoutPage from "./components/CheckoutPage";
import MainNavbar from "./components/MainNavbar";
import PageTitle from "./components/PageTitle";
import ScrollToTop from "./components/ScrollToTop";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";
import { ProductProvider } from "./contexts/ProductContext";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import Footer from "./sections/Footer";
import { ToastProvider } from "./contexts/ToastContext";

function App() {
  return (
    <ToastProvider>
      <AuthProvider>
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
                      <PageTitle title="Products | Coffee Topia" />
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
      </AuthProvider>
    </ToastProvider>
  );
}

export default App;
