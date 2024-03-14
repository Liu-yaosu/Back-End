//  melakukan Destruktur dari express
const { Router } = require("express");
// memanggil controller yang akan digunakan
const movieController = require("../controllers/movie.controller");
// membuat contraint untuk inisialisasi dari destruktrur Router() dari express
const router = Router();

// router yang di buat pada file ini ( :id adalah parameter yang akan di gunakan)
router.get("/movie", movieController.getAllMovie);
router.get("/movie/:id", movieController.getMovieById);
router.post("/movie", movieController.createMovie);
router.put("/movie/:id", movieController.updateMovie);
router.delete("/movie/:id", movieController.deleteMovie);

// export router agar dapat digunakan pada file lain
module.exports = router;
