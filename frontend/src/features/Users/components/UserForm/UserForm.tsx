import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import { CREATE_USER, CreateUserData, CreateUserInput } from "../../mutations";
import { User } from "../../types";

import styles from "./UserForm.module.css";

const initialUser: User = { age: 0, name: "", email: "" };
export const UserForm = () => {
  const [createUser, { data: mutationData }] = useMutation<
    CreateUserData,
    CreateUserInput
  >(CREATE_USER);
  const [data, setData] = useState<User>(initialUser);

  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData((prevData) => ({ ...prevData, name: event.currentTarget.value }));
  const onChangeAge = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData((prevData) => ({
      ...prevData,
      age: parseInt(event.currentTarget.value),
    }));
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    setData((prevData) => ({ ...prevData, email: event.currentTarget.value }));

  const onSave = () => {
    createUser({ variables: { input: data } }).then(({ data }) => {
      if (data?.createUser.errors === null) {
        setData(initialUser);
      }
    });
  };

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
