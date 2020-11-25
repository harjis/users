import React from "react";
import { Redirect } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

import { LoginForm } from "../LoginForm/LoginForm";

type Props = {
  issuer: string;
};
export const Login: React.FC<Props> = ({ issuer }) => {
  const { authState } = useOktaAuth();

  if (authState.isPending) {
    return <div>Loading...</div>;
  }
  return authState.isAuthenticated ? (
    <Redirect to={{ pathname: "/" }} />
  ) : (
    <LoginForm issuer={issuer} />
  );
};
