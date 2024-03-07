import {call, put, takeEvery, takeLatest} from 'redux-saga/effects';
import {loginUser} from '../../../services/apis/login';
import {loginReducer, saveLoginDetails} from '../../reducers/signupReducer';
import AsyncStorage from '@react-native-async-storage/async-storage';

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* loginUserSaga(action) {
  let result;
  try {
    result = yield call(loginUser, action.payload);
    AsyncStorage.setItem('token', result.token);
  } catch (e) {
    yield put({type: 'USER_FETCH_FAILED', message: e.message});
  } finally {
    yield put({type: 'counter/saveLoginDetails', payload: result});
  }
}

function* mySaga() {
  yield takeEvery('counter/loginReducer', loginUserSaga);
}

export default mySaga;
