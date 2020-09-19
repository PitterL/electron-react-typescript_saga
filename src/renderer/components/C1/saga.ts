import { take, put, call, apply, fork, select, delay } from 'redux-saga/effects'

import { set } from './slices';
import { set as c1set} from '../C1/slices';


function *watchDispatcher(/*dispatch: Function*/) {
  while (true) {
    try {
      // An error from socketChannel will cause the saga jump to the catch block
      let action = yield take(set.type);
      console.log("saga get", action);
      yield put(action);
      //yield put(c1set({value: action.payload.value}));
      // dispatch(action);
    } catch(err) {
      console.error('saga error:', err)
      // socketChannel is still open in catch block
      // if we want end the socketChannel, we need close it explicitly
    }
  }
}

export default function *sagaData() {
  // console.log("arguments", arguments, store);
  yield fork(watchDispatcher);
}
