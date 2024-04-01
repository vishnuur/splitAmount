import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  groups: any;
}

const initialState: stateType = {
  groups: [],
};

export const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    getGroups: (state, action) => {
      console.log(state.groups);
    },
    saveGroupData: (state, action) => {
      state.groups = action.payload;
    },
    createGroup: (state, action) => {
      console.log(state);
    },
  },
});

// Action creators are generated for each case reducer function
export const {getGroups, saveGroupData, createGroup} = groupSlice.actions;

export default groupSlice.reducer;
