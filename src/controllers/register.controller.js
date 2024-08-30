const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/validator.js");
const prisma = new PrismaClient();

class regisController {
  static async register(req, response) {
    try {
      if (!req || !req.body) {
        throw new Error("Request body is undefined or missing");
      }
      const checklistjoi = await schema.validateAsync(req.body);
      const salt = await bcrypt.genSalt(10);
      const newUser = await prisma.User.create({
        data: {
          username: checklistjoi.username,
          email: checklistjoi.email,
          password: bcrypt.hashSync(checklistjoi.password, salt),
          role: "user",
          // Tambahkan properti lainnya sesuai kebutuhan
        },
      });
      return response.status(201).json({
        success: true,
        message: "Registrasi Berhasil",
        data: null,
      });
    } catch (error) {
      response.status(500).json({
        success: false,
        message: "Gagal melakukan Registrasi",
        error: error.message,
      });
    }
  }

  // Method loginaccess tidak perlu diimplementasikan di sini karena sudah ada di loginController
}

module.exports = regisController;
