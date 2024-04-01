import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {loginUser, signUp} from '../../../services/apis/login';
import {setAsyncStorage} from '../../../utils/asyncStorageUtils';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUserSaga(action) {
  let result;
  try {
    result = yield call(loginUser, action.payload);
    setAsyncStorage('token', result.token);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'counter/saveLoginDetails', payload: result});
  }
}

function* signupSaga(action) {
  let result;
  try {
    result = yield call(signUp, action.payload);
  } catch (er) {
    console.log(er);
    result = er;
  } finally {
    yield put({type: 'counter/signedUp', payload: result});
  }
}

function* mySaga() {
  yield takeLatest('counter/loginReducer', loginUserSaga);
  yield takeLatest('counter/onSigningUp', signupSaga);
}

export default mySaga;
