const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const jwt = require("jsonwebtoken");

const blacklist = new Set();

const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "No token provided",
    });
  }

  if (blacklist.has(token)) {
    return res.status(401).json({
      success: false,
      message: "Token has been logged out",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        success: false,
        message: "Failed to authenticate token",
      });
    }
    req.userId = decoded.id;
    next();
  });
};
