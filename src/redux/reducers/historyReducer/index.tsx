import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  history: any;
}

const initialState: stateType = {
  history: [],
};

export const historySlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    saveAddedData: (state, action) => {
      state.history = [...state.history, action.payload];
    },
    clearAddedData: (state, action) => {
      state.history = [];
    },
  },
});

// Action creators are generated for each case reducer function
export const {saveAddedData, clearAddedData} = historySlice.actions;

export default historySlice.reducer;
