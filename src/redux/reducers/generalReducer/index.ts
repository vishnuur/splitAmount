import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  expenseTypes: any;
  isLoading: boolean;
}

const initialState: stateType = {
  expenseTypes: [],
  isLoading: false,
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
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getExpenseTypes, saveExpenseTypes, setLoading} =
  groupSlice.actions;

export default groupSlice.reducer;
