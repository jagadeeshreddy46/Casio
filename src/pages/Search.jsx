import React, { useMemo, useState, useRef, useEffect } from 'react';
import { products, categories, colors } from '../data/products';
import ProductCard from '../components/Product/ProductCard';
import './Search.css';

const Search = () => {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState('all');
  const [color, setColor] = useState('all');
  const [sortBy, setSortBy] = useState('relevance');
  const inputRef = useRef(null);


  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === '/' && document.activeElement !== inputRef.current) {
        e.preventDefault();
        inputRef.current.focus();
      }
      if (e.key === 'Escape') {
        setQuery('');
        inputRef.current.blur();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const results = useMemo(() => {
    let list = products.slice();

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter(p =>
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q)
      );
    }

    if (category !== 'all') list = list.filter(p => p.category === category);
    if (color !== 'all') list = list.filter(p => p.color === color);

    switch (sortBy) {
      case 'price-asc':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price-desc':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    return list;
  }, [query, category, color, sortBy]);

  const handleClearFilters = () => {
    setQuery('');
    setCategory('all');
    setColor('all');
    setSortBy('relevance');
  };

  return (
    <div className="search">
      <div className="search__container">
        <div className="search__header">
          <h1 className="search__title">Search Catalog</h1>
          <p className="search__subtitle">Find furniture by name, category, or color</p>
        </div>

        <div className="search__controls">
          <div className="search__control search__control--input">
            <input
              ref={inputRef}
              aria-label="Search products"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search products…"
            />
            {query && (
              <button
                className="search__clearInput"
                onClick={() => setQuery('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
            <p className="search__shortcutHint">
              Tip: Press <kbd>/</kbd> to focus, <kbd>Esc</kbd> to clear
            </p>
          </div>

          <div className="search__control">
            <label htmlFor="category">Category</label>
            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="all">All</option>
              {categories.filter(c => c.id !== 'all').map(c => (
                <option key={c.id} value={c.id}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="search__control">
            <label htmlFor="color">Color</label>
            <select
              id="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            >
              <option value="all">All</option>
              {colors.filter(c => c.value !== '').map(c => (
                <option key={c.id} value={c.value}>{c.name}</option>
              ))}
            </select>
          </div>

          <div className="search__control">
            <label htmlFor="sortBy">Sort</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="name">Name (A–Z)</option>
            </select>
          </div>

          <button className="search__clearAll" onClick={handleClearFilters}>
            Clear All
          </button>
        </div>
      <div
  className="search__grid"
  key={`${results.length}-${query}-${category}-${color}-${sortBy}`}
>
  {results.map(p => (
    <div key={p.id} className="search__cardFade">
      <ProductCard product={p} />
    </div>
  ))}
  </div>
        <div className="search__summary">
          Showing <strong>{results.length}</strong> result{results.length !== 1 ? 's' : ''}
          {query ? <> for “{query}”</> : null}
          {category !== 'all' ? <> in <strong>{category}</strong></> : null}
          {color !== 'all' ? <> • <strong>{color}</strong></> : null}
        </div>

        {results.length === 0 ? (
          <div className="search__empty">
            <div className="search__emptyBadge">No results</div>
            <p>Try a different keyword or remove some filters.</p>
          </div>
        ) : (
          <div className="search__grid">
            {results.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        )}
      </div>
    </div>
  );
};

export default Search;
