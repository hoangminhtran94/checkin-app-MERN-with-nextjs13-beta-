import React from "react";
import classes from "./UsersList.module.css";
import UserItem from "../UserItem/UserItem";
import { User } from "../../../models/user.models";
import Card from "../../shared/UIElements/Card/Card";

interface UserListProps {
  items: User[];
}

const UsersList: React.FC<UserListProps> = ({ items }) => {
  if (items.length === 0) {
    return (
      <Card>
        <h1 className={classes["center"]}>No users found</h1>
      </Card>
    );
  }
  return (
    <ul className={classes["users-list"]}>
      {items.map((user, index) => (
        <UserItem
          key={user.id}
          id={user.id}
          image={user.image}
          name={user.name}
          placeCount={user.places}
        />
      ))}
    </ul>
  );
};
export default UsersList;
