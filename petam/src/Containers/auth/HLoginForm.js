import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { changeField, initializeForm, hlogin } from '../../modules/auth';
import AuthForm from '../../Components/auth/AuthForm';
import { hcheck } from '../../modules/hospital';

const HLoginForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, hospital } = useSelector(({ auth, hospital }) => ({
    form: auth.hlogin,
    auth: auth.auth,
    authError: auth.authError,
    hospital: hospital.hospital,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    dispatch(
      changeField({
        form: 'hlogin',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const { company_number, password } = form;
    dispatch(hlogin({ company_number, password }));
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('hlogin'));
  }, [dispatch]);

  useEffect(() => {
      if (authError) {
      setError('병원 로그인 실패');
      return;
    }
    if (auth) {
      dispatch(hcheck());
    }
  }, [auth, authError, dispatch]);

    useEffect(() => {
        if (hospital) {
            history.push('/');
            try {
                localStorage.setItem('hospital', JSON.stringify(hospital));
            } catch (e) {
                console.log('localStorage is not working');
            }
        }
    }, [history, hospital]);

  return (
    <AuthForm
      type="hlogin"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(HLoginForm);
