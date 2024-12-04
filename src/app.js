const express = require("express");
const app = express();
const {adminAuth,userAuth}=require("./middlewares/auth");
// Handle Auth Middleware for Allrequest GET,POST,PUT,PATCH,DELETE


app.use("/admin",adminAuth);
app.get("/admin/getAllData", (req, res) => {
  res.send("All data fetch successfully")
});
app.get("/admin/deleteUser", (req, res) => {
  res.send("Deleted user");
});
app.get("/user",userAuth, (req, res) => {
  res.send("User Data Send");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
