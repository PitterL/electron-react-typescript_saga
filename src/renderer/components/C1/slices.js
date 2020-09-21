import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect';
import { fromJS } from 'immutable';

import { MODULE_NAME } from './constants';


export const appSlice = createSlice({
  name: MODULE_NAME,
  initialState: {
    value: 1
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

    increment: (state) => {
      // console.log(MODULE_NAME, "c1 reducers","increment", state.value);
      state.value++;
    },
    decrement: (state) => {
      // console.log(MODULE_NAME, "c1 reducers", "decrement", state.value);
      state.value--;
    },
    set: (state, action) => {
      console.log(MODULE_NAME, "reducers","set", action);
      state.value = action.payload.value;
    }
  }
});

export const { 
  increment, decrement, set
} = appSlice.actions;

const filter = state => fromJS(state).get(MODULE_NAME);

export const makeSelectCountValue = () =>
  createSelector(filter, state => state ? state.get("value"): undefined);

export default appSlice.reducer
