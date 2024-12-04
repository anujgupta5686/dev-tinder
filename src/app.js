const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
require("dotenv").config();
const database = require("./config/database");
const User = require("./models/user");
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, gender } = req.body;

    // Validate request body
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

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = new User({
      firstName,
      lastName,
      emailId,
      password: hashedPassword,
      age,
      gender,
    });

    // Save user to database
    const savedData = await user.save();

    return res.status(201).json({
      status: true,
      message: "User registered successfully",
      data: savedData,
    });
  } catch (error) {
    console.error("Error during signup:", error.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong during registration",
      error: error.message,
    });
  }
});

// Database connection call
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
