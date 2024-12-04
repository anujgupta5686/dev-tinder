const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
require("dotenv").config();
const database = require("./config/database");
const User = require("./models/user");
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.post("/signup", async (req, res) => {
  const { firstName, lastName, emailId, password, age, gender } = req.body;
  //  validate
  if (!firstName || !lastName || !emailId || !password || !age || !gender) {
    return res.status(400).json({
      status: false,
      message: "All fields are required",
    });
  }

  // Check if user already exists
  const existingUser = await User.findOne({ emailId });
  if (existingUser) {
    return res.status(400).json({
      status: false,
      message: "User already exists with this email ID",
    });
  }
  // Hashing password before saving it into the database.
  const hashedPassword = await bcrypt.hash(password, 10);
  const data = {
    firstName,
    lastName,
    emailId,
    password: hashedPassword,
    age,
    gender,
  };
  // Creating a new instance of the user model.
  const user = new User(data);
  try {
    const savedData = await user.save();
    if (savedData) {
      res.status(200).json({
        status: true,
        message: "User registered successfully",
        data: savedData,
      });
    } else {
      res.status(500).json({
        status: false,
        message: "Failed to register user",
      });
    }
  } catch (err) {
    res.status(500).json({
      status: false,
      message: "Something went wrong with your registration",
      error: err.message,
    });
  }
});

// Database connection call
database()
  .then(() => {
    console.log("Database connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to the database", err);
    process.exit(1);
  });
