import {createSlice} from '@reduxjs/toolkit';

const login_triger = createSlice({
  name: 'login_triger',
  initialState: {value: {count: false}},
  reducers: {
    MakeLoginStatus: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {MakeLoginStatus} = login_triger.actions;

export default login_triger.reducer;
