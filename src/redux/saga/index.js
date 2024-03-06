import {spawn} from 'redux-saga/effects';
import mySaga from './authSaga';

export default function* rootSaga() {
  yield spawn(mySaga);
}
