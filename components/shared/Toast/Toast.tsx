import React from "react";
import { RootState } from "../../../store";
import classes from "./Toast.module.css";
import { useSelector } from "react-redux";
import { CSSTransition } from "react-transition-group";
const Toast = () => {
  const message = useSelector<RootState, string>(
    (state) => state.actionStatus.message
  );
  const status = useSelector<RootState, string>(
    (state) => state.actionStatus.status
  );
  const toggle = useSelector<RootState, boolean>(
    (state) => state.actionStatus.toggle
  );
  return (
    <CSSTransition
      in={toggle}
      mountOnEnter
      unmountOnExit
      timeout={300}
      classNames="toast"
    >
      <div className={classes["toast-container"]}>
        <p>{message}</p>
      </div>
    </CSSTransition>
  );
};

export default Toast;
