import { AnyAction, createSlice, ThunkAction } from "@reduxjs/toolkit";
import { RootState } from ".";
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
        payload: { currentUser: User; authenticated: boolean; token: string };
      }
    ) {
      state.currentUser = action.payload.currentUser;
      state.authenticated = action.payload.authenticated;
      state.token = action.payload.token;
    },
    logout(state) {
      state.currentUser = null;
      state.authenticated = false;
    },
  },
});
export const authActions = authSlice.actions;
export default authSlice.reducer;

type NewType = AnyAction;

export const loginAndSetToken = (
  currentUser: User,
  authenticated: boolean,
  token: string
): ThunkAction<void, RootState, unknown, NewType> => {
  return (dispatch) => {
    let logoutTimer: NodeJS.Timeout = null;
    const storedData = JSON.parse(localStorage.getItem("UserData"));
    let expirationDate: Date | null = null;

    if (!storedData) {
      expirationDate = new Date(new Date().getTime() + 60 * 60 * 1000);
    } else {
      expirationDate = new Date(storedData.expirationDate);
    }
    const timeOut = expirationDate.getTime() - new Date().getTime();
    dispatch(authActions.login({ currentUser, authenticated, token }));
    logoutTimer = setTimeout(() => {
      dispatch(logoutAndClearLocalData());
    }, timeOut);
    localStorage.setItem(
      "UserData",
      JSON.stringify({
        token: token,
        currentUser: currentUser,
        expirationDate: expirationDate.toISOString(),
      })
    );
  };
};
export const logoutAndClearLocalData = (): ThunkAction<
  void,
  RootState,
  unknown,
  NewType
> => {
  return (dispatch) => {
    localStorage.clear();
    dispatch(authActions.logout());
  };
};
