import { Errors } from "../types";
import { useState } from "react";
import useAsyncCallback from "./useAsyncCallback";

type Callback<T> = (data: T) => Promise<T>;
type ReturnType<T> = {
  data: T | undefined;
  errors: Errors | undefined;
  onSave: () => {};
  onSetData: (key: string, value: any) => void;
};
export default function useForm<T>(
  callback: Callback<T>,
  initialData: T
): ReturnType<T> {
  const [data, setData] = useState<T>(initialData);
  const [errors, setErrors] = useState<Errors | undefined>(undefined);

  const onSetData = (key: string, value: any) =>
    setData((prevData) => ({ ...prevData, [key]: value }));

  const onSave = useAsyncCallback(async (isMounted) => {
    if (data && isMounted()) {
      try {
        const savedData = await callback(data);
        setData(savedData);
      } catch (e) {
        setErrors(e);
        console.log("Handle errors: ", e);
      }
    }
  });

  return { data, errors, onSave, onSetData };
}
