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
    <div className="container">
      <div className="page-inner">
        <div className="row">
      <h1 className="mb-4 text">Welcome, {user?.name}! MANAGE YOUR DASHBOARD</h1>
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
              <h5 className="card-title display-4 fs-1 text-white">{totalTodos}</h5>
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
              <h5 className="card-title display-4 fs-1 text-white">{completedTodos}</h5>
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
              <h5 className="card-title display-4 fs-1 text-white">{pendingTodos}</h5>
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
              <h5 className="card-title display-4 fs-1 text-white">{categories.length}</h5>
              <p className="card-text">Organize your tasks with categories.</p>
            </div>
            <div className="card-footer bg-white text-info">
              <Link to="/categories" className="text-decoration-none text-info">Manage categories &raquo;</Link>
            </div>
          </div>
        </div>
      </div>
            

      <div className="row">
        {/* Latest Todos Card */}
        <div className="col-md-6">
          <div className="card card-round">
            <div className="card-header">
              <div className="card-head-row card-tools-still-right">
                <div className="card-title">Latest Todos</div>
                <div className="card-tools">
                  <div className="dropdown">
                      {/* <a className="dropdown-item" href="#">Action</a> */}
                    <Link to="/todos" className="btn btn-outline-primary rounded-pill btn-sm">View All Todos</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                  {/* <!-- Projects table --> */}
                {todos.length > 0 ? (
                  <table className="table align-items-center mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col">Title</th>
                        <th scope="col" className="text-end">Date & Time</th>
                        <th scope="col" className="text-end">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      {todos.slice(0, 5).map((todo) => (
                        <tr key={todo.id} className={` ${todo.is_completed ? 'text-muted text-decoration-line-through' : ''}`}>
                          <th scope="row">{todo.title}</th>
                          <td className="text-center">{todo.createAt || 'date'}</td>
                          <td className="text-end">
                            <span className={`badge ${todo.is_completed ? 'bg-success' : 'bg-secondary'}`}>{todo.is_completed ? 'Completed' : 'Pending'}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-muted">No todos found. Start by creating one!</p>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Latest Categories/Tags Card */}
        <div className="col-md-6">
          <div className="card card-round">
            <div className="card-header">
              <div className="card-head-row card-tools-still-right">
                <div className="card-title">Your Resources</div>
              </div>
            </div>
            <div className="card-body p-0">
              <div className="table-responsive">
                  {/* <!-- Projects table --> */}
                {categories.length > 0 ? (
                  <table className="table align-items-center mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col"><h6><FontAwesomeIcon icon={faFolderOpen} className="me-2" />Your Categories</h6></th>
                      </tr>
                    </thead>
                    <tbody>
                     {categories.slice(0, 3).map(cat => (
                        <tr key={cat.id}>
                          <th scope="row">{cat.name}</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-muted small">No categories yet.</p>
                )}
                <div className="text-end mt-2 me-2">
                  <Link to="/categories" className="btn btn-outline-primary rounded-pill btn-sm mb-4 mt-2">Manage Categories</Link>
                </div>
              </div>
            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                  {/* <!-- Projects table --> */}
                {tags.length > 0 ? (
                  <table className="table align-items-center mb-0">
                    <thead className="thead-light">
                      <tr>
                        <th scope="col"><h6><FontAwesomeIcon icon={faTags} className="me-2" />Your Tags</h6></th>
                      </tr>
                    </thead>
                    <tbody>
                    {tags.slice(0, 3).map(tag => (
                        <tr key={tag.id}>
                          <th scope="row">{tag.name}</th>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-muted small">No tags yet.</p>
                )}
                <div className="text-end mt-2 me-2">
                  <Link to="/tags" className="btn btn-outline-primary rounded-pill btn-sm mb-4 mt-2">Manage Tags</Link>
                </div>
              </div>
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