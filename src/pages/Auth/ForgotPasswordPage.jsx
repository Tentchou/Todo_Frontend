import React from 'react';
import ForgotPasswordForm from '../../components/Auth/ForgotPasswordForm';

const ForgotPasswordPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-8 col-lg-5">
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;