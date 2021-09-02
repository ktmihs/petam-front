import React from 'react';
import AuthTemplate from '../Components/auth/AuthTemplate';
import LoginForm from '../Containers/auth/LoginForm';
import Content from '../Components/Content';

const LoginPage = () => {
  return (
    <>
    <Content>
    <AuthTemplate>
      <LoginForm />
      </AuthTemplate>
      </Content>
      </>
  );
};

export default LoginPage;
