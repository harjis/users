import React from "react";

import { UserForm, UsersTable } from "../../features/Users";

import styles from "./Protected.module.css";

export const Protected = () => {
  return (
    <div className={styles.container}>
      <UserForm />
      <hr />
      <UsersTable />
    </div>
  );
};
