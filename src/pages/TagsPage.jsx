import React, { useState } from 'react';
import { useTags } from '../hooks/useTags';
import LoadingSpinner from '../components/Common/LoadingSpinner';
import Modal from '../components/Common/Modal';
import TagForm from '../components/Tag/TagForm';
import TagList from '../components/Tag/TagList';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';

const TagsPage = () => {
  const { tags, addTag, updateTag, deleteTag, loading, error } = useTags();
  const [showModal, setShowModal] = useState(false);
  const [currentTag, setCurrentTag] = useState(null);

  const handleEdit = (tag) => {
    setCurrentTag(tag);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this tag?')) {
      await deleteTag(id);
    }
  };

  const handleFormSubmit = async (formData) => {
    if (currentTag) {
      await updateTag(currentTag.id, formData);
    } else {
      await addTag(formData);
    }
    setShowModal(false);
    setCurrentTag(null);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return <div className="alert alert-danger">{error}</div>;
  }

  return (
    <div className="container">
      <div className="page-inner">
          <h1 className="mb-4 text-primary">My Tags</h1>
          
          <button className="btn btn-primary mb-4" onClick={() => { setCurrentTag(null); setShowModal(true); }}>
            <FontAwesomeIcon icon={faPlusCircle} className="me-2" />
            Add New Tag
          </button>

          <TagList tags={tags} onEdit={handleEdit} onDelete={handleDelete} />

          <Modal show={showModal} onClose={() => setShowModal(false)} title={currentTag ? 'Edit Tag' : 'Create New Tag'}>
            <TagForm tag={currentTag} onSubmit={handleFormSubmit} onCancel={() => setShowModal(false)} />
          </Modal>
      </div>
    </div>
  );
};

export default TagsPage;