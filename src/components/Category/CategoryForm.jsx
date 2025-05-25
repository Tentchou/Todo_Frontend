import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

const CategoryForm = ({ category, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (category) {
      setName(category.name);
    } else {
      setName('');
    }
    setFormErrors({});
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormErrors({});
    try {
      await onSubmit({ name });
      onCancel();
    } catch (err) {
      console.error("Category form submission error:", err);
      if (err.response && err.response.data && err.response.data.errors) {
        setFormErrors(err.response.data.errors);
      } else if (err.response && err.response.data && err.response.data.message) {
        setFormErrors({ general: err.response.data.message });
      } else {
        setFormErrors({ general: 'An unexpected error occurred.' });
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {formErrors.general && <div className="alert alert-danger">{formErrors.general}</div>}
      <div className="mb-3">
        <label htmlFor="categoryName" className="form-label">Category Name</label>
        <input
          type="text"
          className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
          id="categoryName"
          value={name}
          onChange={(e) => { setName(e.target.value); setFormErrors(prev => ({ ...prev, name: undefined })); }}
          required
        />
        {formErrors.name && <div className="invalid-feedback">{formErrors.name.join(', ')}</div>}
      </div>
      <div className="d-flex justify-content-end gap-2">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={formLoading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={formLoading}>
          {formLoading ? <LoadingSpinner size="sm" /> : (category ? 'Update Category' : 'Add Category')}
        </button>
      </div>
    </form>
  );
};

export default CategoryForm;