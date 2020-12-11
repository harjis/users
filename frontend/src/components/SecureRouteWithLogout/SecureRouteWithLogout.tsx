import React from "react";
import { SecureRoute, useOktaAuth } from "@okta/okta-react";
import { Link } from "react-router-dom";

import { Header } from "../Header/Header";

import styles from "./SecureRouteWithLogout.module.css";
import { AuthStore } from "../../stores/AuthStore";

type Props = {
  path: string;
  component: React.ComponentType;
};
export const SecureRouteWithLogout: React.FC<Props> = (props) => {
  const { oktaAuth } = useOktaAuth();
  const token = oktaAuth.getAccessToken();
  if (token) {
    AuthStore.setAccessToken(token);
  }

  const logout = async () => {
    AuthStore.setAccessToken(null);
    await oktaAuth.signOut("/");
  };

  return (
    <div className={styles.container}>
      <div>
        <Header
          leftSideComponents={<Link to="/users">Users</Link>}
          rightSideComponents={[
            <button key="logout-button" onClick={logout}>
              Logout
            </button>,
          ]}
        />
      </div>
      <SecureRoute path={props.path} component={props.component} />
    </div>
  );
};
