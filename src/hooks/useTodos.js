import { useContext } from 'react';
import { TodoContext } from '../contexts/TodoContext';

export const useTodos = () => {
  return useContext(TodoContext);
};