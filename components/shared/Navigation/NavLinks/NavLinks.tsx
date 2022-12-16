import React from "react";
import classes from "./NavLinks.module.css";
import NavLink from "../NavLink/NavLink";
import { useSelector } from "react-redux";
import type { RootState } from "../../../../store";
import Button from "../../FormElements/Button/Button";
import { authActions } from "../../../../store/auth";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { User } from "./../../../../models/user.models";
const NavLinks: React.FC = () => {
  const authenticated = useSelector<RootState, boolean>(
    (state) => state.auth.authenticated
  );
  const currentUser = useSelector<RootState, User>(
    (state) => state.auth.currentUser
  );
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink href="/">All Users</NavLink>
      </li>
      {authenticated && (
        <>
          <li>
            <NavLink href={`/${currentUser.id}/places`}>My Places</NavLink>
          </li>

          <li>
            <NavLink href="/places/new">Add Place</NavLink>
          </li>
        </>
      )}
      {!authenticated && (
        <li>
          <NavLink href="/auth">Authenticate</NavLink>
        </li>
      )}
      {authenticated && (
        <li>
          <Button
            onClick={() => {
              dispatch(authActions.logout());
              router.push("/auth");
            }}
          >
            Logout
          </Button>
        </li>
      )}
    </ul>
  );
};
export default NavLinks;
