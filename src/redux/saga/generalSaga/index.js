import {call, put, takeLatest} from 'redux-saga/effects';
import {getExpenseTypesList} from '../../../services/apis/common';

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
