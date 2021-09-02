import { combineReducers } from 'redux';
import { all } from 'redux-saga/effects';
import auth, { authSaga } from './auth';
import loading from './loading';
import user, { userSaga } from './user';
import hospital, {hospitalSaga} from './hospital';

const rootReducer = combineReducers({
  auth,
  loading,
  
  user,
  hospital,
});

export function* rootSaga() {
  yield all([authSaga(), userSaga(), hospitalSaga()]);
}

export default rootReducer;
