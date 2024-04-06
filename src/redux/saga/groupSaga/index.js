import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {
  createGroup,
  getGroupDetail,
  listGroups,
} from '../../../services/apis/groups';

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

function* createGroupSaga(action) {
  try {
    yield call(createGroup, action.payload);
  } catch (er) {
    console.log(er);
  } finally {
    yield call(listGroups);
  }
}

function* getSingleGroupSaga(action) {
  let result;
  try {
    result = yield call(getGroupDetail, action.payload);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'groups/saveSingleGroupData', payload: result});
  }
}

function* groupSaga() {
  yield takeEvery('groups/getGroups', groupListSaga);
  yield takeLatest('groups/createGroup', createGroupSaga);
  yield takeLatest('groups/getSingleGroupData', getSingleGroupSaga);
}

export default groupSaga;
