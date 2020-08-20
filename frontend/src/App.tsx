import React from "react";

import styles from "./App.module.css";
import { UserForm, UsersTable } from "./features/Users";

function App() {
  return (
    <div className={styles.container}>
      <UserForm />
      <hr />
      <UsersTable />
    </div>
  );
}

export default App;
