const { Router } = require("express");
const loginController = require("../controllers/login.controller");
// const verifyToken = require("../middleware/verifyToken");
const router = Router();
router.get("/login");
router.post("/login", loginController.loginaccess);
router.delete("/logout", loginController.logout);
module.exports = router;
