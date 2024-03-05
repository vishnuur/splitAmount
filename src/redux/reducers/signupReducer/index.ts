import {createSlice} from '@reduxjs/toolkit';
import {FormValuesType} from '../../../screens/registration';
import imagePaths from '../../../constants/images';
import {PURGE} from 'redux-persist';

export interface stateType {
  users: FormValuesType[];
  currentUser: FormValuesType;
}

const initialState: stateType = {
  users: [],
  currentUser: {
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirmPassword: '',
  },
};

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    onSigningUp: (state, action) => {
      const randomIndex = Math.floor(Math.random() * imagePaths.length);
      const newUser = {
        ...action.payload,
        imageUrl: imagePaths[randomIndex],
      };
      state.users = [...state.users, newUser];
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      state.currentUser = initialState.currentUser;
    });
  },
});

// Action creators are generated for each case reducer function
export const {onSigningUp, setCurrentUser, updateUsers} = counterSlice.actions;

export default counterSlice.reducer;
