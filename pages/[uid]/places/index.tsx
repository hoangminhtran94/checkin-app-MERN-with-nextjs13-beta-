import React from "react";
import { useSelector } from "react-redux";
import type { RootState, TypedDispatch } from "../../../store";
import { Place } from "../../../models/Place.models";
import { useRouter } from "next/router";
import PlaceList from "../../../components/places/PlaceList/PlaceList";
import { wrapper } from "../../../store";
import { toggleErrorToast } from "../../../store/actionStatus";
import { placeActions } from "../../../store/place";

const UserPlaces = () => {
  const places = useSelector<RootState, Place[]>((state) => state.place.places);
  const router = useRouter();
  const uid = router.query.uid;
  const loadedPlaces = places.filter((place) => place.creator === uid);
  return <PlaceList items={loadedPlaces} />;
};
export default UserPlaces;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async (context): Promise<any> => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/places/user/${context.params.uid}`
        );
        if (response.status >= 400) {
          const error = await response.json();
          throw new Error(error.message);
        }
        const { places } = await response.json();
        store.dispatch(placeActions.setPlaces(places));
      } catch (error) {
        // store.dispatch<TypedDispatch>(toggleErrorToast(error.message));
      }
    }
);
