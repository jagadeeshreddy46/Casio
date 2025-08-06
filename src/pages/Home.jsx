import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Star, Truck, Shield, Award, Users } from 'lucide-react';
import { products, categories } from '../data/products';
import ProductCard from '../components/Product/ProductCard';
import Button from '../components/UI/Button';
import './Home.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const featuredProducts = products.filter(product => product.featured);
  const bestsellerProducts = products.filter(product => product.bestseller);

  const features = [
    { icon: <Truck className="icon-amber" />, title: "Free Shipping", description: "Free delivery on orders over $500" },
    { icon: <Shield className="icon-amber" />, title: "Secure Payment", description: "100% secure payment processing" },
    { icon: <Award className="icon-amber" />, title: "Quality Guarantee", description: "Premium quality furniture guaranteed" },
    { icon: <Users className="icon-amber" />, title: "Expert Support", description: "24/7 customer support available" }
  ];

  const handleSubscribe = (e) => {
    e.preventDefault();
    const isValid = /\S+@\S+\.\S+/.test(email);
    if (!isValid) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 3000);
  };

  return (
    <div className="home-container">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <div className="hero-text">
              <h1 className="hero-title">
                Transform Your
                <span className="highlight">Living Space</span>
              </h1>
              <p className="hero-description">
                Discover our premium collection of modern furniture designed to elevate your home. 
                From contemporary sofas to elegant dining sets, find pieces that reflect your style.
              </p>
              <div className="hero-buttons">
                <Button size="large" asChild to="/products">
                  Shop Now
                  <ArrowRight className="icon-small" />
                </Button>
                <Button variant="secondary" size="large" asChild to="/search">
                  View Catalog
                </Button>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <img
                src="https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern Living Room"
                className="hero-image"
              />
              <div className="hero-rating">
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="star-icon" />
                  ))}
                </div>
                <span className="rating-score">4.9/5</span>
                <p className="rating-text">2,000+ Happy Customers</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="features-section">
        <div className="container grid-4">
          {features.map((feature, index) => (
            <div key={index} className="feature-card">
              <div className="feature-icon-wrapper">{feature.icon}</div>
              <h3 className="feature-title">{feature.title}</h3>
              <p className="feature-description">{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="categories-section">
        <div className="container">
          <div className="section-header text-center">
            <h2 className="section-title">Shop by Category</h2>
            <p className="section-subtitle">
              Explore our wide range of furniture categories to find the perfect pieces for every room in your home.
            </p>
          </div>
          <div className="categories-grid">
            {categories.slice(1).map((category) => (
              <Link
                key={category.id}
                to={`/products?category=${category.id}`}
                className="category-card"
              >
                <div className="category-icon">{category.icon}</div>
                <h3 className="category-name">{category.name}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="featured-products-section">
        <div className="container">
          <div className="section-header flex-between">
            <div>
              <h2 className="section-title">Featured Products</h2>
              <p className="section-subtitle">
                Handpicked pieces that showcase the best of modern design and quality craftsmanship.
              </p>
            </div>
            <Button variant="secondary" asChild className="view-all-btn" to="/products">
              View All
              <ArrowRight className="icon-small" />
            </Button>
          </div>
          <div className="products-grid">
            {featuredProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          <div className="view-all-mobile">
            <Button variant="secondary" asChild to="/products">
              View All Products
              <ArrowRight className="icon-small" />
            </Button>
          </div>
        </div>
      </section>

      <section className="bestsellers-section">
        <div className="container text-center">
          <h2 className="section-title">Customer Favorites</h2>
          <p className="section-subtitle">
            Discover why these bestselling pieces have become customer favorites and see what everyone is talking about.
          </p>
          <div className="products-grid">
            {bestsellerProducts.slice(0, 4).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section className="newsletter-section">
        <div className="container text-center">
          <h2 className="newsletter-title">Stay Updated</h2>
          <p className="newsletter-subtitle">
            Subscribe to our newsletter and be the first to know about new arrivals, exclusive deals, and design tips.
          </p>

          {subscribed && (
            <div className="newsletter-toast">Subscribed successfully! Check your inbox for a welcome email.</div>
          )}

          <form className="newsletter-form" onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Enter your email"
              className="newsletter-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button className="newsletter-btn" type="submit">Subscribe</Button>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Home;
