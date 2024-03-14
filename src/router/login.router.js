const { Router } = require("express");
const loginController = require("../controllers/login.controller");
const router = Router();
router.get("/login");
router.post("/login", loginController.loginaccess);
module.exports = router;
