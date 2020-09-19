import * as React from 'react';
import { Dispatch} from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
const dynamic = require('@redux-dynostore/react-redux').default;
const attachReducer = require('@redux-dynostore/core').attachReducer;
const runSaga = require('@redux-dynostore/redux-saga').runSaga;
import saga from './saga';

import reducer, { 
    increment, decrement, set,
    makeSelectCountValue as makeSelectCount1Value
 } from './slices';

import { 
    multiply2, div2,
    makeSelectCountValue as makeSelectCount2Value
 } from '../C2/slices';

import { MODULE_NAME } from './constants';

interface CountPageProps {
    increment: Function;
    decrement: Function;
    multiply2: Function;
    div2: Function;

    c1Value: number;
    c2Value: number;
}

interface CountPageState {

}

class Count1Page extends React.Component<CountPageProps, CountPageState> {
    incrementValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.increment();
    }

    decrementValue = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.decrement();
    }

    multiply2Value = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.multiply2();
    }

    div2Value = (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        this.props.div2();
    }

    inputValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.persist();
        let value = Number(e.target.value);
        if (!isNaN(value))
            this.props.set(value);
    }

    render() {
        // console.log(this.constructor.name, "render", this.props, this.state);
        return (
            <div className="counter">
                <p id="counter-value">Current counter value: {this.props.c1Value} {this.props.c2Value} </p>
                <p>
                    <button id="increment" onClick={this.incrementValue}>
                        Increment
                    </button>
                    <button id="decrement" onClick={this.decrementValue}>
                        Decrement
                    </button>
                    <button id="multiply" onClick={this.multiply2Value}>
                        Multiply
                    </button>
                    <button id="div2" onClick={this.div2Value}>
                        Div
                    </button>
                    <input id="set" onChange={this.inputValue} />
                </p>
            </div>);
    }
}

function mapDispatchToProps(dispatch: Dispatch) {
    return {
        increment: () => dispatch(increment()),
        decrement: () => dispatch(decrement()),
        multiply2: () => dispatch(multiply2()),
        div2: () => dispatch(div2()),
        set: (value: number) => dispatch(set({value})),
    };
}
  
const mapStateToProps = createStructuredSelector({
    c1Value: makeSelectCount1Value(),
    c2Value: makeSelectCount2Value(),
});
  
const withConnect = connect(
    mapStateToProps,
    mapDispatchToProps,
);

export default dynamic(MODULE_NAME, attachReducer(reducer), runSaga(saga))(withConnect(Count1Page));
