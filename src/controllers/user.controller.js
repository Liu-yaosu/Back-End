const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/validator");
// const bodyparser = require("body-parser");
const prisma = new PrismaClient();

class userController {
  static async getAllUsers(req, res) {
    try {
      const checklistjoi = schema.validateAsync(req.body);
      const result = await prisma.User.findMany({});
      if (!result) {
        res.status(200).json({ error: "Tidak ada data saat ini" });
      }
      res.status(200).json(result);
    } catch (error) {
      res
        .status(500)
        .json({ error: `${error.message}tidak ada data saat ini` });
    }
  }
  static async createUser(req, res) {
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const salt = await bcrypt.getSalt(10);
      const result = await prisma.User.create({
        data: {
          name: checklistjoi.name,
          email: checklistjoi.email,
          password: bcrypt.hashSync(checklistjoi.password, salt),
        },
      });
      if (!result) {
        res.status(400).json({ error: "User tidak dapat dibuat" });
      }
      res.status(201).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
  static async getUserById(req, res) {
    try {
      const result = await prisma.User.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      if (!result) {
        res
          .status(404)
          .json({ error: "User tidak ditemukan dan tidak dapat dibuat" });
      }
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ error: error.message });
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
      res.status(500).json({ error: error.message });
    }
  }
}
module.exports = userController;
