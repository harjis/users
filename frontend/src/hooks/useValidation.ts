import React, { useCallback, useState } from "react";
import { debounce } from "lodash";
import { DocumentNode } from "graphql";
import { useLazyQuery } from "@apollo/client";

import { Errors, FormattedErrors } from "../types";

type ReturnType<ValidationReturnData> = {
  mergedErrors: () => FormattedErrors;
  validationData: ValidationReturnData | undefined;
  onSetValidationErrors: (errors: Errors) => void;
};
export default function useValidation<Data, ValidationReturnData>(
  validationQuery: DocumentNode,
  data: Data,
  errorsGetter: (validationData: ValidationReturnData) => Errors
): ReturnType<ValidationReturnData> {
  const [errors, setErrors] = useState({});
  const [validationCallback, { data: validationData }] = useLazyQuery<
    ValidationReturnData
  >(validationQuery);
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
    validationData !== undefined
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
