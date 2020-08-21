import { useCallback, useState } from "react";

import useAsyncCallback from "./useAsyncCallback";
import useValidation from "./useValidation";
import { Errors, FormattedErrors, ValidationResult } from "../types";

type Callback<T> = (data: T) => Promise<T>;
type ReturnType<T> = {
  data: T;
  errors: FormattedErrors;
  isValid: boolean;
  onSave: () => {};
  onSetData: (key: string, value: any) => void;
};
export default function useForm<T>(
  createCallback: Callback<T>,
  validationCallback: (data: T) => Promise<ValidationResult>,
  initialData: T
): ReturnType<T> {
  const [data, setData] = useState<T>(initialData);
  const validation = useValidation(
    useCallback(() => validationCallback(data), [validationCallback, data])
  );

  const onSetData = (key: string, value: any) =>
    setData((prevData) => ({ ...prevData, [key]: value }));

  const onSave = useAsyncCallback(async (isMounted) => {
    if (isMounted()) {
      try {
        await createCallback(data);
        setData(initialData);
      } catch (error) {
        const errors: Errors = await error.response.json();
        validation.onSetValidationErrors(errors);
      }
    }
  });

  return {
    data,
    errors: validation.errors,
    isValid: validation.isValid,
    onSave,
    onSetData,
  };
}
