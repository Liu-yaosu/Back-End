const express = require("express");
const router = express.Router();
const AuthController = require("../controllers/auth.controller");
const { verifyToken, authorizeRole } = require("../middleware/auth.middleware");

// Route Login
router.post("/login", AuthController.login);

// Route Logout
router.post("/logout", verifyToken, AuthController.logout);

//Route User
// router.get("/users", verifyToken, (req, res) => {
//   res.status(200).json({ message: `Hello ${req.user.username}, Welcome`, });
// });
// Contoh route yang hanya bisa diakses oleh Admin
router.get("/admin", verifyToken, authorizeRole(["admin"]), (req, res) => {
  return res.status(200).json({ message: "Welcome Admin!" });
});

module.exports = router;
