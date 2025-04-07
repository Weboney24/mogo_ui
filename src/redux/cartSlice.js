import {createSlice} from '@reduxjs/toolkit';

const cart_slice = createSlice({
  name: 'cart',
  initialState: {value: {count: 0}},
  reducers: {
    cardCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {cardCount} = cart_slice.actions;

export default cart_slice.reducer;
