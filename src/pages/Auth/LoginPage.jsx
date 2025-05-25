import React from 'react';
import LoginForm from '../../components/Auth/LoginForm';

const LoginPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-8 col-lg-5">
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;