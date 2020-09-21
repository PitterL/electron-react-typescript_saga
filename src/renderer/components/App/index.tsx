import { hot } from 'react-hot-loader/root';
import * as React from 'react';

import PlusMinusContainer from '../C1';
import MultiplyDivContainer from '../C2';

import { Dispatch} from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
const dynamic = require('@redux-dynostore/react-redux').default;
const attachReducer = require('@redux-dynostore/core').attachReducer;
// const runSaga = require('@redux-dynostore/redux-saga').default;
const subspaced = require('@redux-dynostore/react-redux-subspace').default;
const subAttachReducer = require('@redux-dynostore/redux-subspace').attachReducer;
const subRunSaga = require('@redux-dynostore/redux-subspace-saga').default;

import reducer, { 
  updateAppValue, makeSelectAppValue
 } from './slices';

import { MODULE_NAME } from './constants';

interface AppPageProps {

}

interface AppPageState {

}

class ApplicationPage extends React.Component<AppPageProps, AppPageState> {
    render() {
        return (
          <div>
            <PlusMinusContainer />
            <p> -----------------------------</p>
            <MultiplyDivContainer />
          </div>
        )
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        updateAppValue: (v: number) => dispatch(updateAppValue(v)),
    };
  }
  
  const mapStateToProps = createStructuredSelector({
    appValue: makeSelectAppValue(),
  });
  
  const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
  );
  
  export default dynamic(MODULE_NAME, attachReducer(reducer))(withConnect(ApplicationPage));
  //export default dynamic(MODULE_NAME, subspaced(), subAttachReducer(reducer))(withConnect(ApplicationPage));
