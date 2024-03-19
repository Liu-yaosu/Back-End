const { Router } = require("express");
const filmController = require("../controllers/filmController");
const router = Router();

router.get("/films", filmController.getAllFilms);
router.get("/films/:id", filmController.getAllFilms);
router.post("/films", filmController.createFilms);
router.put("/films/:id", filmController.updateFilm);
router.delete("/films/:id", filmController.deleteFilm);

module.exports = router;
