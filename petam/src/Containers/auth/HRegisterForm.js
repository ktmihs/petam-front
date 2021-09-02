import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { changeField, initializeForm, hregister } from '../../modules/auth';
import AuthForm from '../../Components/auth/AuthForm';
import { hcheck } from '../../modules/hospital';
import { withRouter } from 'react-router-dom';

const HRegisterForm = ({ history }) => {
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  const { form, auth, authError, hospital } = useSelector(({ auth, hospital }) => ({
    form: auth.hregister,
    auth: auth.auth,
    authError: auth.authError,
    hospital: hospital.hospital,
  }));
  // 인풋 변경 이벤트 핸들러
  const onChange = (e) => {
    const { value, name } = e.target;
    console.log("onchange: ", value, name)
    dispatch(
      changeField({
        form: 'hregister',
        key: name,
        value,
      }),
    );
  };

  // 폼 등록 이벤트 핸들러
  const onSubmit = (e) => {
    e.preventDefault();
    const {
      username,
        password,
      passwordConfirm,
        name,
      company_number,
      newAddr,
        oldAddr,
      tel,
      openHour,
      openMinute,
      closeHour,
      closeMinute,
      lunchOpenHour,
      lunchOpenMinute,
      lunchCloseHour,
      lunchCloseMinute,
      zipCode,
    } = form;
    // 하나라도 비어있다면
    if ([username, password, passwordConfirm].includes('')) {
      setError('빈 칸을 모두 입력하세요.');
      return;
    }
    // 비밀번호가 일치하지 않는다면
    if (password !== passwordConfirm) {
      setError('비밀번호가 일치하지 않습니다.');
      dispatch(changeField({ form: 'hregister', key: 'password', value: '' }));
      dispatch(
        changeField({ form: 'hregister', key: 'passwordConfirm', value: '' }),
      );
      return;
    }
    console.log("시간 출력 : ", name)
    dispatch(
      hregister({
        username,
        password,
        name,
        company_number,
        newAddr,
        oldAddr,
        tel,
        zipCode,
        openHour,
        openMinute,
        closeHour,
        closeMinute,
        lunchOpenHour,
        lunchOpenMinute,
        lunchCloseHour,
        lunchCloseMinute,
      }),
    );
  };

  // 컴포넌트가 처음 렌더링 될 때 form 을 초기화함
  useEffect(() => {
    dispatch(initializeForm('hregister'));
  }, [dispatch]);

  // 회원가입 성공 / 실패 처리
  useEffect(() => {
    if (authError) {
      // 계정명이 이미 존재할 때
      if (authError.response.status === 409) {
        setError('이미 존재하는 계정명입니다.');
        return;
      }
      // 기타 이유
      setError('회원가입 실패');
      return;
    }

    if (auth) {
      dispatch(hcheck());
    }
  }, [auth, authError, dispatch]);

  // user 값이 잘 설정되었는지 확인
  useEffect(() => {
    if (hospital) {
      history.push('/'); // 홈 화면으로 이동
      try {
        localStorage.setItem('hospital', JSON.stringify(hospital));
      } catch (e) {
        console.log('localStorage is not working');
      }
    }
  }, [history, hospital]);

  return (
    <AuthForm
      type="hregister"
      form={form}
      onChange={onChange}
      onSubmit={onSubmit}
      error={error}
    />
  );
};

export default withRouter(HRegisterForm);
