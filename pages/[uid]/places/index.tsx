import React from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { Place } from "../../../models/Place.models";
import { useRouter } from "next/router";
import PlaceList from "../../../components/places/PlaceList/PlaceList";

const UserPlaces = ({ params }) => {
  const places = useSelector<RootState, Place[]>((state) => state.place.places);
  const router = useRouter();
  const uid = router.query.uid;
  const loadedPlaces = places.filter((place) => place.creator === uid);
  return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;
