const bcrypt = require("bcrypt");
const createError = require("http-errors");
const { PrismaClient } = require("@prisma/client");
const { response } = require("express");
const { func } = require("joi");
const jwt = require("jsonwebtoken");
const { message } = require("../validator/validator");
const prisma = new PrismaClient();

class loginController {
  static async loginaccess(req, response) {
    try {
      const result = await prisma.User.findMany({
        where: {
          username: req.body.username,
        },
      });
      const checkpassword = result[0].password;
      if (!result.length) {
        throw createError(404, "User tidak ditemukan");
      }
      const checkbcrypt = await bcrypt.compare(
        req.body.password,
        checkpassword
      );
      console.log(checkbcrypt);
      if (!checkbcrypt) {
        throw createError(400, "Password salah");
      }
      const payload = {
        id: result[0].id,
        username: result[0].username,
        email: result[0].email,
      };
      const secret = process.env.JWT_SECRET;
      const expiresIn = 60 * 60 * 2;
      const token = jwt.sign(payload, secret, { expiresIn: expiresIn });

      if (result[0].role === "admin") {
        return response.status(200).json({
          success: true,
          message: "Selamat Datang Admin",
          data: null,
          token,
        });
      } else {
        return response.status(200).json({
          success: true,
          message: "Selamat Datang User",
          data: null,
          token,
        });
      }

      // const isPasswordValid = await bcrypt.compare(password, User.password);
      // if (isPasswordValid) {
      //   return response.json({
      //     data: {
      //       id: User.id,
      //       name: User.name,
      //       email: User.email,
      //     },
      //   });
      // }

      // return response.status(200).json({
      //   message: "Login Berhasil,  silahkan buka http://localhost:5000/film",
      //   token,
      // });
    } catch (error) {
      console.error(error, "error");
      response.status(500).json({ error: error.message });
    }
  }
}
module.exports = loginController;
