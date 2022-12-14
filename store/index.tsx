import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import userReducer from "./user";
import placeReducer from "./place";
import { createWrapper, Context, HYDRATE } from "next-redux-wrapper";

const makeStore = () => {
  let middleware = [];
  return configureStore({
    reducer: {
      user: userReducer,
      place: placeReducer,
    },
    devTools: true,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(middleware),
  });
};

// Infer the `RootState` and `AppDispatch` types from the store itself
export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore["getState"]>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action
>;
export const wrapper = createWrapper<AppStore>(makeStore, { debug: true });
export const store = makeStore();
