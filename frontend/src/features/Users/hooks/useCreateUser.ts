import React, { useState } from "react";

import isEmpty from "../../../utils/isEmpty";
import useValidation, {
  ReturnType as ValidationReturnType,
} from "../../../hooks/useValidation";
import {
  GetUsersDocument,
  useCreateUserMutation,
  useValidateUserLazyQuery,
  ValidateUserQuery,
  ValidateUserQueryVariables,
} from "../../../generated/graphql";

const initialUser: ValidateUserQueryVariables = { age: 0, name: "", email: "" };

type ReturnType = {
  onChangeAge: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeEmail: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeName: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onSave: () => void;
  user: ValidateUserQueryVariables;
  validation: ValidationReturnType<ValidateUserQuery>;
};
export const useCreateUser = (): ReturnType => {
  const [createUser] = useCreateUserMutation({
    update(cache, { data: createdUser }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            cache.writeQuery({
              query: GetUsersDocument,
              data: {
                users: [...existingUsers, createdUser?.createUser?.user],
              },
            });
          },
        },
      });
    },
  });

  const [data, setData] = useState<ValidateUserQueryVariables>(initialUser);
  const validation = useValidation<
    ValidateUserQueryVariables,
    ValidateUserQuery
  >(
    useValidateUserLazyQuery,
    data,
    (validationData) => validationData?.validateUser.errors
  );

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
    const name = event.currentTarget.value;
    setData((prevData) => ({ ...prevData, name }));
  };

  const onChangeAge = (event: React.ChangeEvent<HTMLInputElement>) => {
    const age = parseInt(event.currentTarget.value);
    setData((prevData) => ({ ...prevData, age }));
  };

  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    const email = event.currentTarget.value;
    setData((prevData) => ({ ...prevData, email }));
  };

  const onSave = () => {
    createUser({ variables: { input: data } }).then(({ data }) => {
      if (
        data?.createUser?.errors !== undefined &&
        !isEmpty(data?.createUser.errors)
      ) {
        validation.onSetValidationErrors(data?.createUser.errors);
      } else {
        setData(initialUser);
      }
    });
  };

  return {
    onChangeAge,
    onChangeName,
    onChangeEmail,
    onSave,
    user: data,
    validation,
  };
};
