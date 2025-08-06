import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium' }) => {
  const sizeClasses = {
    small: 'spinner-small',
    medium: 'spinner-medium',
    large: 'spinner-large'
  };

  return (
    <div className="loading-wrapper">
      <div className={`spinner ${sizeClasses[size]}`}></div>
    </div>
  );
};

export const LoadingSpinner = ({ className = '' }) => (
  <div className={`spinner spinner-inline ${className}`}></div>
);

export const PageLoading = () => (
  <div className="page-loading">
    <div className="text-center">
      <div className="spinner spinner-large center-spinner"></div>
      <p className="loading-text">Loading...</p>
    </div>
  </div>
);

export default Loading;
