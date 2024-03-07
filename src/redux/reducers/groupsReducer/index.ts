import {createSlice} from '@reduxjs/toolkit';
import {createGroup, listGroups} from '../../../services/apis/groups';

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
      createGroup(action.payload);
      state.groups = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {getGroups, saveGroupData} = groupSlice.actions;

export default groupSlice.reducer;
