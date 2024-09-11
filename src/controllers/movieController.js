const { PrismaClient } = require("@prisma/client");
const schema = require("../validator/movieValidator");
const prisma = new PrismaClient();

class movieController {
  static async getAllMovie(req, res) {
    try {
      const result = await prisma.film.findMany({
        select: {
          movie_id: true,
          movie_title: true,
          description: true,
          movie_url: true,
          categoryId: true,
        },
      });

      if (!result) {
        res.status(404).json({ error: "Data Not Found" });
      }
      res.status(200).json({
        success: true,
        message: "Display Successfully",
        data: result,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Display Failed",
        error: error.message,
      });
    }
  }

  static async getMovieById(req, res) {
    try {
      const result = await prisma.film.findUnique({
        where: {
          movie_id: parseInt(req.params.id),
        },
        select: {
          movie_id: true,
          movie_title: true,
          description: true,
          movie_url: true,
          categoryId: true,
        },
      });
      res.status(200).json({
        success: true,
        message: "Display Successfully",
        data: result,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Display Failed",
        error: error.message,
      });
    }
  }
  static async createMovie(req, res) {
    try {
      const categoryId = parseInt(req.body.categoryId);

      if (!categoryId) {
        return res.status(400).json({ error: "Invalid Category ID or Name" });
      }

      const result = await prisma.film.create({
        data: {
          movie_title: req.body.movie_title,
          description: req.body.description,
          movie_url: req.body.movie_url,
          category: {
            connect: {
              id: categoryId,
            },
          },
        },
      });
      res.status(200).json({
        success: true,
        message: "Added Successfully",
        Data: null,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Added Failed",
        error: error.message,
      });
    }
  }
  static async updateMovie(req, res) {
    try {
      const categoryId = parseInt(req.body.categoryId);
      if (!categoryId) {
        return res.status(400).json({ error: "Invalid Category ID or Name" });
      }
      const result = await prisma.film.update({
        where: {
          movie_id: parseInt(req.params.id),
        },
        data: {
          movie_title: req.body.movie_title,
          description: req.body.description,
          movie_url: req.body.movie_url,
          categoryId: categoryId,
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
      }); ///pada bagian error message masih menampilkan success message
    }
  }
  static async deleteMovie(req, res) {
    const { id } = req.params;

    try {
      const isAlready = await prisma.film.findFirst({
        where: {
          movie_id: Number(id),
        },
      });

      if (!isAlready) {
        return res.status(404).json({
          success: false,
          message: "Data Not Found",
          data: null,
        });
      }

      const result = await prisma.film.delete({
        where: {
          movie_id: parseInt(req.params.id),
        },
      });

      return res.status(200).json({
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
module.exports = movieController;
