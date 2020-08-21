import { useCallback, useState } from "react";

import useAsyncCallback from "./useAsyncCallback";
import useValidation, { formatErrors } from "./useValidation";
import { Errors, ValidationResult } from "../types";

type FormattedErrors = {
  [key: string]: string;
};
type Callback<T> = (data: T) => Promise<T>;
type ReturnType<T> = {
  data: T;
  errors: FormattedErrors | undefined;
  isValid: boolean;
  onSave: () => {};
  onSetData: (key: string, value: any) => void;
};
export default function useForm<T>(
  callback: Callback<T>,
  validationCallback: (data: T) => Promise<ValidationResult>,
  initialData: T
): ReturnType<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormattedErrors | undefined>(undefined);
  const _validationCallback = useCallback(() => validationCallback(data), [
    data,
  ]);
  const validation = useValidation(_validationCallback);

  const onSetData = (key: string, value: any) =>
    setData((prevData) => ({ ...prevData, [key]: value }));

  const onSave = useAsyncCallback(async (isMounted) => {
    if (isMounted()) {
      try {
        await callback(data);
        setData(initialData);
      } catch (error) {
        const errors: Errors = await error.response.json();
        setErrors(formatErrors(errors));
      }
    }
  });

  return {
    data,
    errors,
    isValid: validation.isValid,
    onSave,
    onSetData,
  };
}
