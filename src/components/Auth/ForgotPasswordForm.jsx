import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import LoadingSpinner from '../Common/LoadingSpinner';

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState('');
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');
  const { forgotPassword } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormLoading(true);
    setFormError('');
    setFormSuccess('');
    try {
      const response = await forgotPassword(email);
      setFormSuccess(response.message || 'Password reset link sent to your email.');
    } catch (err) {
      const message = err.response?.data?.message || 'Failed to send reset link. Please try again.';
      setFormError(message);
    } finally {
      setFormLoading(false);
    }
  };

  return (
    <div className="card shadow-sm">
      <div className="card-body p-4">
        <h2 className="card-title text-center mb-4 text-primary">Forgot Password</h2>
        {formError && <div className="alert alert-danger">{formError}</div>}
        {formSuccess && <div className="alert alert-success">{formSuccess}</div>}
        <p className="text-center text-muted">Enter your email address and we'll send you a link to reset your password.</p>
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
          <div className="d-grid gap-2 mb-3">
            <button type="submit" className="btn btn-primary" disabled={formLoading}>
              {formLoading ? <LoadingSpinner size="sm" text="Sending..." /> : 'Send Reset Link'}
            </button>
          </div>
          <div className="text-center">
            <Link to="/login">Back to Login</Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ForgotPasswordForm;