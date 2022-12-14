import React from "react";
import UsersList from "../components/user/UsersList/UsersList";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { User } from "../models/user.models";

const Users: React.FC = () => {
  const users = useSelector<RootState, User[]>((state) => state.user.users);
  return <UsersList items={users} />;
};
export default Users;
