const jwt = require("jsonwebtoken");
const secretKey = "your_secret_key"; // Use environment variables in production

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Authorization header

  if (!token) {
    return res.status(403).json({ message: "Token is required" }); // If no token, return 403 Forbidden
  }

  // Verify the token using the secret key
  jwt.verify(token, secretKey, (err, decoded) => {
    if (err) {
      return res.status(403).json({ message: "Invalid token" }); // Invalid token
    }

    // Token is valid, add the decoded user data to the request object
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  });
};

module.exports = verifyToken;
