import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ show, onClose, title, children, size = 'md' }) => {
  if (!show) {
    return null;
  }

  const modalClasses = `modal-dialog modal-dialog-centered ${size === 'xl' ? 'modal-xl' : ''}`;
  

  return createPortal(
    <div className="modal fade show d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
      <div className={modalClasses}>
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">{title}</h5>
            <button type="button" className="btn-close" onClick={onClose} aria-label="Close"></button>
          </div>
          <div className="modal-body">
            {children}
          </div>
        </div>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default Modal;