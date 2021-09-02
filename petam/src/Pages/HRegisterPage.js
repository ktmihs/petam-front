import React from 'react';
import AuthTemplate from '../Components/auth/AuthTemplate';
import HRegisterForm from '../Containers/auth/HRegisterForm';
import Content from '../Components/Content';

const RegisterPage = () => {
  return (
    <Content>
      <AuthTemplate>
        <HRegisterForm />
      </AuthTemplate>
    </Content>
  );
};

export default RegisterPage;
