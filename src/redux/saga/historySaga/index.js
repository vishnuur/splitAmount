import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  getGroupPaymentData,
  historyList,
  savePaymentData,
} from '../../../services/apis/history';

function* paymentListSaga(action) {
  let result;
  try {
    result = yield call(getGroupPaymentData, action.payload);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'history/saveHistory', payload: result});
  }
}

function* savePaymentSaga(action) {
  let result;
  try {
    result = yield call(savePaymentData, action.payload);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'history/dataAddedStatus', payload: result});
  }
}

function* historySaga() {
  yield takeEvery('history/saveAddedData', savePaymentSaga);
  yield takeEvery('history/getHistory', paymentListSaga);
}

export default historySaga;
