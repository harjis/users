import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import { createProxyMiddleware } from "http-proxy-middleware";
import OktaJwtVerifier from "@okta/jwt-verifier";

const oktaJwtVerifier = new OktaJwtVerifier({
  clientId: "0oa6jw73iiZlcYvor357",
  issuer: "https://dev-556018.okta.com/oauth2/default",
});

const app = express();

app.use(cors());
app.use(async (req, res, next) => {
  try {
    if (!req.headers.authorization)
      throw new Error("Authorization header is required");

    const accessToken = req.headers.authorization.trim().split(" ")[1];
    await oktaJwtVerifier.verifyAccessToken(accessToken, "api://default");
    next();
  } catch (error) {
    next(error.message);
  }
});

app.use(
  "/",
  createProxyMiddleware({ target: "http://backend:3000", changeOrigin: true })
);

// This needs to be after all proxys. If it is before all POST requests do not work.
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log(`app is listening to port 5000`);
});
