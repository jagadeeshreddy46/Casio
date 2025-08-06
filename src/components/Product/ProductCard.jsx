
import React from 'react';
import { Link } from 'react-router-dom';
import { ShoppingCart, Heart, Star } from 'lucide-react';
import { useCart } from '../../context/CartContext';
import { useWishlist } from '../../context/WishlistContext'; 
import Button from '../UI/Button';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();

  const handleAddToCart = (e) => {
    e.preventDefault();
    addItem(product);
  };

  const toggleWishlist = (e) => {
    e.preventDefault(); 
    if (isInWishlist(product.id)) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  const inWishlist = isInWishlist(product.id);

  return (
    <div className="product-card">
      <Link to={`/product/${product.id}`} className="image-wrapper">
        <div className="image-container">
          <img
            src={product.image}
            alt={product.name}
            className="product-image"
          />

          <div className="badges">
            {product.originalPrice && <span className="badge sale">Sale</span>}
            {product.bestseller && <span className="badge bestseller">Bestseller</span>}
            {product.featured && <span className="badge featured">Featured</span>}
          </div>

          <button
            onClick={toggleWishlist}
            className={`wishlist-button ${inWishlist ? 'in-wishlist' : ''}`}
            aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
          >
            <Heart className="icon" />
          </button>

          <div className="quick-add">
            <Button onClick={handleAddToCart} className="quick-add-btn" size="small">
              <ShoppingCart className="icon" />
              Quick Add
            </Button>
          </div>
        </div>
      </Link>

      <div className="details">
        <Link to={`/product/${product.id}`}>
          <h3 className="product-title">{product.name}</h3>
        </Link>

        <div className="rating">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`star ${i < 4 ? 'filled' : ''}`}
            />
          ))}
          <span className="review-count">(24)</span>
        </div>

        <div className="price-stock">
          <div className="price">
            <span className="current-price">${product.price.toLocaleString()}</span>
            {product.originalPrice && (
              <span className="original-price">${product.originalPrice.toLocaleString()}</span>
            )}
          </div>
          {!product.inStock && <span className="out-of-stock">Out of Stock</span>}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
