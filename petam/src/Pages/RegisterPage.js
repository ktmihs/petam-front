import React from 'react';
import AuthTemplate from '../Components/auth/AuthTemplate';
import RegisterForm from '../Containers/auth/RegisterForm';
import Content from "../Components/Content";

const RegisterPage = () => {
  return (
    <Content>
      <AuthTemplate>
        <RegisterForm />
      </AuthTemplate>
    </Content>
  );
};

export default RegisterPage;
