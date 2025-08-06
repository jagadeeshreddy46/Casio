import React from 'react';
import { Link } from 'react-router-dom';
import { Minus, Plus, X, ShoppingBag, ArrowRight } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import './Cart.css';

const Cart = () => {
  const { items, removeItem, updateQuantity, total, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="cart-empty">
        <div className="cart-container">
          <div className="cart-empty-message">
            <ShoppingBag className="cart-empty-icon" />
            <h2>Your cart is empty</h2>
            <p>Looks like you haven't added any items yet. Start shopping to fill it up!</p>
            <Button size="large" asChild to="/products">
              Start Shopping
              <ArrowRight className="icon-spacing" />
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cart">
      <div className="cart-container">
        <div className="cart-header">
          <h1>Shopping Cart</h1>
          <p>{items.length} {items.length === 1 ? 'item' : 'items'} in your cart</p>
        </div>

        <div className="cart-content">
          <div className="cart-items">
            {items.map((item) => (
              <div key={item.product.id} className="cart-item">
                <div className="cart-item-inner">
                  <div className="cart-item-image">
                    <img src={item.product.image} alt={item.product.name} />
                  </div>
                  <div className="cart-item-details">
                    <div className="cart-item-header">
                      <Link to={`/product/${item.product.id}`} className="product-link">
                        {item.product.name}
                      </Link>
                      <button onClick={() => removeItem(item.product.id)} className="remove-button">
                        <X className="remove-icon" />
                      </button>
                    </div>
                    <p className="item-meta">
                      Color: {item.product.color} | Category: {item.product.category}
                    </p>
                    <div className="cart-item-footer">
                      <div className="quantity-control">
                        <span>Qty:</span>
                        <div className="quantity-buttons">
                          <button onClick={() => updateQuantity(item.product.id, item.quantity - 1)}>
                            <Minus />
                          </button>
                          <span>{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.product.id, item.quantity + 1)}>
                            <Plus />
                          </button>
                        </div>
                      </div>
                      <div className="price">
                        <div>${(item.product.price * item.quantity).toLocaleString()}</div>
                        {item.quantity > 1 && (
                          <div className="unit-price">${item.product.price.toLocaleString()} each</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div className="cart-clear">
              <button onClick={clearCart} className="clear-cart">Clear Cart</button>
            </div>
          </div>

          <div className="cart-summary">
            <div className="summary-box">
              <h2>Order Summary</h2>
              <div className="summary-details">
                <div className="summary-line">
                  <span>Subtotal</span>
                  <span>${total.toLocaleString()}</span>
                </div>
                <div className="summary-line">
                  <span>Shipping</span>
                  <span className={total >= 500 ? 'free-shipping' : ''}>
                    {total >= 500 ? 'Free' : '$49'}
                  </span>
                </div>
                <div className="summary-line">
                  <span>Tax</span>
                  <span>${(total * 0.08).toFixed(2)}</span>
                </div>
                <div className="summary-total">
                  <span>Total</span>
                  <span>${(total + (total >= 500 ? 0 : 49) + (total * 0.08)).toFixed(2)}</span>
                </div>
              </div>
              {total < 500 && (
                <div className="free-shipping-hint">
                  <p>Add <span>${(500 - total).toFixed(2)}</span> more to get free shipping!</p>
                </div>
              )}
              <Button size="large" className="checkout-btn" asChild to="/checkout">
                Proceed to Checkout
                <ArrowRight className="icon-spacing" />
              </Button>
              <Button variant="secondary" size="large" className="continue-btn" asChild to="/products">
                Continue Shopping
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
