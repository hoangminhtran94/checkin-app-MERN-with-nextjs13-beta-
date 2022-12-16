import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/shared/UIElements/Card/Card";
import classes from "./Auth.module.css";
import Input from "../../components/shared/FormElements/Input/Input";
import Button from "../../components/shared/FormElements/Button/Button";
import ImageUpload from "../../components/shared/ImageUpload/ImageUpload";
import { authActions } from "../../store/auth";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../components/shared/utils/validators";
import { useForm } from "../../components/shared/hooks/form-hook";
import { useDispatch } from "react-redux";
import { User } from "../../models/user.models";
import { useRouter } from "next/router";
import { toggleErrorToast } from "./../../store/actionStatus";
import { useTypedDispatch } from "../../store";
import LoadingSpinner from "../../components/shared/LoadingSpinner/LoadingSpinner";
const Auth = () => {
  const dispatch = useDispatch();
  const dispatchThunk = useTypedDispatch();
  const router = useRouter();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const { formState, inputHandler, setFormState } = useForm(
    {
      email: { value: "", isValid: false },
      password: { value: "", isValid: false },
    },
    false
  );
  const authSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      setIsLoading(true);
      let response = null;
      if (isLoginMode) {
        response = await fetch("http://localhost:5000/api/users/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            password: formState.inputs.password.value,
            email: formState.inputs.email.value,
          }),
        });
      } else {
        const formData = new FormData();
        formData.append("name", formState.inputs.name.value);
        formData.append("email", formState.inputs.email.value);
        formData.append("password", formState.inputs.password.value);
        formData.append("image", formState.inputs.image.value);
        response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          body: formData,
        });
      }
      if (response.status >= 400) {
        const responseData = await response.json(0);
        throw new Error(responseData.message);
      }
      const responseData: { user: User } = await response.json();
      dispatch(
        authActions.login({
          currentUser: responseData.user,
          authenticated: true,
        })
      );
      setIsLoading(false);
      router.push("/");
    } catch (error) {
      console.log(error);
      setIsLoading(false);
      dispatchThunk(toggleErrorToast(error.message));
    }
  };
  const switchModeHandler = () => {
    if (isLoginMode) {
      setFormState(
        {
          ...formState.inputs,
          name: { value: "", isValid: false },
          image: { value: null, isValid: false },
        },
        false
      );
    } else {
      setFormState(
        {
          ...formState.inputs,
          name: undefined,
          image: undefined,
        },
        formState.inputs.email!.isValid && formState.inputs.password!.isValid
      );
    }
    setIsLoginMode((prev) => !prev);
  };

  return (
    <Card className={classes["authentication"]}>
      {isLoading && <LoadingSpinner asOverlay={true} />}
      <h2>{isLoginMode ? "Login" : "Sign Up"}</h2>
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
        {!isLoginMode && <ImageUpload id="image" onInput={inputHandler} />}
        <Button
          size="small"
          className={classes["login-button"]}
          type="submit"
          disabled={!formState.isValid}
        >
          {isLoginMode ? "Login" : "Sign up"}
        </Button>
      </form>
      <Button inverse onClick={switchModeHandler}>
        {isLoginMode ? "Switch to Signup" : "Switch to Login"}
      </Button>
    </Card>
  );
};

export default Auth;
