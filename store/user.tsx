import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user.models";

interface UserSliceState {
  users: User[];
}

const initialState = {
  users: [],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {
      state.users = action.payload;
    },
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
