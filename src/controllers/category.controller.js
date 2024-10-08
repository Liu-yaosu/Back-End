const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/categoryValidator");
const { object } = require("joi");
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
        message: "Display Successfully",
        data: categories,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Display Failed",
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
          message: "Category Not Found",
          error: error.message,
        });
      }
      res.status(200).json({
        success: true,
        message: "Display Successfully",
        data: category,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to Display",
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

  static async updateCategory(req, res) {
    try {
      const categoryId = Number(req.params.id);
      const { name } = req.body;
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "No valid fields to update",
        });
      }
      const updatedCategory = await prisma.category.update({
        where: {
          id: categoryId,
        },
        data: {
          name: name,
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

  static async deleteCategory(req, res) {
    const { id } = req.params;
    try {
      const isAlready = await prisma.category.findFirst({
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
      const categoryId = parseInt(req.params.id);
      await prisma.category.delete({ where: { id: categoryId } });
      res.status(200).json({
        success: true,
        message: "Deleted Successfully",
        data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Deleted Failed",
        error: error.message,
      });
    }
  }
}
module.exports = CategoryController;
