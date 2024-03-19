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
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }

  static async getFilmsById(req, res) {
    try {
      const filmId = Number(req.params.id);
      if (isNaN(filmId)) {
        // Jika req.params.id tidak dapat diubah menjadi tipe data integer, kirimkan respons dengan pesan kesalahan
        res.status(400).json({ error: "ID pengguna tidak valid" });
        return;
      }

      const result = await prisma.movie.findUnique({
        where: {
          kd: filmId,
        },
      });

      if (!result) {
        // Jika pengguna dengan ID yang diberikan tidak ditemukan, kirimkan respons dengan status 404
        res.status(404).json({ error: "User tidak ditemukan" });
        return;
      }

      // Jika pengguna ditemukan, kirimkan respons dengan data pengguna
      res.status(200).json(result);
    } catch (error) {
      // Tangkap kesalahan yang mungkin terjadi dan kirimkan respons dengan pesan kesalahan yang sesuai
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }

  static async updateFilm(req, res) {
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const result = await prisma.movie.update({
        where: {
          kd: parseInt(req.params.id),
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
          kd: Number(req.params.id),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }
}

module.exports = filmController;
