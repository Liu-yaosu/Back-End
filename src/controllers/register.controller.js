const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class regisController {
  static async register(req, response) {
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10); // Hashing password
      const newUser = await prisma.User.create({
        data: {
          name: req.body.name,
          email: req.body.email,
          password: hashedPassword,
          // Tambahkan properti lainnya sesuai kebutuhan
        },
      });
      return response
        .status(201)
        .json({ message: "Registrasi Berhasil", user: newUser });
    } catch (error) {
      response.status(500).json({ error: error.message });
    }
  }

  // Method loginaccess tidak perlu diimplementasikan di sini karena sudah ada di loginController
}

module.exports = regisController;
