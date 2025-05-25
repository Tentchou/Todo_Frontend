import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faCheckCircle, faTimesCircle, faCalendarAlt, faExclamationCircle,faFolderOpen,faTags } from '@fortawesome/free-solid-svg-icons';
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
    <div className={`todo-item d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center ${todo.is_completed ? 'completed' : ''}`}>
      <div className="flex-grow-1 me-md-3 mb-2 mb-md-0">
        <h5 className="mb-1">{todo.title}</h5>
        {todo.description && <p className="mb-1 text-muted small">{todo.description}</p>}

        <div className="d-flex flex-wrap align-items-center mt-2">
          {todo.category && (
            <span className="badge bg-primary text-white me-2 mb-1">
              <FontAwesomeIcon icon={faFolderOpen} className="me-1" />
              {todo.category.name}
            </span>
          )}
          {todo.tags && todo.tags.map(tag => (
            <span key={tag.id} className="badge bg-secondary me-2 mb-1">
              <FontAwesomeIcon icon={faTags} className="me-1" />
              {tag.name}
            </span>
          ))}
          <span className={`badge ${getPriorityBadgeClass(todo.priority)} me-2 mb-1`}>
            <FontAwesomeIcon icon={faExclamationCircle} className="me-1" />
            Priority: {PRIORITY_MAP[todo.priority]}
          </span>
          {todo.due_date && (
            <small className="text-muted d-flex align-items-center mb-1">
              <FontAwesomeIcon icon={faCalendarAlt} className="me-1" />
              Due: {new Date(todo.due_date).toLocaleDateString()}
            </small>
          )}
        </div>
      </div>
      <div className="btn-group flex-shrink-0">
        <button
          className={`btn btn-sm ${todo.is_completed ? 'btn-warning' : 'btn-success'}`}
          onClick={() => onToggleComplete(todo)}
          title={todo.is_completed ? 'Mark as Pending' : 'Mark as Complete'}
        >
          <FontAwesomeIcon icon={todo.is_completed ? faTimesCircle : faCheckCircle} />
        </button>
        <button className="btn btn-sm btn-info" onClick={() => onEdit(todo)} title="Edit">
          <FontAwesomeIcon icon={faEdit} />
        </button>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(todo.id)} title="Delete">
          <FontAwesomeIcon icon={faTrashAlt} />
        </button>
      </div>
    </div>
  );
};

export default TodoItem;