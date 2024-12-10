const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const database = require("./config/database");
const User = require("./models/user");
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      emailId,
      password,
      age,
      gender,
      skills,
      about,
      photoUrl,
    } = req.body;

    // Validate request body
    if (!firstName || !emailId || !password || !age || !gender) {
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
      skills,
      about,
      photoUrl,
    });

    // Save user to database
    const savedData = await user.save();

    return res.status(200).json({
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

// Login API
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    if (!emailId || !password) {
      return res.status(400).json({
        status: false,
        message: "All fields are required",
      });
    }
    const checkExistingUser = await User.findOne({ emailId: emailId });
    if (!checkExistingUser) {
      return res.status(404).json({
        status: false,
        message: "Invalid credentials",
      });
    }
    const isMatchPassword = await bcrypt.compare(
      password,
      checkExistingUser.password
    );
    if (isMatchPassword) {
      return res.status(200).json({
        status: true,
        message: "Login successful",
        data: checkExistingUser,
      });
    } else {
      return res.status(401).json({
        status: false,
        message: "Invalid credentials",
      });
    }
  } catch (err) {
    console.error("Error during login:", err.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong during login",
      error: err.message,
    });
  }
});
// Get all the user from the database
app.get("/feed", async (req, res) => {
  try {
    const data = await User.find({});
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "No user found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "User data fetched successfully",
      data,
    });
  } catch (err) {
    console.error("Error during fetching profile:", error.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching profile",
      error: err.message,
    });
  }
});
// Get single user from the database using req.params.
app.get("/user/:userId/:name", async (req, res) => {
  try {
    const { userId, name } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID",
      });
    }
    const user = await User.findOne({
      _id: userId,
      $or: [{ firstName: name }, { lastName: name }],
    });
    if (!user) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    return res.status(200).json({
      status: true,
      message: "Single User fetched successfully",
      user,
    });
  } catch (err) {
    console.error("Error during fetching profile:", error.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while fetching profile",
      error: err.message,
    });
  }
});
// Update data using user id
app.put("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const updatedData = req.body;

    // Validate userId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID",
      });
    }

    const ALLOWED_UPDATE = [
      "photoUrl",
      "about",
      "gender",
      "age",
      "skills",
      "password",
    ];
    const SKILL_LIMIT = 5;

    // Validate update fields
    const isUpdateAllowed = Object.keys(updatedData).every((key) => {
      if (!ALLOWED_UPDATE.includes(key)) return false;

      if (key === "skills") {
        const skills = updatedData.skills;

        // Check if skills is an array
        if (!Array.isArray(skills)) {
          throw new Error("Skills must be an array.");
        }

        // Normalize skills (convert to lowercase)
        const normalizedSkills = skills.map((skill) => skill.toLowerCase());

        // Check for duplicates
        const uniqueSkills = new Set(normalizedSkills);
        if (uniqueSkills.size !== normalizedSkills.length) {
          throw new Error(
            "Duplicate values (case-insensitive) are not allowed in skills."
          );
        }

        // Check if the skills array exceeds the limit
        if (skills.length > SKILL_LIMIT) {
          throw new Error(
            `Skills array should have a maximum of ${SKILL_LIMIT} items.`
          );
        }

        // Overwrite updatedData.skills with normalized skills
        updatedData.skills = Array.from(uniqueSkills);
      }

      return true;
    });

    if (!isUpdateAllowed) {
      return res.status(400).json({
        status: false,
        message: "Invalid update fields.",
      });
    }

    const userData = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "User not found. Please check the user ID.",
      });
    }

    // Success response
    return res.status(200).json({
      status: true,
      message: "User updated successfully",
      data: userData,
    });
  } catch (err) {
    console.error("Error during updating profile:", err.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while updating profile",
      error: err.message,
    });
  }
});

// Delete specific profile
app.delete("/user/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID",
      });
    }
    // Validate userId
    const data = await User.findById(userId);
    if (!data) {
      return res.status(404).json({
        status: false,
        message: "User not found",
      });
    }
    // Delete user data
    const deletedData = await User.findByIdAndDelete(userId);
    // Success response
    return res.status(200).json({
      status: true,
      message: "User deleted successfully",
      data: deletedData,
    });
  } catch (err) {
    console.error("Error during deleting profile:", err.message);
    return res.status(500).json({
      status: false,
      message: "Something went wrong while deleting profile",
      error: err.message,
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
