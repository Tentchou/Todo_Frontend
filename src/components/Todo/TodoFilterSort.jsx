import React from 'react';
import { PRIORITY_MAP } from '../../utils/constants';

const TodoFilterSort = ({ onFilterSort, currentFilters, categories, tags }) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onFilterSort({ [name]: value });
  };

  return (
    <div className="row g-2 mb-3">
      <div className="col-sm-6 col-md-4 col-lg-3">
        <select
          name="category_id"
          className="form-select"
          value={currentFilters.category_id}
          onChange={handleChange}
        >
          <option value="">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-3">
        <select
          name="tag_id"
          className="form-select"
          value={currentFilters.tag_id}
          onChange={handleChange}
        >
          <option value="">All Tags</option>
          {tags.map(tag => (
            <option key={tag.id} value={tag.id}>{tag.name}</option>
          ))}
        </select>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-2">
        <select
          name="is_completed"
          className="form-select"
          value={currentFilters.is_completed}
          onChange={handleChange}
        >
          <option value="">All Status</option>
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-2">
        <select
          name="priority"
          className="form-select"
          value={currentFilters.priority}
          onChange={handleChange}
        >
          <option value="">All Priorities</option>
          {Object.entries(PRIORITY_MAP).map(([value, label]) => (
            <option key={value} value={value}>{label}</option>
          ))}
        </select>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-2">
        <select
          name="sort_by"
          className="form-select"
          value={currentFilters.sort_by}
          onChange={handleChange}
        >
          <option value="created_at">Created Date</option>
          <option value="due_date">Due Date</option>
          <option value="priority">Priority</option>
          <option value="title">Title</option>
        </select>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-2">
        <select
          name="sort_order"
          className="form-select"
          value={currentFilters.sort_order}
          onChange={handleChange}
        >
          <option value="desc">Descending</option>
          <option value="asc">Ascending</option>
        </select>
      </div>
      <div className="col-sm-6 col-md-4 col-lg-2">
        <select
          name="per_page"
          className="form-select"
          value={currentFilters.per_page}
          onChange={handleChange}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
        </select>
      </div>
    </div>
  );
};

export default TodoFilterSort;