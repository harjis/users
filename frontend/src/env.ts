// Env variables need to have REACT_APP prefix in order to get picked up by CRA
let oktaClientId: string;
if (!process.env.REACT_APP_OKTA_CLIENTID) {
  throw new Error("Please define: REACT_APP_OKTA_CLIENTID");
} else {
  oktaClientId = process.env.REACT_APP_OKTA_CLIENTID;
}

let oktaIssuer: string;
if (!process.env.REACT_APP_OKTA_ISSUER) {
  throw new Error("Please define: REACT_APP_OKTA_ISSUER");
} else {
  oktaIssuer = process.env.REACT_APP_OKTA_ISSUER;
}

export { oktaClientId, oktaIssuer };
