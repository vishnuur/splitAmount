import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {historyList} from '../../../services/apis/history';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* groupListSaga(action) {
  let result;
  try {
    result = yield call(historyList, action.payload);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'history/saveHistory', payload: result});
  }
}

function* historySaga() {
  yield takeEvery('history/getHistory', groupListSaga);
}

export default historySaga;
