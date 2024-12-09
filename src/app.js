const express = require("express");
const bcrypt = require("bcrypt");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const database = require("./config/database");
const User = require("./models/user");
const PORT = process.env.PORT || 4000;
app.use(express.json());
app.post("/signup", async (req, res) => {
  try {
    const { firstName, lastName, emailId, password, age, gender,skills,about,photoUrl } = req.body;

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
      photoUrl
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

    console.log("Updated Data:", updatedData);
    console.log("User ID:", userId);

    // Validate userId
    if (!mongoose.isValidObjectId(userId)) {
      return res.status(400).json({
        status: false,
        message: "Invalid user ID",
      });
    }

    // Update user data
    const userData = await User.findByIdAndUpdate(
      userId,
      { $set: updatedData }, // Set the fields to update
      { new: true }, // Return updated document and validate updates
      {runValidators: true}
    );

    // Check if user exists
    if (!userData) {
      return res.status(404).json({
        status: false,
        message: "Data not found using This UserID, Please once chech user Id.",
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
