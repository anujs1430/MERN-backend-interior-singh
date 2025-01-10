const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModal = require("../database/modals/userModal");
const verifyToken = require("../auth/verifyToken");

const router = express.Router();
const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Use env variables in production

// API for User Registeration
router.post("/register", async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //if user exist
    const isUserExist = await userModal.findOne({ email });

    if (isUserExist) {
      return res.status(400).json({ message: "User Already Exist" });
    }

    // Hash password and save user
    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new userModal({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(200).json({
      success: true,
      data: newUser,
      message: "User registered successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// API for User Login
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //find the user by email
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //Compare the provided password with the hashed password in the database
    const isPassword = await bcrypt.compare(password, user.password);

    if (!isPassword) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Create JWT Token
    const token = jwt.sign({ id: user._id }, secretKey, { expiresIn: "1h" });

    res.status(200).json({
      success: true,
      token,
      message: "Login successful",
    });
  } catch (error) {
    console.error(error.message);

    res.status(400).json({
      success: false,
      error,
    });
  }
});

// API for get user info only who loggedin
router.get("/getUser", verifyToken, async (req, res) => {
  try {
    const userInfo = await userModal.findById(req.user.id).select("-password");
    if (!userInfo) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }
    res.status(200).json({ success: true, data: userInfo });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// API for user Update info including password
router.put("/updateUser", verifyToken, async (req, res) => {
  try {
    const userID = req.user.id; // Extract user ID from decoded token
    const { name, email, currentPassword, newPassword } = req.body; // Fields to update

    // Validate input
    if (!name && !email && !currentPassword && !newPassword) {
      return res.status(400).json({
        success: false,
        message: "At least one field (name, email, password) must be provided",
      });
    }

    // Fetch the user from the database
    const user = await userModal.findById(userID);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    // Update password if provided
    if (currentPassword && newPassword) {
      // Verify current password
      const isPasswordValid = await bcrypt.compare(
        currentPassword,
        user.password
      );

      if (!isPasswordValid) {
        return res.status(400).json({
          success: false,
          message: "Current password is incorrect",
        });
      }

      // Hash the new password
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user.password = hashedPassword; // Update password in the database
    }

    // Update name and email
    user.name = name;
    user.email = email;

    const updatedUser = await user.save();

    res.status(200).json({
      success: true,
      data: {
        name: updatedUser.name,
        email: updatedUser.email,
      },
      message: "User updated successfully",
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;
