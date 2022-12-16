import {
  Action,
  AnyAction,
  configureStore,
  ThunkAction,
  ThunkDispatch,
  combineReducers,
} from "@reduxjs/toolkit";
import userReducer from "./user";
import placeReducer from "./place";
import authReducer from "./auth";
import actionStatusReducer from "./actionStatus";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";
import { useDispatch } from "react-redux";

const combinedReducer = combineReducers({
  user: userReducer,
  place: placeReducer,
  auth: authReducer,
  actionStatus: actionStatusReducer,
});
const masterReducer = (
  state: ReturnType<typeof combinedReducer>,
  action: AnyAction
) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      place: { ...state.place, places: action.payload.place.places },
      user: { ...state.user, users: action.payload.user.users },
      actionStatus: action.payload.actionStatus,
    };
    return nextState;
  } else {
    return combinedReducer(state, action);
  }
};
const makeStore = () => {
  let middleware = [];
  return configureStore({
    reducer: masterReducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<typeof combinedReducer>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export type TypedDispatch = ThunkDispatch<RootState, any, AnyAction>;
export const useTypedDispatch = () => useDispatch<TypedDispatch>();
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
export const store = makeStore();
