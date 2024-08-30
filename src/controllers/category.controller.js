const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/categoryValidator");
const prisma = new PrismaClient();

class CategoryController {
  static async getAllCategories(req, res) {
    try {
      const categories = await prisma.category.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      res.status(200).json({
        success: true,
        message: "Data Berhasil ditampilkan",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal menampilkan data",
        error: error.message,
      });
    }
  }
  static async getCategoryById(req, res) {
    try {
      const categoryId = parseInt(req.params.id);
      const category = await prisma.category.findUnique({
        where: {
          id: categoryId,
        },
        select: {
          id: true,
          name: true,
        },
      });
      if (!category) {
        return res.status(404).json({
          success: false,
          message: "Category not found",
          error: error.message,
        });
      }
      res.status(200).json({
        success: true,
        message: "Berhasil Menampilkan Kategori",
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal Menampilkan Kategori",
        error: error.message,
      });
    }
  }

  static async createCategory(req, res) {
    try {
      const checklistjoi = await schema.validateAsync(req.body);
      const { ...category } = checklistjoi;
      const newCategory = await prisma.category.create({
        data: {
          ...category,
        },
      });
      res.status(201).json({
        success: true,
        message: "Berhasil Menambahkan Kategori",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal Menambahkan Kategori",
        error: error.message,
      });
    }
  }

  static async updateCategory(req, res) {
    try {
      const categoryId = parseInt(req.params.id);
      const { category_name } = req.body;
      const updatedCategory = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: { category_name },
      });
      res.status(200).json({
        success: true,
        message: "Data Telah Diubah",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal Mengubah Data",
        error: error.message,
      });
    }
  }

  static async deleteCategory(req, res) {
    try {
      const categoryId = parseInt(req.params.id);
      await prisma.category.delete({ where: { id: categoryId } });
      res.status(200).json({
        success: true,
        message: "Category deleted successfully",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Gagal Menghapus Data",
        error: error.message,
      });
    }
  }
}

module.exports = CategoryController;
