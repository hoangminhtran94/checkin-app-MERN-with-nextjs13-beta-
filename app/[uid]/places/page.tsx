"use client";
import React from "react";
import { useSearchParams, usePathname } from "next/navigation";

import { useSelector } from "react-redux";
import type { RootState } from "../../../store";
import { Place } from "../../../models/Place.models";
import PlaceList from "../../../components/places/PlaceList/PlaceList";
const UserPlaces = ({ params }) => {
  const places = useSelector<RootState, Place[]>((state) => state.place.places);
  const pathname = usePathname();
  const uid = pathname.slice(1, pathname.indexOf("/", 2));
  const loadedPlaces = places.filter((place) => place.creator === uid);
  return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;
