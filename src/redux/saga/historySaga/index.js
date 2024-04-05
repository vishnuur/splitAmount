import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  getBasicChartData,
  getGroupPaymentData,
  historyList,
  savePaymentData,
} from '../../../services/apis/history';

function* paymentListSaga(action) {
  yield put({type: 'general/setLoading', payload: true});
  let result;
  try {
    result = yield call(getGroupPaymentData, action.payload);
  } catch (e) {
    yield put({type: 'general/setLoading', payload: false});
  } finally {
    yield put({type: 'history/saveHistory', payload: result});
    yield put({type: 'general/setLoading', payload: false});
  }
}

function* savePaymentSaga(action) {
  yield put({type: 'general/setLoading', payload: true});
  let result;
  try {
    result = yield call(savePaymentData, action.payload);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'history/getHistory', payload: action?.payload?.id});
    yield put({type: 'history/dataAddedStatus', payload: result});
    yield put({type: 'general/setLoading', payload: false});
  }
}

function* basicChartData(action) {
  let result;
  try {
    result = yield call(getBasicChartData, action.payload);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'history/saveBasicChartData', payload: result});
  }
}

function* historySaga() {
  yield takeEvery('history/saveAddedData', savePaymentSaga);
  yield takeEvery('history/getHistory', paymentListSaga);
  yield takeEvery('history/getBasicChartData', basicChartData);
}

export default historySaga;
