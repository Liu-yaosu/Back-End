const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/validator.js");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

class userController {
  static async getAllUsers(req, res) {
    try {
      const result = await prisma.User.findMany({});
      if (result.length === 0) {
        res.status(200).json({ message: "Tidak ada data saat ini" });
      } else {
        res.status(200).json(result);
      }
    } catch (error) {
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }

  static async createUser(req, res) {
    try {
      if (!req || !req.body) {
        throw new Error("Request body is undefined or missing");
      }

      const checklistjoi = await schema.validateAsync(req.body);
      const salt = await bcrypt.genSalt(10);
      const result = await prisma.User.create({
        data: {
          name: checklistjoi.name,
          email: checklistjoi.email,
          password: bcrypt.hashSync(checklistjoi.password, salt),
        },
      });
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = Number(req.params.id);
      if (isNaN(userId)) {
        // Jika req.params.id tidak dapat diubah menjadi tipe data integer, kirimkan respons dengan pesan kesalahan
        res.status(400).json({ error: "ID pengguna tidak valid" });
        return;
      }

      const result = await prisma.User.findUnique({
        where: {
          id: userId,
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

  static async updateUser(req, res) {
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const salt = await bcrypt.genSalt(10);
      const result = await prisma.User.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          name: checklistjoi.name,
          email: checklistjoi.email,
          password: bcrypt.hashSync(checklistjoi.password, salt),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: `Terjadi kesalahan: ${error.message}` });
    }
  }

  static async deleteUser(req, res) {
    try {
      const result = await prisma.User.delete({
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

module.exports = userController;
