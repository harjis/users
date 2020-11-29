import proxy from "express-http-proxy";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use("/", proxy("backend:3000"));
app.use(bodyParser.json());

app.listen(5000, () => {
  console.log(`app is listening to port 5000`);
});
