import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  if (!pagination || pagination.last_page <= 1) {
    return null; // Pas de pagination si une seule page
  }

  const { current_page, last_page, links } = pagination;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    // Limite l'affichage à quelques pages autour de la page actuelle
    let startPage = Math.max(1, current_page - 2);
    let endPage = Math.min(last_page, current_page + 2);

    if (current_page < 3) {
        endPage = Math.min(last_page, 5);
    }
    if (current_page > last_page - 2) {
        startPage = Math.max(1, last_page - 4);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <li key={i} className={`page-item ${current_page === i ? 'active' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(i)}>
            {i}
          </button>
        </li>
      );
    }
    return pageNumbers;
  };

  return (
    <nav aria-label="Pagination" className="mt-4">
      <ul className="pagination justify-content-center flex-wrap"> {/* flex-wrap pour les petits écrans */}
        <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(1)} aria-label="First">
            &laquo; First
          </button>
        </li>
        <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(current_page - 1)} aria-label="Previous">
            &lsaquo; Previous
          </button>
        </li>

        {renderPageNumbers()}

        <li className={`page-item ${current_page === last_page ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(current_page + 1)} aria-label="Next">
            Next &rsaquo;
          </button>
        </li>
        <li className={`page-item ${current_page === last_page ? 'disabled' : ''}`}>
          <button className="page-link" onClick={() => onPageChange(last_page)} aria-label="Last">
            Last &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;