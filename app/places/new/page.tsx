"use client";

import React from "react";
import classes from "./NewPlace.module.css";
import Input from "../../../components/shared/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../components/shared/utils/validators";
import Button from "../../../components/shared/FormElements/Button/Button";
import { useForm } from "../../../components/shared/hooks/form-hook";

const NewPlace: React.FC = () => {
  const { formState, inputHandler } = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      email: { value: "", isValid: false },
    },
    false
  );

  const placeSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log(formState.inputs);
  };
  return (
    <form className={classes["place-form"]} onSubmit={placeSubmitHandler}>
      <Input
        id="title"
        label="Title"
        element="input"
        placeholder="Title"
        type="text"
        errorText="Please enter a valid value"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Input
        id="description"
        label="Description"
        element="textarea"
        placeholder="Description"
        errorText="Please enter a valid description (at least 5 characters)."
        validators={[VALIDATOR_MINLENGTH(5)]}
        onInput={inputHandler}
      />
      <Input
        id="address"
        label="Address"
        element="input"
        placeholder="Address"
        type="text"
        errorText="Please enter an address"
        validators={[VALIDATOR_REQUIRE()]}
        onInput={inputHandler}
      />
      <Button type="submit" disabled={!formState.isValid}>
        ADD PLACE
      </Button>
    </form>
  );
};
export default NewPlace;
