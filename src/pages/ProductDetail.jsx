import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShoppingCart, Heart, Star, Truck, Shield, RotateCcw, Zap } from 'lucide-react';
import { products } from '../data/products';
import { useCart } from '../context/CartContext';
import Button from '../components/UI/Button';
import ProductCard from '../components/Product/ProductCard';
import { PageLoading } from '../components/UI/Loading';
import './ProductDetail.css';

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      const foundProduct = products.find(p => String(p.id) === String(id));
      setProduct(foundProduct || null);
      setLoading(false);
    }, 500);
    return () => clearTimeout(timeout);
  }, [id]);

  if (loading) return <PageLoading />;

  if (!product) {
    return (
      <div className="product-notfound-container">
        <div className="product-notfound-content">
          <h2>Product not found</h2>
          <p>The product you're looking for doesn't exist.</p>
          <Button onClick={() => navigate('/products')} size="large">Back to Products</Button>
        </div>
      </div>
    );
  }

  const handleAddToCart = async () => {
    setAddingToCart(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    for (let i = 0; i < quantity; i++) addItem(product);
    setAddingToCart(false);
  };

  const relatedProducts = products
    .filter(p => String(p.id) !== String(product.id) && p.category === product.category)
    .slice(0, 4);

  const features = [
    { icon: <Truck className="icon-regular" />, title: "Free Shipping", description: "Free delivery on orders over $500" },
    { icon: <RotateCcw className="icon-regular" />, title: "30-Day Returns", description: "Easy returns within 30 days" },
    { icon: <Shield className="icon-regular" />, title: "Warranty", description: `${product.specifications.warranty} warranty included` },
    { icon: <Zap className="icon-regular" />, title: "Quick Setup", description: "Professional assembly available" }
  ];

  const starsFilled = 4;

  return (
    <div className="product-detail-container">
      <div className="content-wrapper">
        <button onClick={() => navigate(-1)} className="back-button" aria-label="Go back">
          <ArrowLeft className="icon-small" />
          Back
        </button>

        <div className="product-main-card">
          <div className="product-grid">
            <div className="product-images">
              <div className="main-image-wrapper">
                <img
                  src={product.images[selectedImage]}
                  alt={product.name}
                  className="main-image"
                />
              </div>

              {product.images.length > 1 && (
                <div className="thumbnail-list" role="tablist" aria-label="Product images">
                  {product.images.map((image, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedImage(index)}
                      className={`thumbnail-btn ${selectedImage === index ? 'selected' : ''}`}
                      aria-label={`View image ${index + 1}`}
                      role="tab"
                      aria-selected={selectedImage === index}
                    >
                      <img src={image} alt={`${product.name} ${index + 1}`} className="thumbnail-image" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            <div className="product-info">
              <div className="product-labels">
                {product.bestseller && <span className="label-bestseller">Bestseller</span>}
                {product.featured && <span className="label-featured">Featured</span>}
                {!product.inStock && <span className="label-outofstock">Out of Stock</span>}
              </div>

              <h1 className="product-title">{product.name}</h1>

              <div className="rating-section">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`star-icon ${i < starsFilled ? 'star-active' : 'star-inactive'}`} />
                  ))}
                </div>
                <span className="reviews-text">(24 reviews)</span>
              </div>

              <div className="price-section">
                <span className="current-price">${product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <>
                    <span className="original-price">${product.originalPrice.toLocaleString()}</span>
                    <span className="price-save">Save ${(product.originalPrice - product.price).toLocaleString()}</span>
                  </>
                )}
              </div>

              <div className="description-section">
                <h3>Description</h3>
                <p>{product.description}</p>
              </div>

              <div className="quantity-cart-section">
                <label className="qty-label" htmlFor="quantity-display">Quantity</label>
                <div className="quantity-controls" aria-live="polite">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="quantity-btn"
                  >
                    –
                  </button>
                  <span id="quantity-display" className="quantity-display" aria-atomic="true">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    aria-label="Increase quantity"
                    className="quantity-btn"
                  >
                    +
                  </button>
                </div>

                <div className="cart-actions">
                  <Button
                    onClick={handleAddToCart}
                    disabled={!product.inStock}
                    loading={addingToCart}
                    className="btn-addtocart"
                    size="large"
                  >
                    <ShoppingCart className="icon-regular mr-2" />
                    {product.inStock ? 'Add to Cart' : 'Out of Stock'}
                  </Button>
                  <button className="btn-wishlist" aria-label="Add to wishlist">
                    <Heart className="icon-regular" />
                  </button>
                </div>
              </div>

              <div className="features-grid">
                {features.map((feature, index) => (
                  <div key={index} className="feature-item">
                    <div className="feature-icon">{feature.icon}</div>
                    <div className="feature-text">
                      <h4>{feature.title}</h4>
                      <p>{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="specifications-section">
            <h3>Specifications</h3>
            <div className="specifications-grid">
              <div className="spec-column">
                <div className="spec-item">
                  <span>Material:</span>
                  <span>{product.specifications.material}</span>
                </div>
                <div className="spec-item">
                  <span>Dimensions:</span>
                  <span>{product.specifications.dimensions}</span>
                </div>
              </div>
              <div className="spec-column">
                <div className="spec-item">
                  <span>Weight:</span>
                  <span>{product.specifications.weight}</span>
                </div>
                <div className="spec-item">
                  <span>Warranty:</span>
                  <span>{product.specifications.warranty}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {relatedProducts.length > 0 && (
          <div className="related-products-section">
            <h2>You might also like</h2>
            <div className="related-products-grid">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
