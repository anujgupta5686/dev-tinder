const express = require("express");
const app = express();
// Handle Auth Middleware for Allrequest GET,POST,PUT,PATCH,DELETE

app.get("/getUserData", (req, res) => {
  try {
    throw new Error("Error is detecting in /getUserData");
    res.send("User Data Send");
  } catch (err) {
    res.status(404).send("Some error contact support team!")
  }
});
app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("Something went wrong");
  }
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
