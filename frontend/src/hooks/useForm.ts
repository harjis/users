import { Errors } from "../types";
import { useState } from "react";
import useAsyncCallback from "./useAsyncCallback";

type FormattedErrors = {
  [key: string]: string;
};
type Callback<T> = (data: T) => Promise<T>;
type ReturnType<T> = {
  data: T;
  errors: FormattedErrors | undefined;
  onSave: () => {};
  onSetData: (key: string, value: any) => void;
};
export default function useForm<T>(
  callback: Callback<T>,
  initialData: T
): ReturnType<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<FormattedErrors | undefined>(undefined);

  const onSetData = (key: string, value: any) =>
    setData((prevData) => ({ ...prevData, [key]: value }));

  const formatErrors = (errors: Errors): FormattedErrors =>
    Object.entries(errors).reduce(
      (acc, [key, value]) => ({
        ...acc,
        [key]: value.join(" AND "),
      }),
      {}
    );

  const onSave = useAsyncCallback(async (isMounted) => {
    if (data && isMounted()) {
      try {
        await callback(data);
        setData(initialData);
      } catch (error) {
        const errors: Errors = await error.response.json();
        setErrors(formatErrors(errors));
      }
    }
  });

  return { data, errors, onSave, onSetData };
}
