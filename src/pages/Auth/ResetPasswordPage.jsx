import React from 'react';
import ResetPasswordForm from '../../components/Auth/ResetPasswordForm';

const ResetPasswordPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-8 col-lg-5">
        <ResetPasswordForm />
      </div>
    </div>
  );
};

export default ResetPasswordPage;