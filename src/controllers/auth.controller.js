const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const { blacklistToken } = require("../middleware/auth.middleware");

const secret = process.env.JWT_SECRET;

class AuthController {
  static async login(req, res) {
    try {
      const { username, password } = req.body;

      const user = await prisma.user.findUnique({
        where: { username: username },
      });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      const isPasswordValid = await bcrypt.compare(password, user.password);
      if (!isPasswordValid) {
        return res.status(400).json({ message: "Incorrect password" });
      }
      const token = jwt.sign(
        { id: user.id, username: user.username, role: user.role },
        secret,
        { expiresIn: "2h" } // Token berlaku selama 2 jam
      );

      return res.status(200).json({
        message: "Login successful",
        token,
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
  static async logout(req, res) {
    try {
      const token = req.headers["authorization"]?.split(" ")[1];
      if (!token) {
        return res.status(400).json({
          success: false,
          message: "Token not found",
        });
      }
      await blacklistToken(token);
      return res.status(200).json({
        success: true,
        message: "Logout successfully",
      });
    } catch (error) {
      return res.status(500).json({ message: "Server error", error });
    }
  }
}

module.exports = AuthController;
