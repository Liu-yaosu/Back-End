const { Router } = require("express");
const userRouter = require("./user.router");
const regisRouter = require("./register.router");
const loginRouter = require("./login.router");
const router = Router();
router.get("/", (req, res) => {
  res.json("Hello Anjing");
});
router.use(loginRouter);
router.use(userRouter);
router.use(regisRouter);
module.exports = router;
