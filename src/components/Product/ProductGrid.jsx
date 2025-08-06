import React from 'react';
import ProductCard from './ProductCard';
import { PageLoading } from '../UI/Loading';
import './ProductGrid.css';

const ProductGrid = ({ products, loading = false }) => {
  if (loading) {
    return <PageLoading />;
  }

  if (!products || products.length === 0) {
    return (
      <div className="product-grid-empty">
        <div className="empty-content">
          <div className="empty-icon">
            <svg fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
          </div>
          <h3 className="empty-title">No products found</h3>
          <p className="empty-subtitle">Try adjusting your filters to find what you're looking for.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="product-grid">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid;
