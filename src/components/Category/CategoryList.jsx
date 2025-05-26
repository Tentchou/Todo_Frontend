import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faFolderOpen, faTrashAlt } from '@fortawesome/free-solid-svg-icons';


const CategoryList = ({ categories, onEdit, onDelete }) => {
  if (!categories || categories.length === 0) {
    return <p className="text-center text-muted py-4">No categories found. Create one!</p>;
  }

  return (
    <div className="row">
      <div className="col-md-12">
        <div className="card card-round">
          <div className="card-header">
            <div className="card-head-row card-tools-still-right">
              <div className="card-title"><FontAwesomeIcon icon={faFolderOpen} className="me-2" />Your Categorie</div>
            </div>
          </div>
          <div className="card-body p-0">
            <div className="table-responsive">
                {/* <!-- Projects table --> */}
                <table className="table align-items-center mb-0">
                  <thead className="thead-light">
                    <tr>
                      <th scope="col">Name</th>
                      <th className='text-end'>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categories.map(category => (
                      <tr key={category.id}>
                        <td >{category.name}</td>
                        <td className='text-end '>
                          <button className="btn btn-sm btn-info me-2" onClick={() => onEdit(category)} title="Edit Category">
                            <FontAwesomeIcon icon={faEdit} />
                          </button>
                          <button className="btn btn-sm btn-danger" onClick={() => onDelete(category.id)} title="Delete Category">
                            <FontAwesomeIcon icon={faTrashAlt} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryList;