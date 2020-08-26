import React, { useCallback, useState } from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import { Errors, FormattedErrors, ValidationResult } from "../types";

type ValidationCallback<T> = (data: T) => Promise<ValidationResult>;
type State = { isValid: boolean; errors: FormattedErrors };
type ReturnType = State & { onSetValidationErrors: (errors: Errors) => void };
const initialState: State = { isValid: false, errors: {} };
export default function useValidation<T>(
  validationCallback: ValidationCallback<T>,
  data: T
): ReturnType {
  const [state, setValidationResult] = useState<State>(initialState);
  const debouncedValidationCallback = useCallback(
    AwesomeDebouncePromise(validationCallback, 500),
    []
  );

  React.useEffect(() => {
    let isMounted = true;
    const validate = (): void => {
      debouncedValidationCallback(data)
        .then((_validationResult) => {
          const validationResult = _validationResult as ValidationResult;
          if (isMounted) {
            setValidationResult({
              isValid: validationResult.isValid,
              errors: formatErrors(validationResult.errors),
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
  }, [debouncedValidationCallback, data]);

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
