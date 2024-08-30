const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/validator.js");
const bcrypt = require("bcrypt");
const prisma = new PrismaClient();

class userController {
  static async getAllUsers(req, res) {
    try {
      const result = await prisma.User.findMany({
        select: {
          id: true,
          username: true,
          email: true,
          role: true,
        },
      });
      if (result.length === 0) {
        res.status(200).json({ message: "Tidak ada data saat ini" });
      } else {
        res.status(200).json({
          success: true,
          message: "Data berhasil ditampilkan",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Data gagal ditampilkan",
        error: error.message,
      });
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
          username: checklistjoi.username,
          email: checklistjoi.email,
          password: bcrypt.hashSync(checklistjoi.password, salt),
          role: "user",
        },
      });
      res.status(201).json({
        success: true,
        message: "Data berhasil ditambah",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal Menambah Data",
        error: error.message,
      });
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
        select: {
          id: true,
          username: true,
          email: true,
          password: true,
          role: true,
        },
      });

      if (!result) {
        // Jika pengguna dengan ID yang diberikan tidak ditemukan, kirimkan respons dengan status 404
        res.status(404).json({
          success: false,
          message: "User tidak ditemukan",
          error: schema.error.message,
        });
        return;
      }
      // Jika pengguna ditemukan, kirimkan respons dengan data pengguna
      res.status(200).json({
        success: true,
        message: "Data berhasil ditampilkan",
        data: result,
      });
    } catch (error) {
      // Tangkap kesalahan yang mungkin terjadi dan kirimkan respons dengan pesan kesalahan yang sesuai
      res.status(500).json({
        success: false,
        message: "Gagal menampilkan data",
        error: error.message,
      });
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
          username: checklistjoi.username,
          email: checklistjoi.email,
          password: bcrypt.hashSync(checklistjoi.password, salt),
          role: "user",
        },
      });
      res.status(200).json({
        success: true,
        message: "Data berhasil diubah",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal mengubah data",
        error: error.message,
      });
    }
  }

  static async deleteUser(req, res) {
    const { id } = req.params;
    try {
      const isAlready = await prisma.User.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!isAlready) {
        return res.status(404).json({
          success: false,
          message: "Data tidak ada",
          data: null,
        });
      }
      const result = await prisma.User.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({
        success: true,
        message: "Data telah terhapus",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        message: "Data gagal dihapus",
        error: error.message,
      });
    }
  }
}

module.exports = userController;
