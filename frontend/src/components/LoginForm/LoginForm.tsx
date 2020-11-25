import React, { ChangeEvent, FormEvent, useState } from "react";
import { useOktaAuth } from "@okta/okta-react";

type Props = {
  issuer: string;
};
export const LoginForm: React.FC<Props> = ({ issuer }) => {
  const { oktaAuth } = useOktaAuth();
  const [sessionToken, setSessionToken] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    oktaAuth
      .signIn({ username, password })
      .then((res) => {
        const sessionToken = res.sessionToken;
        setSessionToken(sessionToken);
      })
      .catch((err) => console.log("Found an error", err));
  };

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.currentTarget.value);
  };

  if (sessionToken) {
    // Hide form while sessionToken is converted into id/access tokens
    return null;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input
          id="username"
          type="text"
          value={username}
          onChange={handleUsernameChange}
        />
      </label>
      <label>
        Password:
        <input
          id="password"
          type="password"
          value={password}
          onChange={handlePasswordChange}
        />
      </label>
      <input id="submit" type="submit" value="Submit" />
    </form>
  );
};
