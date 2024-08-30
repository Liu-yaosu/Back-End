const { Router } = require("express");
const filmController = require("../controllers/filmController");
const router = Router();

router.get("/films", filmController.getAllFilms);
router.get("/films/:kd", filmController.getAllFilms);
router.post("/films", filmController.createFilms);
router.put("/films/:kd", filmController.updateFilm);
router.delete("/films/:kd", filmController.deleteFilm);

module.exports = router;
