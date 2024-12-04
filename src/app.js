const express = require("express");
const app = express();

app.use("/user",(req,res,next)=>{
  // Route handler
  console.log("Handling the Route User!!")
  next();
},(req,res)=>{
  console.log("Handling the Route User 2!!")
  res.send("Response 2")
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
