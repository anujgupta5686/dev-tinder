const express = require("express");
const cookieParser = require("cookie-parser");
const appRoute=require("./routes/userAuth");
const app = express();
const database = require("./config/database");
require("dotenv").config();
const PORT = process.env.PORT || 4000;


app.use(express.json());
app.use(cookieParser());
app.use("/api/v1",appRoute);
database()
  .then(() => {
    console.log(
      `\n####################################\n` +
        `| 🛢 Database created successfully  | \n` +
        `####################################`
    );
    app.listen(PORT, () => {
      console.log(
        `\n####################################\n` +
          `|🚀 Server is running on port ${PORT} |\n` +
          `####################################`
      );
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
    process.exit(1);
  });
