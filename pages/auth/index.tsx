"use client";
import React, { useState, useRef, useEffect } from "react";
import Card from "../../components/shared/UIElements/Card/Card";
import classes from "./Auth.module.css";
import Input from "../../components/shared/FormElements/Input/Input";
import Button from "../../components/shared/FormElements/Button/Button";
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
  const [imageData, setImageData] = useState<{
    image: string;
    file: File | null;
  }>({ image: "", file: null });
  const inputRef = useRef<HTMLInputElement>(null);
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
        response = await fetch("http://localhost:5000/api/users/signup", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8cmFuZG9tJTIwcGVyc29ufGVufDB8fDB8fA%3D%3D&w=1000&q=80",
          }),
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
        {!isLoginMode && (
          <div className={classes["file-upload-controller"]}>
            <Button
              className={classes["upload-button"]}
              inverse
              type="button"
              size="small"
              onClick={() => {
                inputRef.current.click();
              }}
            >
              Choose an image
              <input
                ref={inputRef}
                style={{ display: "none" }}
                type="file"
                onChange={(e) => {
                  setImageData({
                    file: e.target.files[0],
                    image: e.target.files[0].name,
                  });
                }}
                accept={".jpg,.jpeg,.png"}
                placeholder="Upload profile image"
              />
            </Button>
            {imageData.image && <p className="File name">{imageData.image}</p>}
          </div>
        )}
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
