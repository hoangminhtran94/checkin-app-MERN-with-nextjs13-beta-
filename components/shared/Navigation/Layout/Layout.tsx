import React from "react";
import MainNavigation from "../MainNavigation/MainNavigation";
import classes from "./Layout.module.css";
import Toast from "../../Toast/Toast";
interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = (props) => {
  return (
    <>
      <MainNavigation />
      <Toast />
      <main className={classes.main}>{props.children}</main>
    </>
  );
};

export default Layout;
