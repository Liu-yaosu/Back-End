const { Router } = require("express");
const jwt = require("jsonwebtoken");
const userController = require("../controllers/user.controller");
const router = Router();
const accessValidation = (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      message: "Token diperlukan",
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
router.get("/users", accessValidation, userController.getAllUsers);
router.get("/users/:id", accessValidation, userController.getUserById);
router.post("/users", userController.createUser);
router.put("/users/:id", userController.updateUser);
router.delete("/users/:id", userController.deleteUser);

module.exports = router;
