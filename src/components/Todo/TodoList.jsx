import React from 'react';
import TodoItem from './TodoItem';
import Pagination from '../Common/Pagination';

const TodoList = ({ todos, onEdit, onDelete, onToggleComplete, pagination, onPageChange }) => {
  if (!todos || todos.length === 0) {
    return <p className="text-center text-muted py-4">No todos found matching your criteria.</p>;
  }

  return (
    <div>
      <div className="list-group">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onEdit={onEdit}
            onDelete={onDelete}
            onToggleComplete={onToggleComplete}
          />
        ))}
      </div>
      {pagination && <Pagination pagination={pagination} onPageChange={onPageChange} />}
    </div>
  );
};

export default TodoList;