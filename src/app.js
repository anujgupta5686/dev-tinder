const express = require("express");
const app = express();

// This will match only handle GET call to /user
app.get("/user/:userId/:name/:password", (req, res) => {
  console.log(req.params);
  res.send({
    name: "Anuj",
    age: 28,
    city: "Pune",
  });
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
