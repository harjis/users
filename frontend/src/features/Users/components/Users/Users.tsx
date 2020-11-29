import React from "react";

import { UserForm } from "../UserForm/UserForm";
import { UsersTable } from "../UsersTable/UsersTable";

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
