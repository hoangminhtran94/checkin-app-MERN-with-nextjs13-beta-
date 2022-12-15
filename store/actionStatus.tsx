import { createSlice } from "@reduxjs/toolkit";
import { AnyAction } from "redux";
import type { RootState } from "./index";
import { ThunkAction } from "redux-thunk";

interface ActionStatusState {
  status: string;
  message: string;
  toggle: boolean;
}
const initialState: ActionStatusState = {
  status: "",
  message: "",
  toggle: false,
};

const actionStatusSlice = createSlice({
  name: "actionStatus",
  initialState,
  reducers: {
    toggleActionStatus(
      state,
      action: { type: string; payload: { status: string; message: string } }
    ) {
      state.toggle = true;
      state.status = action.payload.status;
      state.message = action.payload.message;
    },
    toggleSlideOutAnimation(state) {
      state.toggle = false;
    },
    closeActionStatus(state) {
      state.toggle = false;
      state.status = "";
      state.message = "";
    },
  },
});
export const actionStatusActions = actionStatusSlice.actions;
export default actionStatusSlice.reducer;

export const toggleErrorToast = (
  message: string
): ThunkAction<void, RootState, unknown, AnyAction> => {
  return (dispatch, getState) => {
    dispatch(
      actionStatusActions.toggleActionStatus({
        message: message,
        status: "error",
      })
    );
    setTimeout(() => {
      dispatch(actionStatusActions.toggleSlideOutAnimation());
    }, 2000);
    setTimeout(() => {
      dispatch(actionStatusActions.closeActionStatus());
    }, 2200);
  };
};
