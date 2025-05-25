import React, { useState } from 'react';
import { useCategories } from '../hooks/useCategories';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import Modal from '../components/Common/Modal';
import CategoryForm from '../components/Category/CategoryForm';
import CategoryList from '../components/Category/CategoryList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const CategoriesPage = () => {
  const { categories, addCategory, updateCategory, deleteCategory, loading, error } = useCategories();
  const [showModal, setShowModal] = useState(false);
  const [currentCategory, setCurrentCategory] = useState(null);

  const handleEdit = (category) => {
    setCurrentCategory(category);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this category? All associated todos will lose their category.')) {
      await deleteCategory(id);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (currentCategory) {
      await updateCategory(currentCategory.id, formData);
    } else {
      await addCategory(formData);
    }
    setShowModal(false);
    setCurrentCategory(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="categories-page container-fluid">
      <h1 className="mb-4 text-primary">My Categories</h1>

      <button className="btn btn-primary mb-4" onClick={() => { setCurrentCategory(null); setShowModal(true); }}>
        <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
        Add New Category
      </button>

      <CategoryList categories={categories} onEdit={handleEdit} onDelete={handleDelete} />

      <Modal show={showModal} onClose={() => setShowModal(false)} title={currentCategory ? 'Edit Category' : 'Create New Category'}>
        <CategoryForm category={currentCategory} onSubmit={handleFormSubmit} onCancel={() => setShowModal(false)} />
      </Modal>
    </div>
  );
};

export default CategoriesPage;