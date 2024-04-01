import {spawn} from 'redux-saga/effects';
import mySaga from './authSaga';
import groupSaga from './groupSaga';
import historySaga from './historySaga';
import generalSaga from './generalSaga';

export default function* rootSaga() {
  yield spawn(mySaga);
  yield spawn(groupSaga);
  yield spawn(historySaga);
  yield spawn(generalSaga);
}
