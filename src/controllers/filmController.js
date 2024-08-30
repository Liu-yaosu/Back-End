const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/filmValidator");
// const bcrypt = require("bcrypt");
const bodyparser = require("body-parser");
const prisma = new PrismaClient();

class filmController {
  static async getAllFilms(req, res) {
    try {
      const result = await prisma.movie.findMany({});
      if (result.length === 0) {
        res.status(200).json({ message: "Tidak ada data saat ini" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }

  static async createFilms(req, res) {
    try {
      if (!req || !req.body) {
        throw new Error("Request body is undefined or missing");
      }

      const checklistjoi = await schema.validateAsync(req.body);
      const result = await prisma.movie.create({
        data: {
          movie_name: checklistjoi.movie_name,
          category: checklistjoi.category,
        },
      });
      res.status(201).json({
        success: true,
        message: "Berhasil Menambahkan data",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal menambahkan data",
        error: error.message,
      });
    }
  }

  static async getFilmsById(req, res) {
    // menggunakan try catch untuk menangkap error
    try {
      const result = await prisma.movie.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      // mengirim data ke user dengan 200 dan hasil dari result yang sudah diambil dari database
      res.status(200).json({
        success: true,
        message: "Berhasil menampilkan data",
        data: result,
      });
    } catch (error) {
      // mengirim data ke user dengan 400 dan menampilkan pesan error
      res.status(400).json({ error: error.message });
    }
  }

  static async updateFilm(req, res) {
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const result = await prisma.movie.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          movie_name: checklistjoi.movie_name,
          category: checklistjoi.category,
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }

  static async deleteFilm(req, res) {
    try {
      const result = await prisma.movie.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }
}

module.exports = filmController;
