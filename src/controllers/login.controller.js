const bcrypt = require("bcrypt");
const httperror = require("http-error");
const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { func } = require("joi");
const prisma = new PrismaClient();

class loginController {
  static async loginaccess(req, response) {
    try {
      const result = await prisma.User.findMany({
        where: {
          nama: req.body.name,
        },
      });
      if (!result) {
        response.status(404).json({ error: "User ttidak ditemukan" });
      }
      const checklistjoi = await bcrypt.compare(
        req.body.password,
        result[0].password
      );
      console.log(checkbcrypt);
      if (!checkbcrypt) {
        next(response.status(400).json({ error: "Password salah" }));
      }
      return response.status(200).json({ message: "Login Berhasil" });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }
}
module.exports = loginController;
