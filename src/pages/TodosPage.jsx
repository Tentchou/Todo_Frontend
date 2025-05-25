import React, { useState, useEffect } from 'react';
import { useTodos } from '../hooks/useTodos';
import { useCategories } from '../hooks/useCategories';
import { useTags } from '../hooks/useTags';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import TodoForm from '../components/Todo/TodoForm';
import TodoList from '../components/Todo/TodoList';
import TodoFilterSort from '../components/Todo/TodoFilterSort';
import TodoSearch from '../components/Todo/TodoSearch';
import Modal from '../components/Common/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const TodosPage = () => {
  const [showModal, setShowModal] = useState(false);
  const [currentTodo, setCurrentTodo] = useState(null);

  const { todos, fetchTodos, addTodo, updateTodo, deleteTodo, loading, error, pagination } = useTodos();
  const { categories, loading: categoriesLoading } = useCategories();
  const { tags, loading: tagsLoading } = useTags();

  const [filters, setFilters] = useState({
    search: '',
    category_id: '',
    tag_id: '',
    is_completed: '',
    priority: '',
    sort_by: 'created_at',
    sort_order: 'desc',
    page: 1,
    per_page: 10,
  });

  useEffect(() => {
    fetchTodos(filters);
  }, [filters, fetchTodos]);

  const handleFilterChange = (newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  const handlePageChange = (page) => {
    setFilters(prev => ({ ...prev, page }));
  };

  const handleEdit = (todo) => {
    setCurrentTodo(todo);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this todo?')) {
      await deleteTodo(id);
    }
  };

  const handleToggleComplete = async (todo) => {
    const updatedTodo = { ...todo, is_completed: !todo.is_completed };
    await updateTodo(todo.id, updatedTodo);
  };

  const handleFormSubmit = async (formData) => {
    if (currentTodo) {
      await updateTodo(currentTodo.id, formData);
    } else {
      await addTodo(formData);
    }
    // Après l'ajout/modification, rafraîchir la liste complète avec les filtres actuels
    fetchTodos(filters);
  };

  // Le chargement global est vrai si les todos ou les catégories/tags sont en cours de chargement
  const overallLoading = loading || categoriesLoading || tagsLoading;

  return (
    <div className="todos-page container-fluid">
      <h1 className="mb-4 text-primary">My Todos</h1>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <button className="btn btn-primary mb-2 mb-md-0" onClick={() => { setCurrentTodo(null); setShowModal(true); }}>
          <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
          Add New Todo
        </button>
        <div className="flex-grow-1 ms-md-3"> {/* Permet à la barre de recherche de prendre de l'espace */}
          <TodoSearch onSearch={handleFilterChange} currentSearch={filters.search} />
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-info text-white">
          <h5>Filter & Sort Todos</h5>
        </div>
        <div className="card-body">
          <TodoFilterSort
            onFilterSort={handleFilterChange}
            currentFilters={filters}
            categories={categories}
            tags={tags}
          />
        </div>
      </div>

      {overallLoading ? (
        <LoadingSpinner />
      ) : (
        <TodoList
          todos={todos}
          onEdit={handleEdit}
          onDelete={handleDelete}
          onToggleComplete={handleToggleComplete}
          pagination={pagination}
          onPageChange={handlePageChange}
        />
      )}

      <Modal show={showModal} onClose={() => setShowModal(false)} title={currentTodo ? 'Edit Todo' : 'Create New Todo'} size="lg">
        <TodoForm
          todo={currentTodo}
          categories={categories}
          tags={tags}
          onSubmit={handleFormSubmit}
          onCancel={() => setShowModal(false)}
        />
      </Modal>
    </div>
  );
};

export default TodosPage;