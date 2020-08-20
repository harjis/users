import React from "react";

import styles from "./App.module.css";
import { UsersTable } from "./features/Users";

function App() {
  return (
    <div className={styles.container}>
      <UsersTable />
    </div>
  );
}

export default App;
