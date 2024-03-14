const { Router } = require("express");
const userRouter = require("../router/user.router");
const regisRouter = require("../router/register.router");
const loginRouter = require("../router/login.router");
const router = Router();
router.get("/", (req, res) => {
  res.json("Hello Anjing");
});
router.use(loginRouter);
router.use(userRouter);
router.use(regisRouter);
module.exports = router;
