import { createSlice } from "@reduxjs/toolkit";
import { Place } from "../models/Place.models";

interface PlaceStates {
  places: Place[];
}

const initialState: PlaceStates = {
  places: [],
};
const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {
    setPlaces(state, action) {
      state.places = action.payload;
    },
  },
});

export const placeActions = placeSlice.actions;

export default placeSlice.reducer;
