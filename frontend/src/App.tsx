import React from "react";
import { BrowserRouter as Router, Link, Route } from "react-router-dom";

import { Users } from "./features/Users";
import { Header } from "./components/Header/Header";

import styles from "./App.module.css";

const App = () => {
  return (
    <Router>
      <div className={styles.container}>
        <div>
          <Header
            leftSideComponents={<Link to="/users">Users</Link>}
            rightSideComponents={[
              <button
                key="logout-button"
                onClick={() => console.log("implement me")}
              >
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
export default App;
