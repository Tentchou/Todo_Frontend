import React from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle, faHome } from '@fortawesome/free-solid-svg-icons';

const NotFoundPage = () => {
  return (
    <div className="d-flex flex-column align-items-center justify-content-center text-center py-5" style={{ minHeight: 'calc(100vh - 100px)' }}>
      <FontAwesomeIcon icon={faExclamationTriangle} size="5x" className="text-warning mb-4" />
      <h1 className="display-4 text-danger">404 - Page Not Found</h1>
      <p className="lead text-muted">The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="btn btn-primary mt-3">
        <FontAwesomeIcon icon={faHome} className="me-2" />Go to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;