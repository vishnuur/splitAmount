import {spawn} from 'redux-saga/effects';
import mySaga from './authSaga';
import groupSaga from './groupSaga';

export default function* rootSaga() {
  yield spawn(mySaga);
  yield spawn(groupSaga);
}
