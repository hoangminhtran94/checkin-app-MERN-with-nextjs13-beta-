import React, { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import type { RootState } from "../../../store";
import { Place } from "../../../models/Place.models";
import classes from "./UpdatePlace.module.css";
import Input from "../../../components/shared/FormElements/Input/Input";
import Button from "../../../components/shared/FormElements/Button/Button";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../components/shared/utils/validators";
import { useForm } from "../../../components/shared/hooks/form-hook";
import Card from "../../../components/shared/UIElements/Card/Card";
import { useHttpClient } from "../../../components/shared/hooks/use-http";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";
const UpdatePlace = () => {
  const [loading, setLoading] = useState(true);
  const places = useSelector<RootState, Place[]>((state) => state.place.places);
  const token = useSelector<RootState, string>((state) => state.auth.token);
  const router = useRouter();
  const placeId = router.query.pid;
  const identifiedPlace = useMemo(
    () => places.find((place) => place.id === placeId),
    [placeId, places]
  );
  const { isLoading, sendRequest } = useHttpClient();
  const { formState, inputHandler, setFormState } = useForm(
    {
      title: {
        value: "",
        isValid: false,
      },
      description: {
        value: "",
        isValid: false,
      },
    },

    false
  );
  useEffect(() => {
    if (!identifiedPlace) {
      return;
    }
    setFormState(
      {
        title: {
          value: identifiedPlace.title,
          isValid: true,
        },
        description: {
          value: identifiedPlace.description,
          isValid: true,
        },
      },
      true
    );
    setLoading(false);
  }, [identifiedPlace, setFormState]);

  const submitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    await sendRequest(
      `http://localhost:5000/api/places/${identifiedPlace.id}`,
      "PATCH",
      JSON.stringify({
        title: formState.inputs.title.value,
        description: formState.inputs.description.value,
      }),
      {
        Authorization: "Bearer " + token,
        "Content-Type": "application/json",
      }
    );
    router.push(`/${identifiedPlace.creator}/places`);
  };
  if (!identifiedPlace) {
    return (
      <div className="center">
        <Card>
          <h2>Could not find place!</h2>
        </Card>
      </div>
    );
  }
  if (loading) {
    return (
      <div className="center">
        <h2>Loading...</h2>
      </div>
    );
  }

  return (
    <form className={classes["place-form"]} onSubmit={submitHandler}>
      {isLoading && <LoadingSpinner asOverlay />}
      <Input
        id="title"
        element="input"
        type="text"
        label="Title"
        placeholder="Title"
        validators={[VALIDATOR_REQUIRE()]}
        errorText="Please enterd a valid title"
        onInput={inputHandler}
        initialValue={formState.inputs.title!.value}
        initialValidity={formState.inputs.title!.isValid}
      />
      <Input
        id="description"
        element="textarea"
        label="Description"
        placeholder="Description"
        validators={[VALIDATOR_MINLENGTH(5)]}
        errorText="Please enterd a valid description (min length 5 characters)."
        onInput={inputHandler}
        initialValue={formState.inputs.description!.value}
        initialValidity={formState.inputs.description!.isValid}
      />
      <Button
        className={classes["update-button"]}
        size="small"
        type="submit"
        disabled={!formState.isValid}
      >
        UPDATE
      </Button>
    </form>
  );
};
export default UpdatePlace;
