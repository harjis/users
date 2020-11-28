import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import { Route } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";

import { Frontpage } from "./components/Frontpage/Frontpage";
import { Users } from "./components/Users/Users";

const issuer = "https://dev-556018.okta.com/oauth2/default";
const oktaAuth = new OktaAuth({
  issuer,
  clientId: "0oa6jw73iiZlcYvor357",
  redirectUri: window.location.origin + "/login/callback",
});

const App = () => {
  return (
    <Router>
      <Security oktaAuth={oktaAuth}>
        <Route path="/" exact={true} component={Frontpage} />
        <SecureRoute path="/protected" component={Users} />
        <Route path="/login/callback" component={LoginCallback} />
      </Security>
    </Router>
  );
};
export default App;
