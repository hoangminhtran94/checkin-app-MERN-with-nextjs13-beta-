import React from "react";
import classes from "./Card.module.css";

interface CardProps {
  className?: string;
  style?: { [key: string]: any };
  children: React.ReactNode;
}

const Card: React.FC<CardProps> = (props) => {
  return (
    <div
      className={`${props.className} ${classes["card"]}`}
      style={props.style}
    >
      {props.children}
    </div>
  );
};

export default Card;
