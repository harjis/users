import React from "react";

import styles from "./UserForm.module.css";

export const UserForm = () => {
  return (
    <div className={styles.container}>
      <div className={styles.row}>Create a user</div>

      <div className={styles.row}>
        <div>Name:</div>
        <div>
          <input type="text" />
        </div>
      </div>

      <div className={styles.row}>
        <div>Age:</div>
        <div>
          <input type="text" />
        </div>
      </div>

      <div className={styles.row}>
        <div>Email:</div>
        <div>
          <input type="text" />
        </div>
      </div>

      <div className={styles.row}>
        <button>Save</button>
      </div>
    </div>
  );
};
