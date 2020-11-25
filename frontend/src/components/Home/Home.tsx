import React from "react";
import { Link, useHistory } from "react-router-dom";
import { useOktaAuth } from "@okta/okta-react";

export const Home = () => {
  const { oktaAuth, authState } = useOktaAuth();
  // const history = useHistory();

  const login = async () => {
    await oktaAuth.signInWithRedirect({ originalUri: "/" });
    // history.push("/login");
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

  return (
    <div>
      <Link to="/">Home</Link>
      <br />
      <Link to="/protected">Protected</Link>
      <br />
      {button}
    </div>
  );
};
