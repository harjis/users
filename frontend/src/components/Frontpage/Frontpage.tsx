import React from "react";
import { useOktaAuth } from "@okta/okta-react";

import styles from "./Frontpage.module.css";
export const Frontpage = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const login = async () => {
    await oktaAuth.signInWithRedirect({ originalUri: "/users" });
  };
  const logout = async () => oktaAuth.signOut("/");

  if (authState.isPending) {
    return <div>Loading...</div>;
  }

  const button = authState.isAuthenticated ? (
    <button onClick={logout}>Logout</button>
  ) : (
    <button onClick={login}>Login</button>
  );

  return <div className={styles.container}>{button}</div>;
};
