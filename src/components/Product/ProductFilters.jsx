import React from 'react';
import { categories, colors } from '../../data/products';
import { Filter, X } from 'lucide-react';
import './ProductFilters.css';

const ProductFilters = ({ 
  filters, 
  onFilterChange, 
  onClearFilters, 
  isOpen, 
  onToggle 
}) => {
  const handleCategoryChange = (category) => {
    onFilterChange({ ...filters, category });
  };

  const handleColorChange = (color) => {
    onFilterChange({ ...filters, color });
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange({ ...filters, priceRange });
  };

  const priceRanges = [
    { label: 'All Prices', value: [0, 2000] },
    { label: 'Under $200', value: [0, 200] },
    { label: '$200 - $500', value: [200, 500] },
    { label: '$500 - $1000', value: [500, 1000] },
    { label: '$1000+', value: [1000, 2000] }
  ];

  const hasActiveFilters = filters.category !== 'all' || filters.color !== '' || 
    (filters.priceRange[0] !== 0 || filters.priceRange[1] !== 2000);

  const FilterContent = () => (
    <div className="filter-section">
      <div>
        <h3 className="section-title">Categories</h3>
        <div className="option-list">
          {categories.map((category) => (
            <label key={category.id} className="option">
              <input
                type="radio"
                name="category"
                value={category.id}
                checked={filters.category === category.id}
                onChange={() => handleCategoryChange(category.id)}
              />
              <span className={`radio-indicator ${filters.category === category.id ? 'active' : ''}`}></span>
              <span className="option-label">
                <span className="icon">{category.icon}</span>
                {category.name}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="section-title">Price Range</h3>
        <div className="option-list">
          {priceRanges.map((range, index) => (
            <label key={index} className="option">
              <input
                type="radio"
                name="priceRange"
                checked={filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1]}
                onChange={() => handlePriceChange(range.value)}
              />
              <span className={`radio-indicator ${filters.priceRange[0] === range.value[0] && filters.priceRange[1] === range.value[1] ? 'active' : ''}`}></span>
              <span className="option-label">{range.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h3 className="section-title">Colors</h3>
        <div className="option-list">
          {colors.map((color) => (
            <label key={color.id} className="option">
              <input
                type="radio"
                name="color"
                value={color.value}
                checked={filters.color === color.value}
                onChange={() => handleColorChange(color.value)}
              />
              <span className={`radio-indicator ${filters.color === color.value ? 'active' : ''}`}></span>
              <span className="option-label">{color.name}</span>
            </label>
          ))}
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={onClearFilters} className="clear-filters-btn">
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <>
      <div className="mobile-toggle">
        <button onClick={onToggle} className="toggle-btn">
          <Filter className="icon" />
          Filters
          {hasActiveFilters && <span className="active-badge">!</span>}
        </button>
      </div>

      <div className="desktop-filters">
        <div className="header">
          <h2 className="title">Filters</h2>
          {hasActiveFilters && (
            <button onClick={onClearFilters} className="clear-btn">Clear all</button>
          )}
        </div>
        <FilterContent />
      </div>

      {isOpen && (
        <div className="mobile-modal">
          <div className="modal-bg" onClick={onToggle}></div>
          <div className="modal-content">
            <div className="modal-header">
              <h2 className="title">Filters</h2>
              <button onClick={onToggle} className="close-btn">
                <X className="icon" />
              </button>
            </div>
            <FilterContent />
          </div>
        </div>
      )}
    </>
  );
};

export default ProductFilters;
