const { Router } = require("express");
const subscriptionController = require("../controllers/subscription.controller");
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

router.get(
  "/subscription",
  verifyToken,
  subscriptionController.getAllSubscription
);
router.get(
  "/subscription/:id",
  verifyToken,
  subscriptionController.getAllSubscriptionById
);
router.post(
  "/subscription",
  verifyToken,
  accessValidation,
  subscriptionController.createSubsription
);
router.put(
  "/subscription/:id",
  verifyToken,
  accessValidation,
  subscriptionController.updatedSubscription
);
router.delete(
  "/subscription/:id",
  verifyToken,
  accessValidation,
  subscriptionController.deletedSubscription
);

module.exports = router;
