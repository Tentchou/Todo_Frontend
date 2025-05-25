import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';

const TagForm = ({ tag, onSubmit, onCancel }) => {
  const [name, setName] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (tag) {
      setName(tag.name);
    } else {
      setName('');
    }
    setFormErrors({});
  }, [tag]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormErrors({});
    try {
      await onSubmit({ name });
      onCancel();
    } catch (err) {
      console.error("Tag form submission error:", err);
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
        <label htmlFor="tagName" className="form-label">Tag Name</label>
        <input
          type="text"
          className={`form-control ${formErrors.name ? 'is-invalid' : ''}`}
          id="tagName"
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
          {formLoading ? <LoadingSpinner size="sm" /> : (tag ? 'Update Tag' : 'Add Tag')}
        </button>
      </div>
    </form>
  );
};

export default TagForm;