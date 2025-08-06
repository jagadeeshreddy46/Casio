import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { WishlistProvider } from './context/WishlistContext'; // ✅ Import WishlistProvider
import Layout from './components/Layout/Layout';
import Home from './pages/Home';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import About from './pages/About';
import Contact from './pages/Contact';
import Search from './pages/Search';
import Wishlist from './pages/Wishlist';
import Account from './pages/Account';
import Categories from './pages/Categories';

function App() {
  return (
    <CartProvider>
      <WishlistProvider> {/* ✅ Wrap WishlistProvider around Router */}
        <Router>
          <Layout>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/search" element={<Search />} />
              <Route path="/about" element={<About />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/wishlist" element={<Wishlist />} />
              <Route path="/account" element={<Account />} />
              <Route path="/categories" element={<Categories />} />
            </Routes>
          </Layout>
        </Router>
      </WishlistProvider>
    </CartProvider>
  );
}

export default App;
