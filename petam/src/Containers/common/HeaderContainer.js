import React from 'react';
import { useHistory } from 'react-router';
import { useSelector, useDispatch } from 'react-redux';
import Header from '../../Components/common/Header';
import { logout } from '../../modules/user';
import { hlogout } from '../../modules/hospital';

const HeaderContainer = () => {
  const location = useHistory();
  const { user, hospital } = useSelector(({ user, hospital}) => ({ user: user.user, hospital: hospital.hospital}));
  const dispatch = useDispatch();
  const onLogout = () => {
    dispatch(logout());
    location.push("/");
  };
   const onHLogout = () => {
     dispatch(hlogout());
     location.push('/');
   };
  return (
    <>
      {(!user && !hospital) && <Header />}
      {user && <Header user={user} onLogout={onLogout} />}
      {hospital && <Header user={hospital} onLogout={onHLogout}></Header>}
    </>
  );
};

export default HeaderContainer;
