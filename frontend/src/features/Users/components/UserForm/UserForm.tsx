import React from "react";
import AwesomeDebouncePromise from "awesome-debounce-promise";

import useForm from "../../../../hooks/useForm";
import { createUser, validateUser } from "../../api";
import { User } from "../../types";

import styles from "./UserForm.module.css";

const debouncedValidateUser = AwesomeDebouncePromise(validateUser, 200);
const initialUser: User = { id: null, age: 0, name: "", email: "" };
export const UserForm = () => {
  const { data, errors, isValid, onSave, onSetData } = useForm(
    createUser,
    debouncedValidateUser,
    initialUser
  );
  const onChangeName = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSetData("name", event.currentTarget.value);
  const onChangeAge = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSetData("age", event.currentTarget.value);
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) =>
    onSetData("email", event.currentTarget.value);

  return (
    <div className={styles.container}>
      <div className={styles.row}>Create a user. isValid: {`${isValid}`}</div>

      <div className={styles.row}>
        <div>Name:</div>
        <div>
          <input type="text" value={data.name} onChange={onChangeName} />
          {errors.name}
        </div>
      </div>

      <div className={styles.row}>
        <div>Age:</div>
        <div>
          <input type="text" value={data.age} onChange={onChangeAge} />
          {errors.age}
        </div>
      </div>

      <div className={styles.row}>
        <div>Email:</div>
        <div>
          <input type="text" value={data.email} onChange={onChangeEmail} />
          {errors.email}
        </div>
      </div>

      <div className={styles.row}>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};
