const { Router } = require("express");
const userRouter = require("./user.router");
const regisRouter = require("./register.router");
// const filmRouter = require("./filmRoutes");
const categoryRouter = require("./category.router");
const movieRouter = require("./movieRouter");
const loginRouter = require("./login.router");
const router = Router();
router.get("/", (req, res) => {
  res.json("Hello Anjing");
});
router.use(loginRouter);
router.use(userRouter);
router.use(regisRouter);
router.use(categoryRouter);
// router.use(filmRouter);
router.use(movieRouter);
module.exports = router;
