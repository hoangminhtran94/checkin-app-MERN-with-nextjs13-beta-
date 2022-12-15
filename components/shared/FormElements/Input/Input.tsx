"use client";
import React, { useReducer, ChangeEvent, useEffect } from "react";
import classes from "./Input.module.css";
import { validate } from "../../utils/validators";

interface InputProps {
  id: string;
  label: string;
  element: "input" | "textarea";
  placeholder: string;
  type?: string;
  rows?: number;
  initialValue?: string;
  initialValidity?: boolean;
  errorText: string;
  validators: { type: string; val?: number }[];
  onInput: (id: string, value: string, isValid: boolean) => void;
}

const inputReducer = (
  state: { value: string; touched: boolean; isValid: boolean },
  action: {
    type: string;
    val?: any;
    validators?: { type: string; val?: number }[];
  }
) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: validate(action.val, action.validators!),
      };
    case "TOUCH":
      return {
        ...state,
        touched: true,
      };
    default:
      return state;
  }
};

const Input: React.FC<InputProps> = (props) => {
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.initialValue || "",
    isValid: props.initialValidity || false,
    touched: false,
  });

  const changeHandler = (event: ChangeEvent) => {
    dispatch({
      type: "CHANGE",
      val: (event.target as HTMLInputElement | HTMLTextAreaElement).value,
      validators: props.validators,
    });
  };
  const touchHandler = () => {
    dispatch({ type: "TOUCH" });
  };
  const element =
    props.element === "input" ? (
      <input
        id={props.id}
        type={props.type || "text"}
        placeholder={props.placeholder}
        onChange={changeHandler}
        onBlur={touchHandler}
        value={inputState.value}
      />
    ) : (
      <textarea
        id={props.id}
        placeholder={props.placeholder}
        onChange={changeHandler}
        value={inputState.value}
        rows={props.rows || 3}
        onBlur={touchHandler}
      />
    );

  const { id, onInput } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, isValid, onInput, value]);
  return (
    <div
      className={`${classes["form-control"]} ${
        !inputState.isValid &&
        inputState.touched &&
        classes["form-control--invalid"]
      }`}
    >
      <label htmlFor={props.id}>{props.label}</label>
      {element}
      {!inputState.isValid && inputState.touched && (
        <p className={classes["invalid-message"]}>{props.errorText}</p>
      )}
    </div>
  );
};

export default Input;
