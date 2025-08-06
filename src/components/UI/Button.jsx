import React from 'react';
import { Link } from 'react-router-dom';
import { LoadingSpinner } from './Loading';
import './Button.css';

const Button = ({
  children,
  variant = 'primary',
  size = 'medium',
  loading = false,
  disabled = false,
  className = '',
  to,
  ...props
}) => {
  const classes = `btn ${variant} ${size} ${loading ? 'loading' : ''} ${className}`;

  const content = (
    <>
      {loading && (
        <span className="btn-spinner">
          <LoadingSpinner className="spinner-icon" />
        </span>
      )}
      <span className={loading ? 'btn-hidden' : ''}>{children}</span>
    </>
  );

  
  if (to) {
    return (
      <Link to={to} className={classes} {...props}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} disabled={disabled || loading} {...props}>
      {content}
    </button>
  );
};

export default Button;
