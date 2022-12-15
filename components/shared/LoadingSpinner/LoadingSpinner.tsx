import React from "react";

import classes from "./LoadingSpinner.module.css";

const LoadingSpinner: React.FC<{ asOverlay: boolean }> = (props) => {
  return (
    <div
      className={`${props.asOverlay && classes["loading-spinner__overlay"]}`}
    >
      <div className={classes["lds-dual-ring"]}></div>
    </div>
  );
};

export default LoadingSpinner;
