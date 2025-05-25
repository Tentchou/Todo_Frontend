import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const TagList = ({ tags, onEdit, onDelete }) => {
  if (!tags || tags.length === 0) {
    return <p className="text-center text-muted py-4">No tags found. Create one!</p>;
  }

  return (
    <ul className="list-group shadow-sm">
      {tags.map(tag => (
        <li key={tag.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span className="lead">{tag.name}</span>
          <div>
            <button className="btn btn-sm btn-info me-2" onClick={() => onEdit(tag)} title="Edit Tag">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(tag.id)} title="Delete Tag">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TagList;