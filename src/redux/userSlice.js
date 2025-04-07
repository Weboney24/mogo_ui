import {createSlice} from '@reduxjs/toolkit';

const user_slice = createSlice({
  name: 'user',
  initialState: {
    value: {
      name: '',
      email: '',
      mobile: '',
      profile_color: '',
      user_profile: '',
    },
  },
  reducers: {
    loadusers: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {loadusers} = user_slice.actions;

export default user_slice.reducer;
