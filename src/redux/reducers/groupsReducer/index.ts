import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  groups: any;
}

const initialState: stateType = {
  groups: [],
};

export const groupSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    onSaveGroup: (state, action) => {
      console.log(state.groups, 'action', action.payload);
      state.groups = [...state.groups, action.payload];
    },
  },
});

// Action creators are generated for each case reducer function
export const {onSaveGroup} = groupSlice.actions;

export default groupSlice.reducer;
