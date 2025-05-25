import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const ResetPasswordForm = () => {
  const { token } = useParams(); // Récupère le token de l'URL
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { resetPassword } = useAuth();

  useEffect(() => {
    // Vous pourriez vouloir extraire l'email du token si votre backend le permet,
    // ou laisser l'utilisateur le saisir. Ici, nous le demandons.
    // L'e-mail est également un champ obligatoire dans la requête de réinitialisation de Laravel.
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      await resetPassword({
        token,
        email,
        password,
        password_confirmation: passwordConfirmation,
      });
      // La redirection vers /login est gérée par AuthContext après succès
    } catch (err) {
      const errors = err.response?.data?.errors;
      let errorMessage = 'Failed to reset password. Please check your input.';
      if (errors) {
        errorMessage = Object.values(errors).flat().join('\n');
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }
      setFormError(errorMessage);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4 text-primary">Reset Password</h2>
        {formError && <div className="alert alert-danger">{formError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="emailInput" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="emailInput"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordInput" className="form-label">New Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordInput"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="passwordConfirmationInput" className="form-label">Confirm New Password</label>
            <input
              type="password"
              className="form-control"
              id="passwordConfirmationInput"
              value={passwordConfirmation}
              onChange={(e) => setPasswordConfirmation(e.target.value)}
              required
            />
          </div>
          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary" disabled={formLoading}>
              {formLoading ? <LoadingSpinner size="sm" text="Resetting..." /> : 'Reset Password'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResetPasswordForm;