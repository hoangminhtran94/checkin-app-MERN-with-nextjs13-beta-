"use client";
import React, { useState } from "react";
import classes from "./MainNavigation.module.css";
import MainHeader from "../MainHeader/MainHeader";
import Link from "next/link";
import NavLinks from "../NavLinks/NavLinks";
import SideDrawer from "../SideDrawer/SideDrawer";
import Backdrop from "../../UIElements/Backdrop/Backdrop";

interface MainNavigationProps {}
const MainNavigation: React.FC<MainNavigationProps> = (props) => {
  const [drawerIsOpen, setDrawerIsOpen] = useState(false);
  return (
    <>
      {drawerIsOpen && (
        <Backdrop
          onClick={() => {
            setDrawerIsOpen(false);
          }}
        />
      )}

      <SideDrawer
        show={drawerIsOpen}
        onClick={() => {
          setDrawerIsOpen(false);
        }}
      >
        <nav className={classes["main-navigation__drawer-nav"]}>
          <NavLinks />
        </nav>
      </SideDrawer>

      <MainHeader>
        <button
          className={classes["main-navigation__menu-btn"]}
          onClick={() => {
            setDrawerIsOpen(true);
          }}
        >
          <span />
          <span />
          <span />
        </button>
        <h1 className={classes["main-navigation__title"]}>
          <Link href="/">Your Places</Link>
        </h1>
        <nav className={classes["main-navigation__header-nav"]}>
          <NavLinks />
        </nav>
      </MainHeader>
    </>
  );
};

export default MainNavigation;
