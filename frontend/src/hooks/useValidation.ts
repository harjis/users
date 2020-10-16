import React, { useCallback, useState } from "react";
import { debounce } from "lodash";

import { Errors, FormattedErrors } from "../types";
import { LazyQueryHookOptions, QueryTuple } from "@apollo/client";

type ReturnType<ValidationReturnData> = {
  mergedErrors: () => FormattedErrors;
  validationData: ValidationReturnData | undefined;
  onSetValidationErrors: (errors: Errors) => void;
};
export default function useValidation<Variables, ValidationReturnData>(
  validationLazyQueryHook: (
    baseOptions?: LazyQueryHookOptions<ValidationReturnData, Variables>
  ) => QueryTuple<ValidationReturnData, Variables>,
  data: Variables,
  errorsGetter: (validationData: ValidationReturnData | undefined) => Errors
): ReturnType<ValidationReturnData> {
  const [errors, setErrors] = useState({});
  const [
    validationCallback,
    { data: validationData },
  ] = validationLazyQueryHook();
  // I guess this would fail if somehow some other validationQuery was given in next props
  const debouncedValidationCallback = useCallback(
    debounce(validationCallback, 500),
    []
  );

  React.useEffect(() => {
    let isMounted = true;
    if (isMounted) {
      debouncedValidationCallback({ variables: data });
    }
    return (): void => {
      isMounted = false;
    };
  }, [debouncedValidationCallback, data]);

  const onSetValidationErrors = (errors: Errors) => setErrors(errors);
  // This is just :D
  const mergedErrors = (): FormattedErrors =>
    validationData !== null
      ? formatErrors({
          ...errorsGetter(validationData),
          ...errors,
        })
      : formatErrors({
          ...errors,
        });

  return { validationData, mergedErrors, onSetValidationErrors };
}

const formatErrors = (errors: Errors): FormattedErrors =>
  Object.entries(errors).reduce(
    (acc, [key, value]) => ({
      ...acc,
      [key]: value.join(" AND "),
    }),
    {}
  );
