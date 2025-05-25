import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as categoryService from '../services/categoryService';
import Alert from '../components/Common/Alert';

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchCategories = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await categoryService.getCategories();
      setCategories(data.data);
    } catch (err) {
      console.error("Failed to fetch categories:", err);
      setError('Failed to load categories. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const addCategory = async (categoryData) => {
    setLoading(true);
    setError(null);
    try {
      const newCategory = await categoryService.createCategory(categoryData);
      setCategories((prevCategories) => [...prevCategories, newCategory.data]);
      setSuccessMessage('Category added successfully!');
      return newCategory;
    } catch (err) {
      console.error("Failed to add category:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add category. Please check your input.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateCategory = async (id, categoryData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedCategory = await categoryService.updateCategory(id, categoryData);
      setCategories((prevCategories) =>
        prevCategories.map((cat) => (cat.id === id ? updatedCategory.data : cat))
      );
      setSuccessMessage('Category updated successfully!');
      return updatedCategory;
    } catch (err) {
      console.error("Failed to update category:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update category. Please check your input.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteCategory = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await categoryService.deleteCategory(id);
      setCategories((prevCategories) => prevCategories.filter((cat) => cat.id !== id));
      setSuccessMessage('Category deleted successfully!');
    } catch (err) {
      console.error("Failed to delete category:", err);
      setError('Failed to delete category. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <CategoryContext.Provider
      value={{
        categories,
        loading,
        error,
        successMessage,
        fetchCategories,
        addCategory,
        updateCategory,
        deleteCategory,
        clearSuccessMessage: () => setSuccessMessage(null),
        clearError: () => setError(null),
      }}
    >
      {successMessage && <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />}
      {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategories = () => useContext(CategoryContext);