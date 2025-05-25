import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    try {
      await login({ email, password });
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setFormError(message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4 text-primary">Login</h2>
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
          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary" disabled={formLoading}>
              {formLoading ? <LoadingSpinner size="sm" text="Logging in..." /> : 'Login'}
            </button>
          </div>
          <div className="text-center">
            <Link to="/forgot-password" className="d-block mb-2">Forgot Password?</Link>
            <Link to="/register">Don't have an account? Register</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;