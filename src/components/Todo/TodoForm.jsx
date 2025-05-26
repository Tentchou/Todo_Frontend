import React, { useState, useEffect } from 'react';
import LoadingSpinner from '../Common/LoadingSpinner';
import { PRIORITY_MAP } from '../../utils/constants';

const TodoForm = ({ todo, categories, tags, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    due_date: '',
    priority: 1,
    is_completed: false,
    category_id: '',
    tags: [],
  });

  const [formLoading, setFormLoading] = useState(false);
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    if (todo) {
      setFormData({
        title: todo.title || '',
        description: todo.description || '',
        due_date: todo.due_date ? new Date(todo.due_date).toISOString().slice(0, 16) : '',
        priority: todo.priority || 1,
        is_completed: todo.is_completed || false,
        category_id: todo.category_id || '',
        tags: todo.tags ? todo.tags.map(tag => tag.id) : [],
      });
    } else {
      setFormData({
        title: '',
        description: '',
        due_date: '',
        priority: 1,
        is_completed: false,
        category_id: '',
        tags: [],
      });
    }
    setFormErrors({});
  }, [todo]);

  const handleChange = (e) => {
    const { name, value, type, checked, options } = e.target;

    if (name === 'tags') {
      const selectedTags = Array.from(options)
        .filter(option => option.selected)
        .map(option => parseInt(option.value));
      setFormData(prev => ({ ...prev, tags: selectedTags }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value,
      }));
    }

    // Clear the error for this field in real-time
    setFormErrors(prev => ({ ...prev, [name]: undefined }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormErrors({});
    try {
      const dataToSubmit = {
        ...formData,
        category_id: formData.category_id === '' ? null : parseInt(formData.category_id),
        due_date: formData.due_date ? new Date(formData.due_date).toISOString() : null,
      };
      await onSubmit(dataToSubmit);
      onCancel(); // Close form on success
    } catch (err) {
      if (err.response?.data?.errors) {
        setFormErrors(err.response.data.errors);
      } else {
        setFormErrors({ general: 'An unexpected error occurred.' });
      }
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formErrors.general && <div className="alert alert-danger">{formErrors.general}</div>}

      <div className="row g-3">

        <div className="col-md-6">
          <label htmlFor="titleInput" className="form-label">Title</label>
          <input
            type="text"
            className={`form-control ${formErrors.title ? 'is-invalid' : ''}`}
            id="titleInput"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
          />
          {formErrors.title && <div className="invalid-feedback">{formErrors.title.join(', ')}</div>}
        </div>

        <div className="col-md-6">
          <label htmlFor="dueDateInput" className="form-label">Due Date</label>
          <input
            type="datetime-local"
            className={`form-control ${formErrors.due_date ? 'is-invalid' : ''}`}
            id="dueDateInput"
            name="due_date"
            value={formData.due_date}
            onChange={handleChange}
          />
          {formErrors.due_date && <div className="invalid-feedback">{formErrors.due_date.join(', ')}</div>}
        </div>

        <div className="col-12">
          <label htmlFor="descriptionInput" className="form-label">Description</label>
          <textarea
            className={`form-control ${formErrors.description ? 'is-invalid' : ''}`}
            id="descriptionInput"
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows="3"
          ></textarea>
          {formErrors.description && <div className="invalid-feedback">{formErrors.description.join(', ')}</div>}
        </div>

        <div className="col-md-4">
          <label htmlFor="prioritySelect" className="form-label">Priority</label>
          <select
            className={`form-select ${formErrors.priority ? 'is-invalid' : ''}`}
            id="prioritySelect"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            required
          >
            {Object.entries(PRIORITY_MAP).map(([value, label]) => (
              <option key={value} value={value}>{label}</option>
            ))}
          </select>
          {formErrors.priority && <div className="invalid-feedback">{formErrors.priority.join(', ')}</div>}
        </div>

        <div className="col-md-4">
          <label htmlFor="categorySelect" className="form-label">Category</label>
          <select
            className={`form-select ${formErrors.category_id ? 'is-invalid' : ''}`}
            id="categorySelect"
            name="category_id"
            value={formData.category_id}
            onChange={handleChange}
          >
            <option value="">No Category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
          {formErrors.category_id && <div className="invalid-feedback">{formErrors.category_id.join(', ')}</div>}
        </div>

        <div className="col-md-4">
          <label htmlFor="tagsSelect" className="form-label">Tags</label>
          <select
            multiple
            className={`form-select ${formErrors.tags ? 'is-invalid' : ''}`}
            id="tagsSelect"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          >
            {tags.map(tag => (
              <option key={tag.id} value={tag.id}>{tag.name}</option>
            ))}
          </select>
          <small className="form-text text-muted">Ctrl/Cmd + click to select</small>
          {formErrors.tags && <div className="invalid-feedback">{formErrors.tags.join(', ')}</div>}
        </div>

        <div className="col-12">
          <div className="form-check mt-3">
            <input
              type="checkbox"
              className={`form-check-input ${formErrors.is_completed ? 'is-invalid' : ''}`}
              id="isCompletedCheck"
              name="is_completed"
              checked={formData.is_completed}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="isCompletedCheck">Completed</label>
            {formErrors.is_completed && <div className="invalid-feedback">{formErrors.is_completed.join(', ')}</div>}
          </div>
        </div>
      </div>

      <div className="d-flex justify-content-end gap-2 mt-4">
        <button type="button" className="btn btn-secondary" onClick={onCancel} disabled={formLoading}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary" disabled={formLoading}>
          {formLoading ? <LoadingSpinner size="sm" /> : todo ? 'Update Todo' : 'Add Todo'}
        </button>
      </div>
    </form>
  );
};

export default TodoForm;
