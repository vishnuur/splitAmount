import {spawn} from 'redux-saga/effects';
import mySaga from './authSaga';
import groupSaga from './groupSaga';
import historySaga from './historySaga';

export default function* rootSaga() {
  yield spawn(mySaga);
  yield spawn(groupSaga);
  yield spawn(historySaga);
}
