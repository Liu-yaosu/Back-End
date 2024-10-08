const { Router } = require("express");
const CategoryController = require("../controllers/category.controller");
const { verifyToken } = require("../middleware/auth.middleware");
const jwt = require("jsonwebtoken");

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
router.get("/category", verifyToken, CategoryController.getAllCategories);
router.get(
  "/category/:id",
  accessValidation,
  CategoryController.getCategoryById
);
router.post(
  "/category",
  verifyToken,
  accessValidation,
  CategoryController.createCategory
);
router.put(
  "/category/:id",
  accessValidation,
  CategoryController.updateCategory
);
router.delete(
  "/category/:id",
  accessValidation,
  CategoryController.deleteCategory
);

module.exports = router;
