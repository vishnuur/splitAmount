import {createSlice} from '@reduxjs/toolkit';
import {FormValuesType} from '../../../screens/registration';
import imagePaths from '../../../constants/images';
import {PURGE} from 'redux-persist';

export interface stateType {
  users: FormValuesType[];
  currentUser: any;
  token: any;
  loginSuccess: boolean;
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
  token: '',
  loginSuccess: false,
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
    loginReducer: (state, action) => {
      console.log('sdfsd', action.payload);
    },
    saveLoginDetails: (state, action) => {
      console.log(action.payload, 'states');
      state.loginSuccess = action.payload.success;
      state.token = action.payload.token;
      state.currentUser = action.payload.username;
    },
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    updateUsers: (state, action) => {
      state.users = action.payload;
    },
    saveToken: (state, action) => {
      state.token = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(PURGE, state => {
      state.currentUser = initialState.currentUser;
    });
  },
});

// Action creators are generated for each case reducer function
export const {
  onSigningUp,
  setCurrentUser,
  updateUsers,
  saveToken,
  loginReducer,
  saveLoginDetails,
} = counterSlice.actions;

export default counterSlice.reducer;
