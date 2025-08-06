import React from 'react';
import { useWishlist } from '../context/WishlistContext';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import './Wishlist.css';

const Wishlist = () => {
  const { wishlistItems, removeFromWishlist } = useWishlist();
  const { addItem } = useCart();

  const handleMoveToCart = (item) => {
    addItem(item);
    removeFromWishlist(item.id);
  };

  if (wishlistItems.length === 0) {
    return (
      <div className="wishlist-empty">
        <h2>Your wishlist is empty 😔</h2>
        <p>Start exploring and add items to your wishlist!</p>
        <Link to="/products" className="wishlist-link">Browse Products</Link>
      </div>
    );
  }

  return (
    <div className="wishlist-page">
      <h1>Your Wishlist</h1>
      <div className="wishlist-grid">
        {wishlistItems.map((item) => (
          <div key={item.id} className="wishlist-item">
            <img src={item.image} alt={item.name} />
            <Link to={`/product/${item.id}`}>{item.name}</Link>
            <div className="wishlist-buttons">
              <button onClick={() => handleMoveToCart(item)}>Move to Cart</button>
              <button className="remove-btn" onClick={() => removeFromWishlist(item.id)}>Remove</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Wishlist;
