import React from "react";

import { UserForm, UsersTable } from "../../features/Users";

import styles from "./Users.module.css";

export const Users = () => {
  return (
    <div className={styles.container}>
      <UserForm />
      <hr />
      <UsersTable />
    </div>
  );
};
