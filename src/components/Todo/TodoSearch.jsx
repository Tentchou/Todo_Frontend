import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const TodoSearch = ({ onSearch, currentSearch }) => {
  const [searchTerm, setSearchTerm] = useState(currentSearch);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      onSearch({ search: searchTerm });
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [searchTerm, onSearch]);

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div className="input-group mb-3">
      <span className="input-group-text bg-primary text-white" id="search-addon">
        <FontAwesomeIcon icon={faSearch} />
      </span>
      <input
        type="text"
        className="form-control"
        placeholder="Search todos by title or description..."
        aria-label="Search"
        aria-describedby="search-addon"
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default TodoSearch;