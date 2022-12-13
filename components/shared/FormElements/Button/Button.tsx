import React from "react";
import Link from "next/link";
import classes from "./Button.module.css";

interface ButtonProps {
  href?: string;
  size?: string;
  inverse?: boolean;
  danger?: boolean;
  children: React.ReactNode;
  to?: string;
  type?: "button" | "submit" | "reset";
  onClick?: React.UIEventHandler;
  disabled?: boolean;
}

const Button: React.FC<ButtonProps> = (props) => {
  if (props.href) {
    return (
      <a
        className={`${classes["button"]} ${
          classes[`button--${props.size || "default"}`]
        } ${props.inverse && classes["button--inverse"]} ${
          props.danger && classes["button--danger"]
        }`}
        href={props.href}
      >
        {props.children}
      </a>
    );
  }
  if (props.to) {
    return (
      <Link
        href={props.to}
        className={`${classes["button"]} ${
          classes[`button--${props.size || "default"}`]
        } ${props.inverse && classes["button--inverse"]} ${
          props.danger && classes["button--danger"]
        }`}
      >
        {props.children}
      </Link>
    );
  }
  return (
    <button
      className={`${classes["button"]} ${
        classes[`button--${props.size || "default"}`]
      } ${props.inverse && classes["button--inverse"]} ${
        props.danger && classes["button--danger"]
      }`}
      type={props.type}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
};

export default Button;
