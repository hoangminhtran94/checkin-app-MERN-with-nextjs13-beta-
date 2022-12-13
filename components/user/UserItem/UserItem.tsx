import React from "react";
import classes from "./UserItem.module.css";
import Link from "next/link";
import Card from "../../shared/UIElements/Card/Card";
import Avatar from "../../shared/UIElements/Avatar/Avatar";
interface UserItemProps {
  id: number | string;
  image: string;
  name: string;
  placeCount: number;
}

const UserItem: React.FC<UserItemProps> = ({ id, image, name, placeCount }) => {
  return (
    <li className={classes["user-item"]}>
      <Card className={classes["user-item__content"]}>
        <Link href={`/${id}/places`}>
          <div className={classes["user-item__image"]}>
            <Avatar image={image} alt={name} width={4 * 16} />
          </div>
          <div className={classes["user-item__info"]}>
            <h2>{name}</h2>
            <h3>
              {placeCount} {placeCount === 1 ? "Place" : "Places"}
            </h3>
          </div>
        </Link>
      </Card>
    </li>
  );
};
export default UserItem;
