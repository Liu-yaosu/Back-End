const { Router } = require("express");
const movieController = require("../controllers/movieController");
const router = Router();
const jwt = require("jsonwebtoken");

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
router.get("/movie", accessValidation, movieController.getAllMovie);
router.get("/movie/:id", accessValidation, movieController.getMovieById);
router.post("/movie", accessValidation, movieController.createMovie);
router.put("/movie/:id", movieController.updateMovie);
router.delete("/movie/:id", movieController.deleteMovie);
module.exports = router;
