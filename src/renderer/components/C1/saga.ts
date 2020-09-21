import { take, takeLatest, cancel, put, fork, delay } from 'redux-saga/effects'

import { set } from './slices';
// import { set as c2set} from '../C2/slices';
import { createAction } from '../utils/actionHelper';
import { ASYNC_SET_VALUE } from './constants';

/* async set action */
export function asyncSet(value: number) {
  return createAction(ASYNC_SET_VALUE, { value });
}

/* the content of 'set' operation */
function *watchSetDispatcher(action: any) {
    yield put(set({value: action.payload.value}));

    //yield delay(2000);
    //yield put(c2set({value: action.payload.value}));
}

/* this is the offical example implements of takeLatest, see:
  https://redux-saga.js.org/docs/advanced/Concurrency.html
*/
function *watchDisaptcher() {
  let lastTask;
  while (true) {
    const action = yield take(ASYNC_SET_VALUE);
    /* call cancle each time of new thread */
    if (lastTask) {
      yield cancel(lastTask); // cancel is no-op if the task has already terminated
    }
    lastTask = yield fork(watchSetDispatcher, action);
  }
}

export default function *sagaData() {
  /* use takeLatest */
  //yield takeLatest(ASYNC_SET_VALUE, watchSetDispatcher);

  /* or use its implements */
  yield fork(watchDisaptcher);
}
