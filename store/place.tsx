import { createSlice } from "@reduxjs/toolkit";
import { Place } from "../models/Place.models";

interface PlaceStates {
  places: Place[];
}

const initialState: PlaceStates = {
  places: [
    {
      id: "p1",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
      address: "20 W 34th St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584,
      },
      creator: "u1",
    },
    {
      id: "p2",
      title: "Empire State Building",
      description: "One of the most famous sky scrapers in the world!",
      imageUrl:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/df/NYC_Empire_State_Building.jpg/640px-NYC_Empire_State_Building.jpg",
      address: "20 W 34th St, New York, NY 10001",
      location: {
        lat: 40.7484405,
        lng: -73.9878584,
      },
      creator: "u2",
    },
  ],
};
const placeSlice = createSlice({
  name: "place",
  initialState,
  reducers: {},
});

export const placeActions = placeSlice.actions;

export default placeSlice.reducer;
