import React from "react";
import UsersList from "../components/user/UsersList/UsersList";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "../store";
import { User } from "../models/user.models";
import { wrapper, AppStore } from "../store";
import { userActions } from "../store/user";
import type { TypedDispatch } from "../store";
import { toggleErrorToast } from "./../store/actionStatus";
const Users: React.FC = () => {
  const users = useSelector<RootState, User[]>((state) => state.user.users);
  return <UsersList items={users} />;
};
export default Users;

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (): Promise<any> => {
    try {
      const response = await fetch("http://localhost:5000/api/users");
      if (response.status >= 400) {
        throw new Error("Something went wrong!");
      }
      const { users } = await response.json();
      store.dispatch(userActions.setUsers(users));
    } catch (error) {
      store.dispatch<TypedDispatch>(toggleErrorToast(error.message));
    }
  }
);
