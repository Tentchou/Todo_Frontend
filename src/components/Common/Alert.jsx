import React, { useEffect } from 'react';

const Alert = ({ message, type = 'info', onClose }) => {
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000); // L'alerte disparaît après 5 secondes

      return () => clearTimeout(timer);
    }
  }, [message, onClose]);

  if (!message) return null;

  return (
    <div className={`alert alert-${type} alert-dismissible fade show fixed-top mt-2 mx-auto`}
         role="alert" style={{ maxWidth: '400px', zIndex: 1050 }}>
      {message}
      <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
    </div>
  );
};

export default Alert;