import React, { createContext, useContext, useState, useCallback } from 'react';
import * as todoService from '../services/todoService';
import Alert from '../components/Common/Alert'; // Utiliser Alert ici pour les messages de succès/erreur

export const TodoContext = createContext();

export const TodoProvider = ({ children }) => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({});
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchTodos = useCallback(async (filters) => {
    setLoading(true); // <== Commence toujours par mettre loading à true
    setError(null);
    try {
      const response = await todoService.getTodos(filters);
      setTodos(response.data);
      setPagination(response.pagination || {});
    } catch (err) {
      console.error("Failed to fetch todos:", err);
      setError('Failed to load todos.');
    } finally {
      setLoading(false); // <== Et finit toujours par mettre loading à false
    }
  }, []);

  const addTodo = async (todoData) => {
    setLoading(true);
    setError(null);
    try {
      const newTodo = await todoService.createTodo(todoData);
      // Si la pagination est active, on ne veut pas ajouter la todo au début
      // mais plutôt rafraîchir la liste complète avec les filtres actuels.
      // Ou bien, si on est sûr que la nouvelle todo correspond aux filtres, l'ajouter.
      // Pour la simplicité, on va juste la préfixer et rafraîchir en arrière-plan.
      setTodos((prevTodos) => [newTodo.data, ...prevTodos.slice(0, pagination.per_page -1)]); // Ajoute et tronque si nécessaire
      setSuccessMessage('Todo added successfully!');
      return newTodo;
    } catch (err) {
      console.error("Failed to add todo:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add todo. Please check your input.');
      }
      throw err; // Relaunch error for form to catch
    } finally {
      setLoading(false);
    }
  };

  const updateTodo = async (id, todoData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTodo = await todoService.updateTodo(id, todoData);
      setTodos((prevTodos) =>
        prevTodos.map((todo) => (todo.id === id ? updatedTodo.data : todo))
      );
      setSuccessMessage('Todo updated successfully!');
      return updatedTodo;
    } catch (err) {
      console.error("Failed to update todo:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update todo. Please check your input.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTodo = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await todoService.deleteTodo(id);
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
      setSuccessMessage('Todo deleted successfully!');
    } catch (err) {
      console.error("Failed to delete todo:", err);
      setError('Failed to delete todo. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TodoContext.Provider
      value={{
        todos,
        loading,
        error,
        pagination,
        successMessage,
        fetchTodos,
        addTodo,
        updateTodo,
        deleteTodo,
        clearSuccessMessage: () => setSuccessMessage(null),
        clearError: () => setError(null),
      }}
    >
      {successMessage && <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />}
      {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}
      {children}
    </TodoContext.Provider>
  );
};

export const useTodos = () => useContext(TodoContext);