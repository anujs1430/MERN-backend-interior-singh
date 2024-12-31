const express = require("express");
const verifyToken = require("../auth/verifyToken");

const router = express.Router();

// Protected Admin Route
router.get("/admin", verifyToken, (req, res) => {
  res.json({ message: "Welcome to the admin panel!", user: req.user });
});

module.exports = router;
