const express = require("express");
const jwt = require("jsonwebtoken");
const router = express.Router();

router.get("/isTokenExpired", (req, res) => {
  const authHeader = req.get("Authorization");
  if (!authHeader) {
    return res.status(403).json({ message: "No token provided." });
  }

  const token = authHeader.split(" ")[1];
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      if (err.name === "TokenExpiredError") {
        return res.status(401).json({ message: "Token expired." });
      } else {
        return res.status(401).json({ message: "Invalid token." });
      }
    }

    return res.status(200).json({ message: "Token is valid and not expired." });
  });
});

module.exports = router;
