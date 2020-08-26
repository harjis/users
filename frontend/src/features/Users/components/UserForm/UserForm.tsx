import React, { useState } from "react";
import { useLazyQuery, useMutation } from "@apollo/client";
import debounce from "lodash/debounce";

import { CREATE_USER, CreateUserData, CreateUserInput } from "../../mutations";
import { User } from "../../types";

import styles from "./UserForm.module.css";
import {
  VALIDATE_USER,
  ValidateUserData,
  ValidateUserInput,
} from "../../queries";

const initialUser: User = { age: 0, name: "", email: "" };
export const UserForm = () => {
  const [createUser, { data: mutationData }] = useMutation<
    CreateUserData,
    CreateUserInput
  >(CREATE_USER);
  const [data, setData] = useState<User>(initialUser);

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
      if (data?.createUser.errors === null) {
        setData(initialUser);
      }
    });
  };

  const [validateUser, { data: validationData }] = useLazyQuery<
    ValidateUserData,
    ValidateUserInput
  >(VALIDATE_USER);
  const debouncedValidateUser = React.useCallback(
    debounce(validateUser, 500),
    []
  );

  React.useEffect(() => {
    debouncedValidateUser({ variables: data });
  }, [debouncedValidateUser, data]);

  return (
    <div className={styles.container}>
      <div className={styles.row}>
        Create a user. isValid: {`${!mutationData?.createUser.errors}`}
      </div>

      <div className={styles.row}>
        <div>Name:</div>
        <div>
          <input type="text" value={data.name} onChange={onChangeName} />
          {mutationData?.createUser.errors.name}
        </div>
      </div>

      <div className={styles.row}>
        <div>Age:</div>
        <div>
          <input type="text" value={data.age} onChange={onChangeAge} />
          {mutationData?.createUser.errors.age}
        </div>
      </div>

      <div className={styles.row}>
        <div>Email:</div>
        <div>
          <input type="text" value={data.email} onChange={onChangeEmail} />
          {mutationData?.createUser.errors.email}
        </div>
      </div>

      <div className={styles.row}>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};
