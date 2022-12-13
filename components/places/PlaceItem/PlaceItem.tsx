import React, { useState } from "react";
import classes from "./PlaceItem.module.css";
import Image from "next/image";
import Card from "../../shared/UIElements/Card/Card";
import Button from "../../shared/FormElements/Button/Button";
import Modal from "../../shared/UIElements/Modal/Modal";
import Map from "../../shared/UIElements/Map/Map";
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
  const [showMap, setShowMap] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const openMapHandler = () => {
    setShowMap(true);
  };
  const closeMapHandler = () => {
    setShowMap(false);
  };
  const showDeleteWarningHandler = () => {
    setShowConfirmModal(true);
  };
  const confirmDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  const cancelDeleteHandler = () => {
    setShowConfirmModal(false);
  };
  return (
    <>
      <li className={classes["place-item"]}>
        <Card className={classes["place-item__content"]}>
          <div className={classes["place-item__image"]}>
            <Image
              src={image}
              alt={title}
              width="0"
              height="0"
              sizes="100vw"
              style={{ width: "100%", height: "100%" }}
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
            <Button to={`/places/${id}`}>Edit</Button>
            <Button danger onClick={showDeleteWarningHandler}>
              Delete
            </Button>
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
