import React from "react";
import { Route } from "react-router-dom";
import { Security, SecureRoute, LoginCallback } from "@okta/okta-react";
import { OktaAuth } from "@okta/okta-auth-js";

import { Home } from "./components/Home/Home";
import { Protected } from "./components/Protected/Protected";

const issuer = "https://dev-556018.okta.com/oauth2/default";
const oktaAuth = new OktaAuth({
  issuer,
  clientId: "0oa6jw73iiZlcYvor357",
  redirectUri: window.location.origin + "/login/callback",
});

export const AppWithRouterAccess = () => {
  return (
    <Security oktaAuth={oktaAuth}>
      <Route path="/" exact={true} component={Home} />
      <SecureRoute path="/protected" component={Protected} />
      <Route path="/login/callback" component={LoginCallback} />
    </Security>
  );
};
