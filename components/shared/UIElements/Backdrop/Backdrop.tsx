import React from "react";
import ReactDOM from "react-dom";
import classes from "./Backdrop.module.css";

interface BackdropProps {
  onClick: React.UIEventHandler;
}
const Backdrop: React.FC<BackdropProps> = (props) => {
  const backdrop = (
    <div className={classes["backdrop"]} onClick={props.onClick}></div>
  );
  return ReactDOM.createPortal(
    backdrop,
    document.getElementById("backdrop-hook")!
  );
};

export default Backdrop;
