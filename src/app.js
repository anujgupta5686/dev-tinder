const express = require("express");
const app = express();

// This will match only handle GET call to /user
app.get("/user", (req, res) => {
  res.send({
    name: "Anuj",
    age: 28,
    city: "Pune",
  });
});
app.post("/user", (req, res) => {
  res.send("Data successfully saved to the Database!")
});
app.delete("/user", (req, res) => {
  res.send("Data DELETED Successfully from to the Database!")
});
// This will match all the HTTP method API calls to /test
app.use("/test", (req, res) => {
  res.send("Hello from the /test route!");
});
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
