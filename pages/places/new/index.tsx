import React from "react";
import classes from "./NewPlace.module.css";
import Input from "../../../components/shared/FormElements/Input/Input";
import {
  VALIDATOR_REQUIRE,
  VALIDATOR_MINLENGTH,
} from "../../../components/shared/utils/validators";
import Button from "../../../components/shared/FormElements/Button/Button";
import { useForm } from "../../../components/shared/hooks/form-hook";
import { useSelector } from "react-redux";
import { RootState } from "../../../store";
import { User } from "../../../models/user.models";
import { useHttpClient } from "../../../components/shared/hooks/use-http";
import LoadingSpinner from "../../../components/shared/LoadingSpinner/LoadingSpinner";
import ImageUpload from "../../../components/shared/ImageUpload/ImageUpload";

const NewPlace = () => {
  const currentUser = useSelector<RootState, User>(
    (state) => state.auth.currentUser
  );
  const { sendRequest, isLoading } = useHttpClient();
  const { formState, inputHandler } = useForm(
    {
      title: { value: "", isValid: false },
      description: { value: "", isValid: false },
      address: { value: "", isValid: false },
      image: { value: "", isValid: false },
    },
    false
  );

  const placeSubmitHandler = async (event: React.FormEvent) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", formState.inputs.title.value);
    formData.append("description", formState.inputs.description.value);
    formData.append("address", formState.inputs.address.value);
    formData.append("image", formState.inputs.image.value);
    formData.append("creator", currentUser.id);
    console.log(formState);
    await sendRequest("http://localhost:5000/api/places", "POST", formData);
  };

  return (
    <div className={classes["new-place-container"]}>
      {isLoading && <LoadingSpinner asOverlay />}
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
        <ImageUpload id="image" onInput={inputHandler} />
        <Button
          className={classes["add-new-place-button"]}
          type="submit"
          size="small"
          disabled={!formState.isValid}
        >
          ADD PLACE
        </Button>
      </form>
    </div>
  );
};
export default NewPlace;
