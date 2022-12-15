import { createSlice } from "@reduxjs/toolkit";
import { User } from "../models/user.models";
interface AuthState {
  currentUser: User | null;
  token: string | null;
  loginTimeOut: number | null;
  authenticated: boolean;
}
const initialState: AuthState = {
  currentUser: null,
  token: null,
  loginTimeOut: null,
  authenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login(
      state,
      action: {
        type: string;
        payload: { currentUser: User; authenticated: boolean };
      }
    ) {
      state.currentUser = action.payload.currentUser;
      state.authenticated = action.payload.authenticated;
    },
    logout(state) {
      state.currentUser = null;
      state.authenticated = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;
