const { Router } = require("express");

const CategoryController = require("../controllers/category.controller");

const router = Router();

router.get("/category", CategoryController.getAllCategories);
router.get("/category/:id", CategoryController.getCategoryById);
router.post("/category", CategoryController.createCategory);
router.put("/category/:id", CategoryController.updateCategory);
router.delete("/category/:id", CategoryController.deleteCategory);

module.exports = router;
