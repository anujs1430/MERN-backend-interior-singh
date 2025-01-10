const jwt = require("jsonwebtoken");
require("dotenv").config(); // Load environment variables
const secretKey = process.env.JWT_SECRET || "your_secret_key"; // Use env variables in production

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extract token

  if (!token) {
    return res.status(403).json({ message: "Token is required" });
  }
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" }); // Do not call next()
    }
    req.user = decoded;
    next(); // Proceed only if the token is valid
  });
};

module.exports = verifyToken;
