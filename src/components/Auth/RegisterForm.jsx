import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const RegisterForm = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      await register({ name, email, password, password_confirmation: passwordConfirmation });
    } catch (err) {
      console.log(err.response); // Debugging: voir la structure de l'erreur
      console.log("API Base URL:", import.meta.env.VITE_API_URL);
      const errors = err.response?.data?.errors;
      let errorMessage = 'Registration failed. Please check your input.';
      if (errors) {
        errorMessage = Object.values(errors).flat().join('\n'); // Concatène tous les messages d'erreur de validation
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
        <h2 className="card-title text-center mb-4 text-primary">Register</h2>
        {formError && <div className="alert alert-danger">{formError}</div>}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="nameInput" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="nameInput"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>
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
            <label htmlFor="passwordInput" className="form-label">Password</label>
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
            <label htmlFor="passwordConfirmationInput" className="form-label">Confirm Password</label>
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
              {formLoading ? <LoadingSpinner size="sm" text="Registering..." /> : 'Register'}
            </button>
          </div>
          <div className="text-center">
            <Link to="/login">Already have an account? Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;