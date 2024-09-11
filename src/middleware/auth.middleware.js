const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

const secret = process.env.JWT_SECRET;

// Middleware untuk verifikasi token JWT
const verifyToken = async (req, res, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access Denied, No token provided" });
  }

  // Cek apakah token ada di dalam blacklist database
  const blacklistedToken = await prisma.blackListToken.findUnique({
    where: { token: token },
  });

  if (blacklistedToken) {
    return res.status(403).json({
      message: "Token has been logged out and cannot be used anymore",
    });
  }

  try {
    // Verifikasi token
    const decoded = jwt.verify(token, secret);
    req.user = decoded; // Menyimpan informasi user dari token ke req
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or Expired Token" });
  }
};

// Fungsi untuk menambahkan token ke tabel blacklist di database
const blacklistToken = async (token) => {
  try {
    await prisma.blackListToken.create({
      data: {
        token: token,
      },
    });
  } catch (error) {
    console.error("Error blacklisting token:", error);
    throw new Error("Unable to blacklist token");
  }
};
// Middleware untuk otorisasi berdasarkan role
const authorizeRole = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: "Access Denied, You do not have the required role",
      });
    }
    next();
  };
};
module.exports = { verifyToken, authorizeRole, blacklistToken };
