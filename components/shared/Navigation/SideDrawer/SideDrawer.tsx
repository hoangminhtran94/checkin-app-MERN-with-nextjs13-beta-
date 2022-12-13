"use client";
import React from "react";
import ReatDOM from "react-dom";
import classes from "./SideDrawer.module.css";
import { CSSTransition } from "react-transition-group";

interface SideDrawerProps {
  children: React.ReactNode;
  show: boolean;
  onClick: React.UIEventHandler;
}

const SideDrawer: React.FC<SideDrawerProps> = ({ children, show, onClick }) => {
  if (typeof window !== "undefined") {
    const content = (
      <CSSTransition
        in={show}
        timeout={200}
        classNames="slide-in-left"
        mountOnEnter
        unmountOnExit
      >
        <aside className={classes["side-drawer"]} onClick={onClick}>
          {children}
        </aside>
      </CSSTransition>
    );
    return ReatDOM.createPortal(
      content,
      document.getElementById("drawer-hook")!
    );
  }
  return null;
};
export default SideDrawer;
