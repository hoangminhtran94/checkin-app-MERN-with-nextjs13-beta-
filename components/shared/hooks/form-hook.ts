"use client";
import { useCallback, useReducer } from "react";

interface InputChangeAction {
  type: string;
  inputId: string;
  isValid: boolean;
  value: string;
}
interface SetFormValue {
  type: string;
  inputs: { [key: string]: { value: any; isValid: boolean } | undefined };
  isValid: boolean;
}

const formReducer = (
  state: {
    inputs: { [key: string]: { value: string; isValid: boolean } | undefined };
    isValid: boolean;
  },
  action: InputChangeAction | SetFormValue
) => {
  switch (action.type) {
    case "INPUT_CHANGE":
      let formIsValid = true;
      for (const key in state.inputs) {
        if (!state.inputs[key]) {
          continue;
        }
        if (key === (action as InputChangeAction).inputId) {
          formIsValid = formIsValid && action.isValid;
        } else {
          formIsValid = formIsValid && state.inputs[key]!.isValid;
        }
      }
      return {
        ...state,
        inputs: {
          ...state.inputs,
          [(action as InputChangeAction).inputId]: {
            value: (action as InputChangeAction).value,
            isValid: action.isValid,
          },
        },
        isValid: formIsValid,
      };
    case "SET_FORM_VALUE":
      return {
        ...state,
        inputs: (action as SetFormValue).inputs,
        isValid: action.isValid,
      };
    default:
      return state;
  }
};

export const useForm = (
  initialInputs: { [key: string]: { value: any; isValid: boolean } },
  initialFormValidity: boolean
) => {
  const [formState, dispatch] = useReducer(formReducer, {
    inputs: initialInputs,
    isValid: initialFormValidity,
  });

  const setFormState = useCallback(
    (
      inputData: {
        [key: string]: { value: string; isValid: boolean } | undefined;
      },
      formValidity: boolean
    ) => {
      dispatch({
        type: "SET_FORM_VALUE",
        inputs: inputData,
        isValid: formValidity,
      });
    },
    []
  );

  const inputHandler = useCallback(
    (id: string, value: any, isValid: boolean) => {
      dispatch({
        type: "INPUT_CHANGE",
        inputId: id,
        isValid: isValid,
        value: value,
      });
    },
    [dispatch]
  );
  return { formState, inputHandler, setFormState };
};
