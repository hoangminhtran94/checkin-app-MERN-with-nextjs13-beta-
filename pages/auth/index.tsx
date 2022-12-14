"use client";
import React, { useState } from "react";
import Card from "../../components/shared/UIElements/Card/Card";
import classes from "./Auth.module.css";
import Input from "../../components/shared/FormElements/Input/Input";
import Button from "../../components/shared/FormElements/Button/Button";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../components/shared/utils/validators";
import { useForm } from "../../components/shared/hooks/form-hook";
const Auth = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { formState, inputHandler, setFormState } = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );
  const authSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Login...");
  };
  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormState(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
        },
        false
      );
    } else {
      setFormState(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email!.isValid && formState.inputs.password!.isValid
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  return (
    <Card className={classes["authentication"]}>
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        {!isLoginMode && (
          <Input
            id="name"
            type="text"
            label="Full name"
            placeholder="Full name"
            element="input"
            errorText="Full name is required"
            validators={[VALIDATOR_REQUIRE()]}
            onInput={inputHandler}
          />
        )}
        <Input
          id="email"
          type="email"
          label="Email"
          placeholder="email"
          element="input"
          errorText="Invalid email, please enter a valid email"
          validators={[VALIDATOR_EMAIL(), VALIDATOR_REQUIRE()]}
          onInput={inputHandler}
        />
        <Input
          id="password"
          type="password"
          label="Password"
          placeholder="Password"
          element="input"
          errorText="Invalid password, please enter a valid password"
          validators={[VALIDATOR_MINLENGTH(6)]}
          onInput={inputHandler}
        />
        <Button type="submit" disabled={!formState.isValid}>
          Login
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode ? "Switch to Signup" : "Switch to Login"}
      </Button>
    </Card>
  );
};

export default Auth;
