import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import styles from "./MainApp.module.css";

import { Users } from "./features/Users";
import { Header } from "./components/Header/Header";
import { setAccessToken } from "./stores/AuthStore";

type PropsFromAuthenticator = {
  accessToken: string;
  logout: () => Promise<void>;
};
const MainApp: React.FC<PropsFromAuthenticator> = (props) => {
  setAccessToken(props.accessToken);
  return (
    <Router>
      <div className={styles.container}>
        <div>
          <Header
            leftSideComponents={<Link to="/users">Users</Link>}
            rightSideComponents={[
              <button key="logout-button" onClick={props.logout}>
                Logout
              </button>,
            ]}
          />
        </div>
        <Route path="/" exact={true} component={Users} />
      </div>
    </Router>
  );
};
export default MainApp;
