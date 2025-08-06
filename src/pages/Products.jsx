import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { products } from '../data/products';
import ProductGrid from '../components/Product/ProductGrid';
import ProductFilters from '../components/Product/ProductFilters';
import { Funnel, ChevronDown } from 'lucide-react';
import './Products.css';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [sortBy, setSortBy] = useState('name');
  const [loading, setLoading] = useState(false);

  const [filters, setFilters] = useState({
    category: searchParams.get('category') || 'all',
    priceRange: [0, 2000],
    color: ''
  });

  const sortOptions = useMemo(() => ([
    { value: 'name', label: 'Name (A-Z)' },
    { value: 'price-low', label: 'Price: Low to High' },
    { value: 'price-high', label: 'Price: High to Low' },
    { value: 'newest', label: 'Newest First' }
  ]), []);

  useEffect(() => {
    setLoading(true);
    const timeout = setTimeout(() => {
      let filtered = products;

      if (filters.category !== 'all') {
        filtered = filtered.filter(p => p.category === filters.category);
      }
      filtered = filtered.filter(p => p.price >= filters.priceRange[0] && p.price <= filters.priceRange[1]);
      if (filters.color) {
        filtered = filtered.filter(p => p.color === filters.color);
      }

      switch (sortBy) {
        case 'price-low':
          filtered = [...filtered].sort((a, b) => a.price - b.price);
          break;
        case 'price-high':
          filtered = [...filtered].sort((a, b) => b.price - a.price);
          break;
        case 'newest':
          filtered = [...filtered].reverse();
          break;
        default:
          filtered = [...filtered].sort((a, b) => a.name.localeCompare(b.name));
      }

      setFilteredProducts(filtered);
      setLoading(false);
    }, 250);
    return () => clearTimeout(timeout);
  }, [filters, sortBy]);

  useEffect(() => {
    if (filters.category !== 'all') {
      setSearchParams({ category: filters.category });
    } else {
      setSearchParams({});
    }
  }, [filters.category, setSearchParams]);

  const handleFilterChange = (newFilters) => setFilters(newFilters);

  const handleClearFilters = () => {
    setFilters({ category: 'all', priceRange: [0, 2000], color: '' });
  };

  const hasActiveFilters =
    filters.category !== 'all' ||
    filters.color !== '' ||
    filters.priceRange[0] !== 0 ||
    filters.priceRange[1] !== 2000;

  return (
    <div className="products-page">
      <div className="page-container">
        <header className="products-header">
          <div className="header-left">
            <h1>Our Products</h1>
            <p>Discover our complete collection of premium furniture pieces designed for modern living.</p>
          </div>

          <button
            className="filters-toggle"
            onClick={() => setIsFilterOpen(true)}
            aria-label="Open filters"
          >
            <Funnel className="filters-toggle-icon" />
            Filters
            {hasActiveFilters && <span className="filters-badge">!</span>}
          </button>
        </header>

        <div className="products-content">
          <aside className="filters-sidebar">
            <ProductFilters
              filters={filters}
              onFilterChange={handleFilterChange}
              onClearFilters={handleClearFilters}
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen(!isFilterOpen)}
            />
          </aside>

          <main className="products-main">
            <section className="results-header">
              <div className="results-info">
                <p>
                  Showing <span className="highlight">{filteredProducts.length}</span> products
                  {filters.category !== 'all' && <> in <span className="highlight capitalize">{filters.category}</span></>}
                </p>
              </div>

              <div className="sort-dropdown-wrapper">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="sort-dropdown"
                  aria-label="Sort products"
                >
                  {sortOptions.map(opt => (
                    <option key={opt.value} value={opt.value}>{opt.label}</option>
                  ))}
                </select>
                <ChevronDown className="sort-icon" aria-hidden="true" />
              </div>
            </section>

            <ProductGrid products={filteredProducts} loading={loading} />
          </main>
        </div>
      </div>
    </div>
  );
};

export default Products;
