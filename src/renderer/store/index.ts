import { createStore, compose } from 'redux'
import { applyMiddleware } from 'redux-subspace'
import createSagaMiddleware from 'redux-subspace-saga'
const dynostore = require('@redux-dynostore/core').default;
const dynamicReducers = require('@redux-dynostore/core').dynamicReducers;
const dynamicSagas = require('@redux-dynostore/redux-saga').dynamicSagas;

//import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from '../reducers';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(rootReducer, compose(
  applyMiddleware(sagaMiddleware),
  dynostore(
    dynamicReducers(),
    dynamicSagas(sagaMiddleware)
  )
));

//console.log("Create store", store.getState());
store.subscribe(()=>console.log("Store changed:", store.getState()));

if (typeof module.hot !== 'undefined') {
    module.hot.accept('../reducers', () =>
        store.replaceReducer(require('../reducers').rootReducer)
    );
}

export default store;
