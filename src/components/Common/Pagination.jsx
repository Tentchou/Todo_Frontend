import React from 'react';

const Pagination = ({ pagination, onPageChange }) => {
  // Ne pas afficher la pagination s'il n'y a qu'une seule page ou aucune information
  if (!pagination || pagination.last_page <= 1) {
    return null;
  }

  const { current_page, last_page } = pagination; // Pas besoin de 'links' pour cette implémentation

  // Fonction pour générer les numéros de page avec une logique de points de suspension
  const generatePageNumbers = () => {
    const pages = [];
    const maxPagesToShow = 5; // Nombre maximum de numéros de page visibles à la fois
    const delta = 2; // Nombre de pages à afficher de chaque côté de la page courante

    // Ajouter la première page si elle n'est pas dans la fenêtre visible
    if (current_page - delta > 1) {
      pages.push(1);
      if (current_page - delta > 2) { // Ajouter des points de suspension si nécessaire
        pages.push('...');
      }
    }

    // Ajouter les pages autour de la page courante
    for (let i = Math.max(1, current_page - delta); i <= Math.min(last_page, current_page + delta); i++) {
      pages.push(i);
    }

    // Ajouter la dernière page si elle n'est pas dans la fenêtre visible
    if (current_page + delta < last_page) {
      if (current_page + delta < last_page - 1) { // Ajouter des points de suspension si nécessaire
        pages.push('...');
      }
      pages.push(last_page);
    }

    return pages.map((page, index) => (
      <li
        key={page === '...' ? `dots-${index}` : page} // Clé unique pour les points de suspension
        className={`page-item ${current_page === page ? 'active' : ''} ${page === '...' ? 'disabled' : ''}`}
      >
        <button
          className="page-link"
          onClick={() => page !== '...' && onPageChange(page)} // Ne pas réagir au clic sur les points de suspension
          disabled={page === '...'} // Désactiver le bouton si c'est '...'
          aria-label={page === '...' ? "Pages non affichées" : `Page ${page}`}
        >
          {page}
        </button>
      </li>
    ));
  };

  return (
    <nav aria-label="Navigation des pages de tâches" className="mt-4">
      <ul className="pagination justify-content-center flex-wrap shadow-sm rounded"> {/* Ajout de shadow et rounded */}
        {/* Bouton "Première page" */}
        <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(1)}
            disabled={current_page === 1}
            aria-label="Aller à la première page"
          >
            &laquo;
          </button>
        </li>
        {/* Bouton "Précédent" */}
        <li className={`page-item ${current_page === 1 ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(current_page - 1)}
            disabled={current_page === 1}
            aria-label="Page précédente"
          >
            &lsaquo;
          </button>
        </li>

        {/* Numéros de page générés */}
        {generatePageNumbers()}

        {/* Bouton "Suivant" */}
        <li className={`page-item ${current_page === last_page ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(current_page + 1)}
            disabled={current_page === last_page}
            aria-label="Page suivante"
          >
            &rsaquo;
          </button>
        </li>
        {/* Bouton "Dernière page" */}
        <li className={`page-item ${current_page === last_page ? 'disabled' : ''}`}>
          <button
            className="page-link"
            onClick={() => onPageChange(last_page)}
            disabled={current_page === last_page}
            aria-label="Aller à la dernière page"
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;