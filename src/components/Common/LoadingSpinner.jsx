import React from 'react';

const LoadingSpinner = ({ size = 'md', text = 'Loading...' }) => {
  let spinnerClass = '';
  if (size === 'sm') spinnerClass = 'spinner-border-sm';
  if (size === 'lg') spinnerClass = 'spinner-border-lg';

  return (
    <div className="d-flex flex-column align-items-center justify-content-center my-4">
      <div className={`spinner-border text-primary ${spinnerClass}`} role="status">
        <span className="visually-hidden">{text}</span>
      </div>
      <p className="text-muted mt-2">{text}</p>
    </div>
  );
};

export default LoadingSpinner;