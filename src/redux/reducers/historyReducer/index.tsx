import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  history: any;
  groupDetails: any;
  dataAddedSuccess: boolean;
}

const initialState: stateType = {
  history: [],
  groupDetails: [],
  dataAddedSuccess: false,
};

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    saveAddedData: (state, action) => {
      console.log('first');
    },
    getHistory: (state, action) => {
      console.log(action);
    },
    saveHistory: (state, action) => {
      state.history = action.payload;
    },
    dataAddedStatus: (state, action) => {
      state.dataAddedSuccess = action.payload;
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
