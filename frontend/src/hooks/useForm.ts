import { DocumentNode } from "graphql";
import { useMutation } from "@apollo/client";
import { useState } from "react";

import useAsyncCallback from "./useAsyncCallback";
import { Errors, FormattedErrors } from "../types";

type ReturnType<T> = {
  data: T;
  errors: FormattedErrors;
  isValid: boolean;
  onSave: () => {};
  onSetData: (key: string, value: any) => void;
};
export default function useForm<T>(
  upsertMutation: DocumentNode,
  initialData: T
): ReturnType<T> {
  const [data, setData] = useState<T>(initialData);
  const [createCallback] = useMutation(upsertMutation);

  const onSetData = (key: string, value: any) =>
    setData((prevData) => ({ ...prevData, [key]: value }));

  const onSave = useAsyncCallback(async (isMounted) => {
    if (isMounted()) {
      try {
        await createCallback({ variables: { input: data } });
        setData(initialData);
      } catch (errors) {
        console.log(errors);
      }
    }
  });

  return {
    data,
    errors: {},
    isValid: true,
    onSave,
    onSetData,
  };
}
