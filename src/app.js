const express = require("express");
const app = express();

app.use("/", (req, res) => {
  res.send("Hello Anuj Kumar Gupta!");
});
app.use("/hello", (req, res) => {
  res.send("Hello Route!");
});
app.use("/test", (req, res) => {
  res.send("Hello from the server!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
