import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {loginUser, signUp} from '../../../services/apis/login';
import {setAsyncStorage} from '../../../utils/asyncStorageUtils';
import {getExpenseTypesList} from '../../../services/apis/common';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* getUserDetailsSaga(action) {
  let result;
  try {
    result = yield call(loginUser, action.payload);
    setAsyncStorage('token', result.token);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'general/saveLoginDetails', payload: result});
  }
}

function* getExpenseTypesSaga() {
  let result;
  try {
    result = yield call(getExpenseTypesList);
    console.log(result, 'expenstypesaga');
  } catch (er) {
    console.log(er);
    result = er;
  } finally {
    yield put({type: 'general/saveExpenseTypes', payload: result});
  }
}

function* generalSaga() {
  yield takeLatest('general/getExpenseTypes', getExpenseTypesSaga);
}

export default generalSaga;
