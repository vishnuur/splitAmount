import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {loginUser} from '../../../services/apis/login';
import {loginReducer, saveLoginDetails} from '../../reducers/signupReducer';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUserSaga(action) {
  try {
    const user = yield call(loginUser, action.payload);
    console.log(user, 'usersaga');
    yield put({type: saveLoginDetails, payload: user});
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  }
}

function* mySaga() {
  yield takeEvery(loginReducer, loginUserSaga);
}

export default mySaga;
