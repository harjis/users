import proxy from "express-http-proxy";
import express from "express";
import bodyParser from "body-parser";

const app = express();

app.use(bodyParser.json());
app.set("port", 5000);

// app.get("/", proxy('localhost:3000/api/users'));
app.get("/", (req, res) => {
  res.send("Welcome to Node Babel");
});

app.listen(5000, "172.18.0.4", () => {
  console.log(`app is listening to port 5000`);
});
