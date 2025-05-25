import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useTodos } from '../hooks/useTodos';
import { useCategories } from '../hooks/useCategories';
import { useTags } from '../hooks/useTags';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faClock, faTasks, faFolderOpen, faTags } from '@fortawesome/free-solid-svg-icons';

const DashboardPage = () => {
  const { user } = useAuth();
  const { todos, loading: todosLoading, error: todosError } = useTodos();
  const { categories, loading: categoriesLoading, error: categoriesError } = useCategories();
  const { tags, loading: tagsLoading, error: tagsError } = useTags();

  const loading = todosLoading || categoriesLoading || tagsLoading;
  const error = todosError || categoriesError || tagsError;

  const completedTodos = todos.filter(todo => todo.is_completed).length;
  const pendingTodos = todos.filter(todo => !todo.is_completed).length;
  const totalTodos = todos.length;

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="alert alert-danger">Error: {error}</div>;
  }

  return (
    <div className="dashboard-page container-fluid">
      <h1 className="mb-4 text-primary">Welcome, {user?.name}!</h1>
      <p className="lead text-muted">Here's a quick overview of your tasks and resources.</p>

      <div className="row g-4 mb-5">
        {/* Widget Total Todos */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card text-white bg-primary h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              Total Todos
              <FontAwesomeIcon icon={faTasks} size="lg" />
            </div>
            <div className="card-body">
              <h5 className="card-title display-4">{totalTodos}</h5>
              <p className="card-text">All tasks you have created.</p>
            </div>
            <div className="card-footer bg-white text-primary">
              <Link to="/todos" className="text-decoration-none text-primary">View all &raquo;</Link>
            </div>
          </div>
        </div>

        {/* Widget Completed Todos */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card text-white bg-success h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              Completed Todos
              <FontAwesomeIcon icon={faCheckCircle} size="lg" />
            </div>
            <div className="card-body">
              <h5 className="card-title display-4">{completedTodos}</h5>
              <p className="card-text">Tasks that are marked as done.</p>
            </div>
            <div className="card-footer bg-white text-success">
              <Link to="/todos?is_completed=true" className="text-decoration-none text-success">View completed &raquo;</Link>
            </div>
          </div>
        </div>

        {/* Widget Pending Todos */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card text-white bg-warning h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              Pending Todos
              <FontAwesomeIcon icon={faClock} size="lg" />
            </div>
            <div className="card-body">
              <h5 className="card-title display-4">{pendingTodos}</h5>
              <p className="card-text">Tasks still waiting to be done.</p>
            </div>
            <div className="card-footer bg-white text-warning">
              <Link to="/todos?is_completed=false" className="text-decoration-none text-warning">View pending &raquo;</Link>
            </div>
          </div>
        </div>

        {/* Widget Categories */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card text-white bg-info h-100 shadow-sm">
            <div className="card-header d-flex justify-content-between align-items-center">
              Total Categories
              <FontAwesomeIcon icon={faFolderOpen} size="lg" />
            </div>
            <div className="card-body">
              <h5 className="card-title display-4">{categories.length}</h5>
              <p className="card-text">Organize your tasks with categories.</p>
            </div>
            <div className="card-footer bg-white text-info">
              <Link to="/categories" className="text-decoration-none text-info">Manage categories &raquo;</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="row g-4">
        {/* Latest Todos Card */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-dark text-white">
              <h5>Latest Todos</h5>
            </div>
            <div className="card-body">
              {todos.length > 0 ? (
                <ul className="list-group list-group-flush">
                  {todos.slice(0, 5).map((todo) => (
                    <li key={todo.id} className={`list-group-item d-flex justify-content-between align-items-center ${todo.is_completed ? 'text-muted text-decoration-line-through' : ''}`}>
                      <span>{todo.title}</span>
                      <span className={`badge ${todo.is_completed ? 'bg-success' : 'bg-secondary'}`}>
                        {todo.is_completed ? 'Completed' : 'Pending'}
                      </span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-center text-muted">No todos found. Start by creating one!</p>
              )}
            </div>
            <div className="card-footer text-center bg-light">
                <Link to="/todos" className="btn btn-outline-primary btn-sm">View All Todos</Link>
            </div>
          </div>
        </div>

        {/* Latest Categories/Tags Card */}
        <div className="col-lg-6">
          <div className="card shadow-sm h-100">
            <div className="card-header bg-dark text-white">
              <h5>Your Resources</h5>
            </div>
            <div className="card-body">
              <div className="mb-4">
                <h6><FontAwesomeIcon icon={faFolderOpen} className="me-2" />Your Categories</h6>
                {categories.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {categories.slice(0, 3).map(cat => (
                      <li key={cat.id} className="list-group-item d-flex justify-content-between align-items-center py-1">
                        {cat.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small">No categories yet.</p>
                )}
                <div className="text-end mt-2">
                  <Link to="/categories" className="btn btn-outline-info btn-sm">Manage Categories</Link>
                </div>
              </div>

              <div>
                <h6><FontAwesomeIcon icon={faTags} className="me-2" />Your Tags</h6>
                {tags.length > 0 ? (
                  <ul className="list-group list-group-flush">
                    {tags.slice(0, 3).map(tag => (
                      <li key={tag.id} className="list-group-item d-flex justify-content-between align-items-center py-1">
                        {tag.name}
                      </li>
                    ))}
                  </ul>
                ) : (
                  <p className="text-muted small">No tags yet.</p>
                )}
                 <div className="text-end mt-2">
                  <Link to="/tags" className="btn btn-outline-info btn-sm">Manage Tags</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;