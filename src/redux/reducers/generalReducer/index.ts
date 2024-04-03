import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  expenseTypes: any;
}

const initialState: stateType = {
  expenseTypes: [],
};

export const groupSlice = createSlice({
  name: 'general',
  initialState,
  reducers: {
    getExpenseTypes: (state, action) => {
      console.log(state);
    },
    saveExpenseTypes: (state, action) => {
      state.expenseTypes = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getExpenseTypes, saveExpenseTypes} = groupSlice.actions;

export default groupSlice.reducer;
