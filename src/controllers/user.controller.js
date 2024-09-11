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
        res.status(200).json({ message: "Data Not Found" });
      } else {
        res.status(200).json({
          success: true,
          message: "Display Successfully",
          data: result,
        });
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Display Failed",
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
        message: "Added Successfully",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Added Failed",
        error: error.message,
      });
    }
  }

  static async getUserById(req, res) {
    try {
      const userId = Number(req.params.id);
      if (isNaN(userId)) {
        // Jika req.params.id tidak dapat diubah menjadi tipe data integer, kirimkan respons dengan pesan kesalahan
        res.status(400).json({ error: "ID User Not Valid" });
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
          message: "User Not Found",
          error: schema.error.message,
        });
        return;
      }
      // Jika pengguna ditemukan, kirimkan respons dengan data pengguna
      res.status(200).json({
        success: true,
        message: "Display Successfully",
        data: result,
      });
    } catch (error) {
      // Tangkap kesalahan yang mungkin terjadi dan kirimkan respons dengan pesan kesalahan yang sesuai
      res.status(500).json({
        success: false,
        message: "Display Failed",
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
        message: "Updated Successfully",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Updated Failed",
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
          message: "Data Not Found",
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
        message: "Deleted Successfully",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: true,
        message: "Deleted Failed",
        error: error.message,
      });
    }
  }
}

module.exports = userController;
