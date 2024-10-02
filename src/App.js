import { BrowserRouter, Route, Routes } from "react-router-dom";
import MainNavbar from "./components/MainNavbar";
import CartPage from "./pages/CartPage";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import ProductListPage from "./pages/ProductListPage";
import ProductPage from "./pages/ProductPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import { ProductProvider } from "./contexts/productContext";

function App() {
  return (
    <ProductProvider>
      <BrowserRouter>
        <MainNavbar />
        <Routes>
          <Route path="/cart" element={<CartPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/products/:slug" element={<ProductPage />} />
          <Route path="/products" element={<ProductListPage />} />
          <Route path="/" element={<HomePage />} />
          <Route path="*" element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </ProductProvider>
  );
}

export default App;
