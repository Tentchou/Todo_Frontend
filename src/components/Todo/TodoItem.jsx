import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckCircle, faTimesCircle, faCalendarAlt, faExclamationCircle, faFolderOpen, faTags } from '@fortawesome/free-solid-svg-icons';
import { PRIORITY_MAP } from '../../utils/constants';

const TodoItem = ({ todo, onEdit, onDelete, onToggleComplete }) => {
  const getPriorityBadgeClass = (priority) => {
    switch (priority) {
      case 3: return 'bg-danger'; // High
      case 2: return 'bg-warning text-dark'; // Medium
      case 1: return 'bg-info'; // Low
      default: return 'bg-secondary';
    }
  };

  return (
    <div className="col-12 mb-3">
      <div className={`
        todo-item d-flex flex-column flex-md-row
        justify-content-between align-items-start align-items-md-center
        p-3 border rounded shadow-sm
        ${todo.is_completed ? 'completed bg-light' : 'bg-white'}
      `}>
        {/* Section principale du contenu (titre, description, badges, date) */}
        <div className="flex-grow-1 me-md-3 w-100">
          <h5 className="mb-1 text-primary">{todo.title}</h5>
          {todo.description && <p className="mb-2 text-muted small">{todo.description}</p>}

          {/* Conteneur pour Catégories, Tags et Priorité : alignés en bloc sous la description */}
          {/* NOUVEAU: Utilisez un div simple sans d-flex ici pour un comportement "inline" ou "inline-block" */}
          {/* Les badges sont des éléments inline-block par défaut ou le deviennent avec 'badge' */}
          <div className="mb-2 mt-2"> {/* mb-2 pour espacer de la date, mt-2 pour espacer de la description */}
            {todo.category && (
              <span className="badge bg-primary text-white me-1 p-2 my-1 rounded-pill"> {/* me-1 pour un petit espacement horizontal entre badges */}
                <FontAwesomeIcon icon={faFolderOpen} className="me-1" />
                {todo.category.name}
              </span>
            )}
            {todo.tags && todo.tags.map(tag => (
              <span key={tag.id} className="badge bg-secondary me-1 p-2 my-1 rounded-pill">
                <FontAwesomeIcon icon={faTags} className="me-1" />
                {tag.name}
              </span>
            ))}
            <span className={`badge ${getPriorityBadgeClass(todo.priority)} me-1 p-2 my-1 rounded-pill`}>
              <FontAwesomeIcon icon={faExclamationCircle} className="me-1" />
              Priorité: {PRIORITY_MAP[todo.priority]}
            </span>
          </div>

          {/* Conteneur pour la Date d'échéance : centrée */}
          {todo.due_date && (
            <div className="d-flex justify-content-center w-100 mt-2">
              <small className="text-muted d-inline-flex align-items-center bg-light p-1 rounded">
                <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
                Échéance: {new Date(todo.due_date).toLocaleDateString()}
              </small>
            </div>
          )}
        </div>

        {/* Boutons d'action : restent à droite */}
        <div className="btn-group flex-shrink-0 mt-3 mt-md-0">
          <button
            className={`btn btn-sm me-2 ${todo.is_completed ? 'btn-warning' : 'btn-success'}`}
            onClick={() => onToggleComplete(todo)}
            title={todo.is_completed ? 'Marquer comme en attente' : 'Marquer comme terminée'}
          >
            <FontAwesomeIcon icon={todo.is_completed ? faTimesCircle : faCheckCircle} />
          </button>
          <button className="btn btn-sm btn-info me-2" onClick={() => onEdit(todo)} title="Modifier">
            <FontAwesomeIcon icon={faEdit} />
          </button>
          <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)} title="Supprimer">
            <FontAwesomeIcon icon={faTrashAlt} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;