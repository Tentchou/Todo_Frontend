import React from 'react';
import { useAuth } from '../contexts/AuthContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCog, faEnvelope, faSignature, faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

const SettingsPage = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!user) {
    return <div className="alert alert-warning text-center">Please log in to view your settings.</div>;
  }

  return (
    <div className="container">
      <div className="page-inner">
      <h1 className="mb-4 text-primary"><FontAwesomeIcon icon={faUserCog} className="me-2" />User Settings</h1>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5>Profile Information</h5>
        </div>
        <div className="card-body">
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-muted">
              <FontAwesomeIcon icon={faSignature} className="me-2" />Name:
            </label>
            <div className="col-sm-9">
              <p className="form-control-plaintext">{user.name}</p>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-muted">
              <FontAwesomeIcon icon={faEnvelope} className="me-2" />Email:
            </label>
            <div className="col-sm-9">
              <p className="form-control-plaintext">{user.email}</p>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-muted">
              <FontAwesomeIcon icon={faCalendarAlt} className="me-2" />Joined:
            </label>
            <div className="col-sm-9">
              <p className="form-control-plaintext">{new Date(user.created_at).toLocaleDateString()}</p>
            </div>
          </div>
          <div className="mb-3 row">
            <label className="col-sm-3 col-form-label text-muted">Email Verified:</label>
            <div className="col-sm-9">
              <p className="form-control-plaintext">
                {user.email_verified_at ? 'Yes' : 'No'}
                {/* Optionnel: bouton pour renvoyer la vérification si non vérifié */}
              </p>
            </div>
          </div>
        </div>
        <div className="card-footer text-end">
            {/* Future: Bouton pour Modifier le profil / changer le mot de passe */}
            {/* <button className="btn btn-outline-secondary btn-sm">Edit Profile</button> */}
        </div>
      </div>
      </div>

      {/* Vous pouvez ajouter ici d'autres sections comme "Change Password", "Manage Preferences", etc. */}
    </div>
  );
};

export default SettingsPage;