import {createSlice} from '@reduxjs/toolkit';

export interface stateType {
  groups: any;
  groupData: any;
}

const initialState: stateType = {
  groups: [],
  groupData: {},
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
    getSingleGroupData: (state, action) => {
      console.log(action);
    },
    saveSingleGroupData: (state, action) => {
      state.groupData = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  getGroups,
  saveGroupData,
  createGroup,
  getSingleGroupData,
  saveSingleGroupData,
} = groupSlice.actions;

export default groupSlice.reducer;
