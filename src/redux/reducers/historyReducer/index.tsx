import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  history: any;
  groupDetails: any;
}

const initialState: stateType = {
  history: [],
  groupDetails: [],
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    saveAddedData: (state, action) => {
      state.history = [...state.history, action.payload];
    },
    getHistory: (state, action) => {
      console.log(action);
    },
    saveHistory: (state, action) => {
      state.groupDetails = action.payload;
    },
    clearAddedData: (state, action) => {
      state.history = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {saveAddedData, clearAddedData, getHistory, saveHistory} =
  historySlice.actions;

export default historySlice.reducer;
