import React, { useState } from "react";
import { useMutation } from "@apollo/client";

import useValidation from "../../../../hooks/useValidation";
import { CREATE_USER, CreateUserData, CreateUserInput } from "../../mutations";
import { User } from "../../types";
import { GET_USERS, VALIDATE_USER, ValidateUserData } from "../../queries";

import styles from "./UserForm.module.css";

const initialUser: User = { age: 0, name: "", email: "" };
export const UserForm = () => {
  const [createUser, { data: mutationData }] = useMutation<
    CreateUserData,
    CreateUserInput
  >(CREATE_USER, {
    update(cache, { data: createdUser }) {
      cache.modify({
        fields: {
          users(existingUsers = []) {
            cache.writeQuery({
              query: GET_USERS,
              data: {
                users: [...existingUsers, createdUser?.createUser.user],
              },
            });
          },
        },
      });
    },
  });
  const [data, setData] = useState<User>(initialUser);
  const validation = useValidation<User, ValidateUserData>(
    VALIDATE_USER,
    data,
    (validationData) => validationData.validateUser.errors
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
      console.log("wat");
      console.log(data?.createUser);
      if (data?.createUser.errors) {
        console.log("here!");
        validation.onSetValidationErrors(data?.createUser.errors);
      } else {
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
