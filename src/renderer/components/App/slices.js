import { createSlice } from '@reduxjs/toolkit'
import { createSelector } from 'reselect';
import { MODULE_NAME } from './constants';

export const appSlice = createSlice({
  name: MODULE_NAME,
  initialState: {
    value: 0
  },
  reducers: {
    // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes

    updateAppValue: (state, action) => {
      Object.assign(state.value, action.payload);
    },
  }
});

export const { 
  updateAppValue
} = appSlice.actions;

const filter = state => state;
export const makeSelectAppValue = () =>
  createSelector(filter, state => state? state.value: undefined);

export default appSlice.reducer
