import React from "react";
import classes from "./NavLinks.module.css";
import NavLink from "../NavLink/NavLink";

const NavLinks: React.FC = () => {
  return (
    <ul className={classes["nav-links"]}>
      <li>
        <NavLink href="/">All Users</NavLink>
      </li>
      <li>
        <NavLink href="/u1/places" pathname="/[uid]/places">
          My Places
        </NavLink>
      </li>
      <li>
        <NavLink href="/places/new">Add Place</NavLink>
      </li>
      <li>
        <NavLink href="/auth">Authenticate</NavLink>
      </li>
    </ul>
  );
};
export default NavLinks;
