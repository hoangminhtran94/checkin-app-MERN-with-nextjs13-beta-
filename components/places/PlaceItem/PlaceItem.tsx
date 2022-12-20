import React, { useState } from "react";
import classes from "./PlaceItem.module.css";
import Image from "next/image";
import Card from "../../shared/UIElements/Card/Card";
import Button from "../../shared/FormElements/Button/Button";
import Modal from "../../shared/UIElements/Modal/Modal";
import Map from "../../shared/UIElements/Map/Map";
import { useHttpClient } from "../../shared/hooks/use-http";
import type { RootState } from "../../../store";
import { useSelector } from "react-redux";
import LoadingSpinner from "../../shared/LoadingSpinner/LoadingSpinner";
import { User } from "../../../models/user.models";
import { useDispatch } from "react-redux";
import { placeActions } from "../../../store/place";
interface PlaceItemProps {
  id: string;
  image: string;
  title: string;
  description: string;
  address: string;
  creatorId: string;
  coordinates: {};
}
const PlaceItem: React.FC<PlaceItemProps> = ({
  id,
  image,
  title,
  description,
  address,
  creatorId,
  coordinates,
}) => {
  const token = useSelector<RootState, string>((state) => state.auth.token);
  const dispatch = useDispatch();
  const isAuthenticated = useSelector<RootState, boolean>(
    (state) => state.auth.authenticated
  );
  const currentUser = useSelector<RootState, User>(
    (state) => state.auth.currentUser
  );
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const { isLoading, sendRequest } = useHttpClient();
  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const confirmDeleteHandler = async () => {
    await sendRequest(
      `http://localhost:5000/api/places/${id}`,
      "DELETE",
      undefined,
      {
        Authorization: "Bearer " + token,
      }
    );
    dispatch(placeActions.deleteAPlace(id));
    setShowConfirmModal(false);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  return (
    <>
      <li className={classes["place-item"]}>
        {isLoading && <LoadingSpinner asOverlay />}
        <Card className={classes["place-item__content"]}>
          <div className={classes["place-item__image"]}>
            <Image
              src={"http://localhost:5000/" + image}
              alt={title}
              width={640}
              height={320}
            />
          </div>
          <div className={classes["place-item__info"]}>
            <h2>{title}</h2>
            <h3>{address}</h3>
            <p>{description}</p>
          </div>
          <div className={classes["place-item__actions"]}>
            <Button inverse onClick={openMapHandler}>
              View on map
            </Button>
            {isAuthenticated && currentUser.id === creatorId && (
              <>
                <Button to={`/places/${id}`}>Edit</Button>
                <Button danger onClick={showDeleteWarningHandler}>
                  Delete
                </Button>
              </>
            )}
          </div>
        </Card>
      </li>
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={address}
        contentClass={classes["place-item__modal-content"]}
        footerClass={classes["place-item__modal-actions"]}
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className={classes["map-container"]}>
          <Map center={coordinates} zoom={16} />
        </div>
      </Modal>
      <Modal
        show={showConfirmModal}
        onCancel={cancelDeleteHandler}
        header="Are you sure?"
        footerClass={classes["place-item__modal-actions"]}
        footer={
          <>
            <Button inverse onClick={cancelDeleteHandler}>
              Cancel
            </Button>
            <Button danger type="submit" onClick={confirmDeleteHandler}>
              Delete
            </Button>
          </>
        }
      >
        <p>
          Do you want to proceed and delete this place? Please note that it
          cannot be undone thereafter.
        </p>
      </Modal>
    </>
  );
};

export default PlaceItem;
