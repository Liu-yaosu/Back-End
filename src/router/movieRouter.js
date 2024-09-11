const { Router } = require("express");
const movieController = require("../controllers/movieController");
const { verifyToken } = require("../middleware/auth.middleware");
const router = Router();
const jwt = require("jsonwebtoken");

const accessValidation = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    return next();
  }
  return res.status(403).json({
    success: false,
    message: "Access Forbidden : Admin Only",
  });
};
router.get("/movie", verifyToken, movieController.getAllMovie);
router.get("/movie/:id", verifyToken, movieController.getMovieById);
router.post(
  "/movie",
  verifyToken,
  accessValidation,
  movieController.createMovie
);
router.put(
  "/movie/:id",
  verifyToken,
  accessValidation,
  movieController.updateMovie
);
router.delete(
  "/movie/:id",
  verifyToken,
  accessValidation,
  movieController.deleteMovie
);
module.exports = router;
