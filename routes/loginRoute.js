const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const userModal = require("../database/modals/userModal");

const router = express.Router();
const secretKey = "your_secret_key"; // Use environment variables in production

// API for User Registeration
router.post("/", async (req, res) => {
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

    await newUser().save();

    res.status(200).json({
      success: true,
      data: newUser,
      message: "User registered successfully",
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
});

// API for User Login
router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    //find the user by email
    const user = await userModal.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    //Compare the provided password with the hashed password in the database
    const isPassword = await bcrypt.compare(password, userModal.password);

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

module.exports = router;
