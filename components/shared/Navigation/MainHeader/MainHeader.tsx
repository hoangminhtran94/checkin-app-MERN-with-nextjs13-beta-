"use client";
import React from "react";
import classes from "./MainHeader.module.css";

interface MainHeaderProps {
  children: React.ReactNode;
}
const MainHeader: React.FC<MainHeaderProps> = (props) => {
  return <header className={classes["main-header"]}>{props.children}</header>;
};

export default MainHeader;
