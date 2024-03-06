import {createSlice} from '@reduxjs/toolkit';
import {createGroup, listGroups} from '../../../services/apis/groups';

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
      createGroup(action.payload);
    },
    saveGroupData: (state, action) => {
      state.groups = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {onSaveGroup, saveGroupData} = groupSlice.actions;

export default groupSlice.reducer;
