import { createSlice } from "@reduxjs/toolkit";
const roleSlice = createSlice({
  name: "role",
  initialState: { currentRole: "" },
  reducers: {
    changeRole: (state, actions) => {
      state.currentRole = actions.payload;
    },
  },
});

export const { changeRole } = roleSlice.actions;

export default roleSlice.reducer;
