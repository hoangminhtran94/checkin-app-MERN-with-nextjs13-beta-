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
    setPlaces(state, action: { type: string; payload: any }) {
      const currentIds = state.places.reduce((ids, item) => {
        return [...ids, item.id];
      }, []);
      const newItemIds = action.payload.reduce((ids, item) => {
        return [...ids, item.id];
      }, []);
      if (currentIds.filter((id) => newItemIds.includes(id)).length > 0) {
        return;
      } else {
        state.places = [...state.places, ...action.payload];
      }
    },
    deleteAPlace(state, action: { type: string; payload: string }) {
      const index = state.places.findIndex(
        (place) => place.id === action.payload
      );
      state.places.splice(index, 1);
    },
  },
});

export const placeActions = placeSlice.actions;

export default placeSlice.reducer;
