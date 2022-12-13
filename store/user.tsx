import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user.models";

interface UserSliceState {
  users: User[];
}

const initialState = {
  users: [
    {
      id: "u1",
      name: "Max Schwarz",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80",
      places: 3,
    },
  ],
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUsers(state, action) {},
  },
});

export const userActions = userSlice.actions;
export default userSlice.reducer;
