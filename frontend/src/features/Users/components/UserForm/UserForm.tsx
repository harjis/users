import React from "react";

import styles from "./UserForm.module.css";
import { useCreateUser } from "../../hooks/useCreateUser";

export const UserForm = () => {
  const {
    onChangeAge,
    onChangeEmail,
    onChangeName,
    onSave,
    user,
    validation,
  } = useCreateUser();
  return (
    <div className={styles.container}>
      <div className={styles.row}>
        Create a user. isValid: {`${validation.isValid()}`}
      </div>

      <div className={styles.row}>
        <div>Name:</div>
        <div>
          <input type="text" value={user.name} onChange={onChangeName} />
          {validation.mergedErrors().name}
        </div>
      </div>

      <div className={styles.row}>
        <div>Age:</div>
        <div>
          <input type="text" value={user.age} onChange={onChangeAge} />
          {validation.mergedErrors().age}
        </div>
      </div>

      <div className={styles.row}>
        <div>Email:</div>
        <div>
          <input type="text" value={user.email} onChange={onChangeEmail} />
          {validation.mergedErrors().email}
        </div>
      </div>

      <div className={styles.row}>
        <button onClick={onSave}>Save</button>
      </div>
    </div>
  );
};
