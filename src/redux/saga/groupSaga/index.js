import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {listGroups} from '../../../services/apis/groups';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* groupListSaga(action) {
  let result;
  try {
    result = yield call(listGroups);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'groups/saveGroupData', payload: result});
  }
}

function* groupSaga() {
  yield takeEvery('groups/getGroups', groupListSaga);
}

export default groupSaga;
