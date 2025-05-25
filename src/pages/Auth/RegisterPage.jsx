import React from 'react';
import RegisterForm from '../../components/Auth/RegisterForm';

const RegisterPage = () => {
  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="col-12 col-md-8 col-lg-5">
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage;