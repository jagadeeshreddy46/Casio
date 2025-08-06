import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { ShoppingCart, Menu, X, Search, User, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import './Header.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { itemCount } = useCart();
  const location = useLocation();

 const navigation = [
  { name: 'Home', href: '/' },
  { name: 'Products', href: '/products' },
  { name: 'Categories', href: '/categories' }, 
  { name: 'About', href: '/about' },
  { name: 'Contact', href: '/contact' },
];
  const isActive = (path) =>
    location.pathname === path || location.pathname.startsWith(path + '/');

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMenuOpen]);

  return (
    <header className="header">
      <div className="container">
        <div className="header-row">
          <Link to="/" className="logo" aria-label="FurnishCo Home">
            <div className="logo-icon">F</div>
            <span className="logo-text">FurnishCo</span>
          </Link>

          <nav className="nav" aria-label="Primary">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                className={`nav-link ${isActive(item.href) ? 'active' : ''}`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <Link to="/search" className="icon-btn" aria-label="Search">
              <Search className="icon" />
            </Link>

            <Link to="/wishlist" className="icon-btn" aria-label="Wishlist">
              <Heart className="icon" />
            </Link>

            <Link to="/account" className="icon-btn" aria-label="Account">
              <User className="icon" />
            </Link>

            <Link to="/cart" className="cart-icon" aria-label="Cart">
              <ShoppingCart className="icon" />
              {itemCount > 0 && <span className="cart-count">{itemCount}</span>}
            </Link>

            <button
              onClick={() => setIsMenuOpen(true)}
              className="menu-btn"
              type="button"
              aria-expanded={isMenuOpen}
              aria-label="Open menu"
            >
              <Menu className="icon" />
            </button>
          </div>
        </div>
      </div>

      <div className={`drawer ${isMenuOpen ? 'open' : ''}`} aria-hidden={!isMenuOpen}>
        <div className="drawer-overlay" onClick={() => setIsMenuOpen(false)} />
        <div className="drawer-panel" role="dialog" aria-modal="true" aria-label="Mobile navigation">
          <div className="drawer-header">
            <Link to="/" className="logo" onClick={() => setIsMenuOpen(false)}>
              <div className="logo-icon">F</div>
              <span className="logo-text">FurnishCo</span>
            </Link>
            <button
              onClick={() => setIsMenuOpen(false)}
              className="close-btn"
              type="button"
              aria-label="Close menu"
            >
              <X className="icon" />
            </button>
          </div>

          <nav className="drawer-nav">
            {navigation.map((item) => (
              <Link
                key={item.name}
                to={item.href}
                onClick={() => setIsMenuOpen(false)}
                className={`drawer-link ${isActive(item.href) ? 'active' : ''}`}
                aria-current={isActive(item.href) ? 'page' : undefined}
              >
                {item.name}
              </Link>
            ))}

            <Link
              to="/search"
              onClick={() => setIsMenuOpen(false)}
              className={`drawer-link ${isActive('/search') ? 'active' : ''}`}
            >
              Search
            </Link>
            <Link
              to="/wishlist"
              onClick={() => setIsMenuOpen(false)}
              className={`drawer-link ${isActive('/wishlist') ? 'active' : ''}`}
            >
              Wishlist
            </Link>
            <Link
              to="/account"
              onClick={() => setIsMenuOpen(false)}
              className={`drawer-link ${isActive('/account') ? 'active' : ''}`}
            >
              Account
            </Link>
            <Link
              to="/cart"
              onClick={() => setIsMenuOpen(false)}
              className={`drawer-link ${isActive('/cart') ? 'active' : ''}`}
            >
              Cart
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
