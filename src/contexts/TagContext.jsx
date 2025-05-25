import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import * as tagService from '../services/tagService';
import Alert from '../components/Common/Alert';

export const TagContext = createContext();

export const TagProvider = ({ children }) => {
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const fetchTags = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await tagService.getTags();
      setTags(data.data);
    } catch (err) {
      console.error("Failed to fetch tags:", err);
      setError('Failed to load tags. Please try again.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTags();
  }, [fetchTags]);

  const addTag = async (tagData) => {
    setLoading(true);
    setError(null);
    try {
      const newTag = await tagService.createTag(tagData);
      setTags((prevTags) => [...prevTags, newTag.data]);
      setSuccessMessage('Tag added successfully!');
      return newTag;
    } catch (err) {
      console.error("Failed to add tag:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to add tag. Please check your input.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const updateTag = async (id, tagData) => {
    setLoading(true);
    setError(null);
    try {
      const updatedTag = await tagService.updateTag(id, tagData);
      setTags((prevTags) =>
        prevTags.map((tag) => (tag.id === id ? updatedTag.data : tag))
      );
      setSuccessMessage('Tag updated successfully!');
      return updatedTag;
    } catch (err) {
      console.error("Failed to update tag:", err);
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Failed to update tag. Please check your input.');
      }
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const deleteTag = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await tagService.deleteTag(id);
      setTags((prevTags) => prevTags.filter((tag) => tag.id !== id));
      setSuccessMessage('Tag deleted successfully!');
    } catch (err) {
      console.error("Failed to delete tag:", err);
      setError('Failed to delete tag. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <TagContext.Provider
      value={{
        tags,
        loading,
        error,
        successMessage,
        fetchTags,
        addTag,
        updateTag,
        deleteTag,
        clearSuccessMessage: () => setSuccessMessage(null),
        clearError: () => setError(null),
      }}
    >
      {successMessage && <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />}
      {error && <Alert type="danger" message={error} onClose={() => setError(null)} />}
      {children}
    </TagContext.Provider>
  );
};

export const useTags = () => useContext(TagContext);