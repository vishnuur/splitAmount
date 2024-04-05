import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  history: any;
  groupDetails: any;
  dataAddedSuccess: boolean;
  basicChart: any;
}

const initialState: stateType = {
  history: [],
  groupDetails: [],
  dataAddedSuccess: false,
  basicChart: [],
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
    getBasicChartData: (state, action) => {
      console.log(state);
    },
    saveBasicChartData: (state, action) => {
      state.basicChart = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  saveAddedData,
  clearAddedData,
  getHistory,
  saveHistory,
  getBasicChartData,
  saveBasicChartData,
} = historySlice.actions;

export default historySlice.reducer;
