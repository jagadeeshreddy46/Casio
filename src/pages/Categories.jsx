
import React from 'react';
import { Link } from 'react-router-dom';
import { categories } from '../data/products'; 
import './Categories.css';

const categoryImages = {
  sofas: 'https://images.pexels.com/photos/1648776/pexels-photo-1648776.jpeg?auto=compress&cs=tinysrgb&w=800',
  chairs: 'https://images.pexels.com/photos/1350789/pexels-photo-1350789.jpeg?auto=compress&cs=tinysrgb&w=800',
  tables: 'https://images.pexels.com/photos/1395967/pexels-photo-1395967.jpeg?auto=compress&cs=tinysrgb&w=800',
  beds: 'https://images.pexels.com/photos/271897/pexels-photo-271897.jpeg?auto=compress&cs=tinysrgb&w=800',
  storage: 'https://images.pexels.com/photos/4207707/pexels-photo-4207707.jpeg?auto=compress&cs=tinysrgb&w=800',
  all: 'https://images.pexels.com/photos/271641/pexels-photo-271641.jpeg?auto=compress&cs=tinysrgb&w=800'
};

const Categories = () => {
  return (
    <div className="categories-container">
      <h1 className="categories-title">Shop by Category</h1>
      <div className="categories-grid">
        {categories.map((category) => (
          <Link
            to={`/products?category=${category.id}`}
            key={category.id}
            className="category-card"
          >
            <img
              src={categoryImages[category.id]}
              alt={category.name}
              className="category-image"
            />
            <div className="category-info">
              <div className="category-icon">{category.icon}</div>
              <div className="category-name">{category.name}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Categories;
