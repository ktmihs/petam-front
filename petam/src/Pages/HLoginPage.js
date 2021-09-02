import React from 'react';
import AuthTemplate from '../Components/auth/AuthTemplate';
import HLoginForm from '../Containers/auth/HLoginForm';
import Content from '../Components/Content';

const LoginPage = () => {
  return (
    <>

      <Content>
        <AuthTemplate>
          <HLoginForm />
        </AuthTemplate>
      </Content>
    </>
  );
};

export default LoginPage;
