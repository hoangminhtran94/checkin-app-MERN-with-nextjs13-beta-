import React from "react";
import classes from "./PlaceList.module.css";
import Card from "../../shared/UIElements/Card/Card";
import PlaceItem from "../PlaceItem/PlaceItem";
import { Place } from "../../../models/Place.models";
import Button from "../../shared/FormElements/Button/Button";
interface PlaceListProps {
  items: Place[];
}
const PlaceList: React.FC<PlaceListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <div className={classes["place-list"] + " center"}>
        <Card>
          <h2>No places found. Maybe create one?</h2>
          <Button to="/places/new">Share place</Button>
        </Card>
      </div>
    );
  }
  return (
    <ul className={classes["place-list"]}>
      {items.map((place) => (
        <PlaceItem
          key={place.id}
          id={place.id}
          image={place.imageUrl}
          title={place.title}
          description={place.description}
          address={place.address}
          creatorId={place.creator}
          coordinates={place.location}
        />
      ))}
    </ul>
  );
};

export default PlaceList;
