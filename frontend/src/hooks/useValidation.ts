import React, { useState } from "react";

import { Errors, FormattedErrors, ValidationResult } from "../types";

type ValidationCallback = () => Promise<ValidationResult>;
type State = { isValid: boolean; errors: FormattedErrors };
type ReturnType = State & { onSetValidationErrors: (errors: Errors) => void };
const initialState: State = { isValid: false, errors: {} };
export default function useValidation(
  validationCallback: ValidationCallback
): ReturnType {
  const [state, setValidationResult] = useState<State>(initialState);

  React.useEffect(() => {
    let isMounted = true;
    const validate = (): void => {
      validationCallback()
        .then((_data) => {
          if (isMounted) {
            setValidationResult({
              isValid: _data.isValid,
              errors: formatErrors(_data.errors),
            });
          }
        })
        .catch((e) => {
          if (isMounted) {
            console.log("Figure out a proper way to communicate this to user");
          }
        });
    };

    validate();
    return (): void => {
      isMounted = false;
    };
  }, [validationCallback]);

  const onSetValidationErrors = (errors: Errors) =>
    setValidationResult((prevState) => ({
      ...prevState,
      errors: formatErrors(errors),
    }));

  return { ...state, onSetValidationErrors };
}

const formatErrors = (errors: Errors): FormattedErrors =>
  Object.entries(errors).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value.join(" AND "),
    }),
    {}
  );