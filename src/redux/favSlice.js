import {createSlice} from '@reduxjs/toolkit';

const fav_slice = createSlice({
  name: 'favorite',
  initialState: {value: {count: 0}},
  reducers: {
    ListCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {ListCount} = fav_slice.actions;

export default fav_slice.reducer;
