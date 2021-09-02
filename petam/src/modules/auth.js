import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import { takeLatest } from 'redux-saga/effects';
import createRequestSaga, {
  createRequestActionTypes
} from '../lib/createRequestSaga';
import * as authAPI from '../lib/api/auth';

const CHANGE_FIELD = 'auth/CHANGE_FIELD';
const INITIALIZE_FORM = 'auth/INITIALIZE_FORM';

const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createRequestActionTypes(
  'auth/REGISTER'
);
const [HREGISTER, HREGISTER_SUCCESS, HREGISTER_FAILURE] =
  createRequestActionTypes('hospital/HREGISTER');

const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createRequestActionTypes(
  'auth/LOGIN'
);
const [HLOGIN, HLOGIN_SUCCESS, HLOGIN_FAILURE] =
  createRequestActionTypes('auth/HLOGIN');

export const changeField = createAction(
  CHANGE_FIELD,
  ({ form, key, value }) => ({
    form, // register , login
    key, // username, password, passwordConfirm
    value // 실제 바꾸려는 값
  })
);
export const initializeForm = createAction(INITIALIZE_FORM, form => form); // register / login /hregister
export const register = createAction(REGISTER, ({ username, password, name, email, phone }) => ({
  username,
  password,
  name,
  email,
  phone
}));
export const hregister = createAction(
  HREGISTER,
  ({
    username,
    password,
    company_number,
    tel,
    name,
    newAddr,
    oldAddr,
    openHour,
    openMinute,
    closeHour,
    closeMinute,
    lunchOpenHour,
    lunchOpenMinute,
    lunchCloseHour,
    lunchCloseMinute,
    zipCode,
  }) => ({
    username,
    password,
    name,
    company_number,
    tel,
    newAddr,
    oldAddr,
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
export const login = createAction(LOGIN, ({ username, password }) => ({
  username,
  password
}));

export const hlogin = createAction(HLOGIN, ({ company_number, password }) => ({
  company_number,
  password,
}));
// saga 생성
const registerSaga = createRequestSaga(REGISTER, authAPI.register);
const hregisterSaga = createRequestSaga(HREGISTER, authAPI.hregister);
const loginSaga = createRequestSaga(LOGIN, authAPI.login);
const hloginSaga = createRequestSaga(HLOGIN, authAPI.hlogin);
export function* authSaga() {
  yield takeLatest(REGISTER, registerSaga);
  yield takeLatest(HREGISTER, hregisterSaga);
  yield takeLatest(LOGIN, loginSaga);
  yield takeLatest(HLOGIN, hloginSaga);
}

const initialState = {
  register: {
    username: '',
    password: '',
    passwordConfirm: '',
    name: '',
    email: '',
    phone: '',
  },
  hregister: {
    username: '',
    name: '',
    password: '',
    passwordConfirm: '',
    company_number: '',
    new_addr: '',
    tel: '',
    old_addr: 1,
    zip_code: 1,
    openHour: 1,
    openMinute: 1,
    closeHour: 1,
    closeMinute: 1,
    lunchOpenHour: 1,
    lunchOpenMinute: 1,
    lunchCloseHour: 1,
    lunchCloseMinute: 1,
  },
  login: {
    username: '',
    password: '',
  },
  hlogin: {
    // username: '',
    company_number: '',
    password: '',
  },
  auth: null,
  authError: null,
};

const auth = handleActions(
  {
    [CHANGE_FIELD]: (state, { payload: { form, key, value } }) =>
      produce(state, (draft) => {
        draft[form][key] = value; // 예: state.register.username을 바꾼다
      }),
    [INITIALIZE_FORM]: (state, { payload: form }) => ({
      ...state,
      [form]: initialState[form],
      authError: null, // 폼 전환 시 회원 인증 에러 초기화
    }),
    // 개인 회원가입 성공
    [REGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 개인 회원가입 실패
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 병원 회원가입 성공
    [HREGISTER_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 병원 회원가입 실패
    [HREGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 로그인 성공
    [LOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 로그인 실패
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
    // 병원 로그인 성공
    [HLOGIN_SUCCESS]: (state, { payload: auth }) => ({
      ...state,
      authError: null,
      auth,
    }),
    // 병원 로그인 실패
    [HLOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      authError: error,
    }),
  },
  initialState,
);

export default auth;
