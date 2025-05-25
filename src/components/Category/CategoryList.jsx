import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const CategoryList = ({ categories, onEdit, onDelete }) => {
  if (!categories || categories.length === 0) {
    return <p className="text-center text-muted py-4">No categories found. Create one!</p>;
  }

  return (
    <ul className="list-group shadow-sm">
      {categories.map(category => (
        <li key={category.id} className="list-group-item d-flex justify-content-between align-items-center">
          <span className="lead">{category.name}</span>
          <div>
            <button className="btn btn-sm btn-info me-2" onClick={() => onEdit(category)} title="Edit Category">
              <FontAwesomeIcon icon={faEdit} />
            </button>
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(category.id)} title="Delete Category">
              <FontAwesomeIcon icon={faTrashAlt} />
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default CategoryList;