import { createAction, handleActions } from 'redux-actions';
import { takeLatest, call } from 'redux-saga/effects';
import * as authAPI from '../lib/api/auth';
import createRequestSaga, {
  createRequestActionTypes,
} from '../lib/createRequestSaga';

const TEMP_SET_HOSPITAL = 'hospital/TEMP_SET_HOSPITAL'; // 새로고침 이후 임시 로그인 처리
// 회원 정보 확인
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] =
  createRequestActionTypes('hospital/CHECK');
const LOGOUT = 'hospital/LOGOUT';

export const tempSetHospital = createAction(TEMP_SET_HOSPITAL, (hospital) => hospital);
export const hcheck = createAction(CHECK);
export const hlogout = createAction(LOGOUT);

const checkSaga = createRequestSaga(CHECK, authAPI.check);

function checkFailureSaga() {
  try {
    localStorage.removeItem('hospital'); // localStorage 에서 user 제거하고
  } catch (e) {
    console.log('localStorage is not working');
  }
}

function* logoutSaga() {
  try {
    yield call(authAPI.logout); // logout API 호출
    localStorage.removeItem('hospital'); // localStorage 에서 user 제거
  } catch (e) {
    console.log(e);
  }
}

export function* hospitalSaga() {
  yield takeLatest(CHECK, checkSaga);
  yield takeLatest(CHECK_FAILURE, checkFailureSaga);
  yield takeLatest(LOGOUT, logoutSaga);
}

const initialState = {
  hospital: null,
  checkError: null,
};

export default handleActions(
  {
    [TEMP_SET_HOSPITAL]: (state, { payload: hospital }) => ({
      ...state,
      hospital,
    }),
    [CHECK_SUCCESS]: (state, { payload: hospital }) => ({
      ...state,
      hospital,
      checkError: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      hospital: null,
      checkError: error,
    }),
    [LOGOUT]: (state) => ({
      ...state,
      hospital: null,
    }),
  },
  initialState,
);
