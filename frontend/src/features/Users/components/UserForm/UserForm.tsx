import React, { useState } from "react";

import useValidation from "../../../../hooks/useValidation";
import isEmpty from "../../../../utils/isEmpty";
import {
  GetUsersDocument,
  useCreateUserMutation,
  useValidateUserLazyQuery,
  ValidateUserQuery,
  ValidateUserQueryVariables,
} from "../../../../generated/graphql";

import styles from "./UserForm.module.css";

const initialUser: ValidateUserQueryVariables = { age: 0, name: "", email: "" };
export const UserForm = () => {
  useCreateUserMutation();
  const [createUser, { data: mutationData }] = useCreateUserMutation({
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

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        Create a user. isValid: {`${!mutationData?.createUser?.errors}`}
      </div>

      <div className={styles.row}>
        <div>Name:</div>
        <div>
          <input type="text" value={data.name} onChange={onChangeName} />
          {validation.mergedErrors().name}
        </div>
      </div>

      <div className={styles.row}>
        <div>Age:</div>
        <div>
          <input type="text" value={data.age} onChange={onChangeAge} />
          {validation.mergedErrors().age}
        </div>
      </div>

      <div className={styles.row}>
        <div>Email:</div>
        <div>
          <input type="text" value={data.email} onChange={onChangeEmail} />
          {validation.mergedErrors().email}
        </div>
      </div>

      <div className={styles.row}>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};
