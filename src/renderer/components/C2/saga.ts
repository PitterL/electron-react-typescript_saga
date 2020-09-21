import { take, put, fork } from 'redux-saga/effects'

import { set } from './slices';
import { createAction } from '../utils/actionHelper';
import { ASYNC_SET_VALUE } from './constants';

/* async set action */
export function asyncSet(value: number) {
  return createAction(ASYNC_SET_VALUE, { value });
}

/* the content of 'set' operation */
function *watchSetDispatcher() {
  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      let action = yield take(ASYNC_SET_VALUE);
      yield put(set({value: action.payload.value}));
    } catch(err) {
      console.error('saga error:', err)
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
    }
  }
}

export default function *sagaData() {
  yield fork(watchSetDispatcher);
}