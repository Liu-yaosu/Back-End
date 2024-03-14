const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/movie.validator");
// membuat instance untuk prisma client
const prisma = new PrismaClient();

// membuat class untuk Produkcontroller
class movieController {
  // membuat static asyncronous function untuk mengambil semua data produk
  static async getAllMovie(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const result = await prisma.Movie.findMany({});
      // check apakah data ada atau tidak
      if (!result) {
        res.status(400).json({ error: "Tidak ada data saat ini" });
      }
      // mengirim respon kepada user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim respon kepada user dengan 500 dan hasil dari error yang sudah di tangkap
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk mengambil data produk berdasarkan id
  static async getMovieById(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const result = await prisma.Movie.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      // mengirim data ke user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim data ke user dengan 400 dan menampilkan pesan error
      res.status(400).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk membuat data produk
  static async createMovie(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const result = await prisma.Movie.create({
        data: { ...checklistjoi },
      });
      res.status(201).json(result);
    } catch (error) {
      // mengirim data ke user dengan 500 dan menampilkan pesan error
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk mengupdate data produk
  static async updateMovie(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const result = await prisma.Movie.update({
        where: {
          id_vd: parseInt(req.params.id_vd),
        },
        data: {
          judul: checklistjoi.judul,
          category: checklistjoi.category,
        },
      });
      // mengirim data ke user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim data ke user dengan 500 dan menampilkan pesan error
      res.status(500).json({ error: error.message });
    }
  }
  // membuat static asyncronous function untuk menghapus data produk
  static async deleteMovie(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const result = await prisma.Movie.delete({
        where: {
          id_vd: parseInt(req.params.id_vd),
        },
      });
      // mengirim data ke user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json(result);
    } catch (error) {
      // mengirim data ke user dengan 500 dan menampilkan pesan error
      res.status(500).json({ error: error.message });
    }
  }
}

// melakukan eksport dari class ProdukController
module.exports = movieController;
