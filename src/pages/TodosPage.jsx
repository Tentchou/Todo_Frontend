// TodosPage.jsx
import React, { useState, useEffect, useRef } from 'react'; // <== N'oubliez pas d'importer useRef
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
import isEqual from 'lodash.isequal'; // <== Importez isEqual
// ... (le reste de vos imports)

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

  // NOUVEAU : Ce ref va nous aider à distinguer le premier rendu
  const lastFiltersRef = useRef();


  useEffect(() => {
    // === DÉBUT DE LA LOGIQUE DE DÉTECTION DE CHANGEMENT PROFOND ===
    // Si lastFiltersRef.current existe ET que les filtres actuels sont D.E.E.P.E.M.E.N.T égaux
    // aux filtres que nous avons traités la dernière fois, ALORS ne faites rien.
    if (lastFiltersRef.current && isEqual(lastFiltersRef.current, filters)) {
      console.log("Filters are deeply equal, skipping fetch.");
      return; // Sortir du useEffect pour éviter la boucle
    }
    // === FIN DE LA LOGIQUE DE DÉTECTION DE CHANGEMENT PROFOND ===

    console.log("Filters changed (deeply or first mount), performing fetch.");
    fetchTodos(filters);

    // Mettez à jour la référence des derniers filtres traités pour le prochain rendu
    lastFiltersRef.current = filters;

  }, [filters, fetchTodos]); // Gardez filters et fetchTodos comme dépendances


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

  // TRÈS IMPORTANT : Assurez-vous que cette ligne est bien supprimée !
  const handleFormSubmit = async (formData) => {
    if (currentTodo) {
      await updateTodo(currentTodo.id, formData);
    } else {
      await addTodo(formData);
    }
    // L'appel à fetchTodos(filters) ICI était très probablement la cause de la boucle
    // en conjonction avec le useEffect. Supprimez-le !
    // fetchTodos(filters); // <-- Supprimez cette ligne si elle est présente
    setShowModal(false);
    setCurrentTodo(null); // Réinitialiser currentTodo après la soumission
  };

  // Le chargement global est vrai si les todos ou les catégories/tags sont en cours de chargement
  const overallLoading = loading || categoriesLoading || tagsLoading;

  return (
    <div className="container">
      <div className='page-inner'>
      <h1 className="mb-4 text">My Todos</h1>

      <div className="d-flex justify-content-between align-items-center mb-4 flex-wrap">
        <button className="btn btn-outline-primary rounded-pill mb-2 mb-md-0" onClick={() => { setCurrentTodo(null); setShowModal(true); }}>
          <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
          Add New Todo
        </button>
        <div className="flex-grow-1 ms-md-3">
          <TodoSearch onSearch={handleFilterChange} currentSearch={filters.search} />
        </div>
      </div>

      <div className="card mb-4 shadow-sm">
        <div className="card-header bg-primary rounded-3 text-white">
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
    </div>
  );
};

export default TodosPage;