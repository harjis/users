import React from "react";
import { useOktaAuth } from "@okta/okta-react";

import styles from "./Frontpage.module.css";
export const Frontpage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const login = async () => {
    await oktaAuth.signInWithRedirect({ originalUri: "/users" });
  };

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      Welcome!
      <button onClick={login}>Login</button>
    </div>
  );
};
