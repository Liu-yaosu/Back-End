const { Router } = require("express");
const subsUserController = require("../controllers/subsUser.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const router = Router();

const accessValidation = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access Forbidden : Admin Only",
  });
};

router.get("/usersubs", verifyToken, subsUserController.getAllSubs);
router.get("/usersubs/:id", verifyToken, subsUserController.getAllSubsById);
router.post(
  "/usersubs",
  verifyToken,
  accessValidation,
  subsUserController.createSubsUser
);
router.put(
  "/usersubs/:id",
  verifyToken,
  accessValidation,
  subsUserController.updatedSubsUser
);
router.delete(
  "/usersubs/:id",
  verifyToken,
  accessValidation,
  subsUserController.deletedSubsUser
);

module.exports = router;
