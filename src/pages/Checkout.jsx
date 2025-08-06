import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import './Checkout.css';

const detectCardBrand = (raw) => {
  const n = raw.replace(/\D/g, '');
  if (/^4\d{0,15}$/.test(n)) return 'visa';
  if (/^5[1-5]\d{0,14}$/.test(n) || /^2(2[2-9]|[3-6]\d|7[01]|720)\d{0,12}$/.test(n)) return 'mastercard';
  if (/^3[47]\d{0,13}$/.test(n)) return 'amex';
  if (/^6(?:011|5)\d{0,12}$/.test(n)) return 'discover';
  if (/^(35)\d{0,14}$/.test(n)) return 'jcb';
  if (/^3(?:0[0-5]|[68])\d{0,11}$/.test(n)) return 'diners';
  return 'unknown';
};

const maskCard = (value) => {
  const v = value.replace(/\D/g, '').slice(0, 19);
  if (/^3[47]/.test(v)) {
    return v.replace(/(\d{1,4})(\d{1,6})?(\d{1,5})?/, (_, a, b, c) => [a, b, c].filter(Boolean).join(' '));
  }
  return v.replace(/(\d{1,4})/g, '$1 ').trim();
};

const Checkout = () => {
  const { items, total, clearCart } = useCart();
  const [loading, setLoading] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    nameOnCard: ''
  });

  const [errors, setErrors] = useState({});

  const subtotal = total;
  const shipping = total >= 500 ? 0 : 49;
  const tax = total * 0.08;
  const finalTotal = subtotal + shipping + tax;

  const cardBrand = useMemo(() => detectCardBrand(formData.cardNumber), [formData.cardNumber]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === 'cardNumber') {
      setFormData(prev => ({ ...prev, cardNumber: maskCard(value) }));
      if (errors.cardNumber) setErrors(prev => ({ ...prev, cardNumber: '' }));
      return;
    }
    if (name === 'expiryDate') {
      const raw = value.replace(/\D/g, '').slice(0, 4);
      const mm = raw.slice(0, 2);
      const yy = raw.slice(2, 4);
      const masked = yy ? `${mm}/${yy}` : mm;
      setFormData(prev => ({ ...prev, expiryDate: masked }));
      if (errors.expiryDate) setErrors(prev => ({ ...prev, expiryDate: '' }));
      return;
    }
    if (name === 'cvv') {
      const max = cardBrand === 'amex' ? 4 : 3;
      const v = value.replace(/\D/g, '').slice(0, max);
      setFormData(prev => ({ ...prev, cvv: v }));
      if (errors.cvv) setErrors(prev => ({ ...prev, cvv: '' }));
      return;
    }
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['firstName','lastName','email','phone','address','city','state','zipCode'];
    requiredFields.forEach(field => {
      if (!formData[field].trim()) newErrors[field] = 'This field is required';
    });
    if (formData.email && !/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Please enter a valid email address';
    if (formData.phone && !/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) newErrors.phone = 'Please enter a valid 10-digit phone number';
    const digits = formData.cardNumber.replace(/\D/g, '');
    if (digits && digits.length < 13) newErrors.cardNumber = 'Card number looks too short';
    if (formData.expiryDate && !/^(0[1-9]|1[0-2])\/\d{2}$/.test(formData.expiryDate)) newErrors.expiryDate = 'Use MM/YY';
    if (formData.cvv && formData.cvv.length < (cardBrand === 'amex' ? 4 : 3)) newErrors.cvv = 'CVV is incomplete';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    setLoading(true);
    await new Promise(r => setTimeout(r, 2000));
    setLoading(false);
    setOrderComplete(true);
    clearCart();
  };

  if (items.length === 0 && !orderComplete) {
    return (
      <div className="empty-cart-message">
        <h2>Your cart is empty</h2>
        <p>Add some items to your cart before checking out.</p>
        <Button asChild>
          <Link to="/products">Continue Shopping</Link>
        </Button>
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="order-confirmation">
        <div className="icon-wrapper">
          <Check className="icon" />
        </div>
        <h1>Order Confirmed!</h1>
        <p>
          Thank you for your order. We've sent a confirmation email to {formData.email}. Your furniture will be delivered within 5-7 business days.
        </p>
        <div className="button-group">
          <Button asChild>
            <Link to="/products">Continue Shopping</Link>
          </Button>
          <Button variant="secondary" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <Link to="/cart" className="back-link">
          <ArrowLeft className="icon" />
          Back to Cart
        </Link>

        <div className="checkout-header">
          <h1>Checkout</h1>
          <p>Complete your order details below</p>
        </div>

        <div className="checkout-layout">
          <form onSubmit={handleSubmit} className="checkout-form">
            <div className="form-section">
              <div className="form-grid">
                <input
                  type="text"
                  name="firstName"
                  placeholder="First Name *"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  autoComplete="given-name"
                  aria-invalid={!!errors.firstName}
                  className={`input-field ${errors.firstName ? 'input-error' : ''}`}
                />
                <input
                  type="text"
                  name="lastName"
                  placeholder="Last Name *"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  autoComplete="family-name"
                  aria-invalid={!!errors.lastName}
                  className={`input-field ${errors.lastName ? 'input-error' : ''}`}
                />
                <input
                  type="email"
                  name="email"
                  placeholder="Email *"
                  value={formData.email}
                  onChange={handleInputChange}
                  autoComplete="email"
                  aria-invalid={!!errors.email}
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone *"
                  value={formData.phone}
                  onChange={handleInputChange}
                  autoComplete="tel"
                  aria-invalid={!!errors.phone}
                  className={`input-field ${errors.phone ? 'input-error' : ''}`}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address *"
                  value={formData.address}
                  onChange={handleInputChange}
                  autoComplete="street-address"
                  aria-invalid={!!errors.address}
                  className={`input-field ${errors.address ? 'input-error' : ''} span-2`}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City *"
                  value={formData.city}
                  onChange={handleInputChange}
                  autoComplete="address-level2"
                  aria-invalid={!!errors.city}
                  className={`input-field ${errors.city ? 'input-error' : ''}`}
                />
                <input
                  type="text"
                  name="state"
                  placeholder="State *"
                  value={formData.state}
                  onChange={handleInputChange}
                  autoComplete="address-level1"
                  aria-invalid={!!errors.state}
                  className={`input-field ${errors.state ? 'input-error' : ''}`}
                />
                <input
                  type="text"
                  name="zipCode"
                  placeholder="ZIP Code *"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  autoComplete="postal-code"
                  aria-invalid={!!errors.zipCode}
                  className={`input-field ${errors.zipCode ? 'input-error' : ''}`}
                />
              </div>

              {Object.keys(errors).length > 0 && (
                <div className="error-messages" role="alert">
                  {Object.entries(errors).map(([field, error]) => (
                    <p key={field}>{error}</p>
                  ))}
                </div>
              )}
            </div>

            <div className="form-section">
              <div className="form-grid">
                <div className="input-with-addon">
                  <input
                    type="text"
                    name="cardNumber"
                    placeholder="Card Number"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    autoComplete="cc-number"
                    className="input-field"
                  />
                  <span className={`card-brand ${cardBrand}`}>{cardBrand !== 'unknown' ? cardBrand : 'card'}</span>
                </div>
                <input
                  type="text"
                  name="nameOnCard"
                  placeholder="Name on Card"
                  value={formData.nameOnCard}
                  onChange={handleInputChange}
                  autoComplete="cc-name"
                  className="input-field"
                />
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={formData.expiryDate}
                  onChange={handleInputChange}
                  autoComplete="cc-exp"
                  className="input-field"
                />
                <input
                  type="text"
                  name="cvv"
                  placeholder={cardBrand === 'amex' ? 'CID' : 'CVV'}
                  value={formData.cvv}
                  onChange={handleInputChange}
                  autoComplete="cc-csc"
                  className="input-field"
                />
              </div>
            </div>

            <Button type="submit" loading={loading} disabled={loading} className="btn-full">
              Place Order - ${finalTotal.toFixed(2)}
            </Button>
          </form>

          <aside className="summary-panel">
            <div className="summary-card">
              <h2>Order Summary</h2>
              <div className="summary-list">
                {items.map(i => (
                  <div className="summary-item" key={i.product.id}>
                    <div className="sum-thumb">
                      <img src={i.product.image} alt={i.product.name} />
                      <span className="sum-qty">{i.quantity}</span>
                    </div>
                    <div className="sum-info">
                      <div className="sum-name">{i.product.name}</div>
                      <div className="sum-meta">{i.product.category} · {i.product.color}</div>
                    </div>
                    <div className="sum-price">${(i.product.price * i.quantity).toLocaleString()}</div>
                  </div>
                ))}
              </div>

              <div className="sum-lines">
                <div className="sum-line"><span>Subtotal</span><span>${subtotal.toLocaleString()}</span></div>
                <div className="sum-line"><span>Shipping</span><span className={shipping === 0 ? 'free' : ''}>{shipping === 0 ? 'Free' : '$49'}</span></div>
                <div className="sum-line"><span>Tax</span><span>${tax.toFixed(2)}</span></div>
                <div className="sum-total"><span>Total</span><span>${finalTotal.toFixed(2)}</span></div>
              </div>

              {shipping > 0 && (
                <div className="sum-hint">Add <b>${(500 - subtotal).toFixed(2)}</b> more to get free shipping</div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
