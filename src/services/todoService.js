
import api from '../utils/api';

export const getTodos = async (filters = {}) => {
  const queryString = new URLSearchParams(filters).toString();
  const response = await api.get(`/todos?${queryString}`);
  return response.data; // Renvoie data (todos) et meta (pagination)
};

export const getTodo = async (id) => {
  const response = await api.get(`/todos/${id}`);
  return response.data;
};

export const createTodo = async (todoData) => {
  const response = await api.post('/todos', todoData);
  return response.data;
};

export const updateTodo = async (id, todoData) => {
  const response = await api.put(`/todos/${id}`, todoData);
  return response.data;
};

export const deleteTodo = async (id) => {
  const response = await api.delete(`/todos/${id}`);
  return response.data;
};