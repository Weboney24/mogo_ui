import {createSlice} from '@reduxjs/toolkit';

const notification_slice = createSlice({
  name: 'notification',
  initialState: {value: {count: false}},
  reducers: {
    notificationCount: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const {notificationCount} = notification_slice.actions;

export default notification_slice.reducer;
