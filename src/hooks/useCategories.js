import { useContext } from 'react';
import { CategoryContext } from '../contexts/CategoryContext';

export const useCategories = () => {
  return useContext(CategoryContext);
};