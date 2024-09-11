const { Router } = require("express");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user.controller");
const { verifyToken, authorizeRole } = require("../middleware/auth.middleware");
const router = Router();
const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Access Denied!!!, Please Login",
    });
  }
  const token = authorization.split(" ")[1];
  const secret = process.env.JWT_SECRET;
  try {
    const jwtDecode = jwt.verify(token, secret);
    req.userData = jwtDecode;
  } catch (error) {
    return res.status(401).json({
      message: "Unauthorized",
    });
  }
  next();
};
router.get("/users", verifyToken, accessValidation, userController.getAllUsers);
router.get("/users/:id", accessValidation, userController.getUserById);
router.post("/users", accessValidation, userController.createUser);
router.put("/users/:id", accessValidation, userController.updateUser);
router.delete("/users/:id", accessValidation, userController.deleteUser);

module.exports = router;
