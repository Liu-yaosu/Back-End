const { PrismaClient } = require("@prisma/client");
const { connect } = require("../router/auth.router");
const subscriptionController = require("./subscription.controller");
const prisma = new PrismaClient();

class subsUserController {
  static async getAllSubs(req, res) {
    try {
      const result = await prisma.subscription_user.findMany({
        select: {
          id: true,
          subscription: {
            select: {
              name: true,
            },
          },
          User: {
            select: {
              username: true,
            },
          },
        },
      });
      res.status(200).json({
        success: true,
        message: "Display Successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Display Failed",
        error: error.message,
      });
    }
  }
  static async getAllSubsById(req, res) {
    try {
      const result = await prisma.subscription_user.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        select: {
          id: true,
          subscription: {
            select: {
              name: true,
            },
          },
          User: {
            select: {
              username: true,
            },
          },
        },
      });
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "ID Not Found",
        });
      }
      res.status(200).json({
        success: true,
        message: "Display Successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Display Failed",
        error: error.message,
      });
    }
  }
  static async createSubsUser(req, res) {
    try {
      const subscriptionId = parseInt(req.body.subscriptionId);
      const userId = parseInt(req.body.userId);
      if (!subscriptionId) {
        return res.status(404).json({
          success: false,
          message: "Invalid ID Subscription",
        });
      }
      if (!userId) {
        return res.status(404).json({
          success: false,
          message: "Invalid UserID",
        });
      }
      const result = await prisma.subscription_user.create({
        data: {
          subscription: {
            connect: {
              id: subscriptionId,
            },
          },
          User: {
            connect: {
              id: userId,
            },
          },
        },
      });
      res.status(200).json({
        success: true,
        message: "Created Data Successfully",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Created Data Failed",
        error: error.message,
      });
    }
  }
  static async updatedSubsUser(req, res) {
    try {
      const subscriptionId = Number(req.body.subscriptionId);
      const userId = Number(req.body.userId);
      const subscription = await prisma.subscription.findUnique({
        where: {
          id: subscriptionId,
        },
      });
      const user = await prisma.user.findUnique({
        where: {
          id: userId,
        },
      });
      if (!subscription) {
        return res.status(404).json({
          success: false,
          messege: "Id Subscription Invalid",
        });
      }
      if (!user) {
        return res.status(404).json({
          success: false,
          message: "Invalid UserID",
        });
      }
      const result = await prisma.subscription_user.update({
        where: {
          id: parseInt(req.params.id),
        },
        data: {
          subscription: {
            connect: {
              id: subscriptionId,
            },
          },
          User: {
            connect: {
              id: userId,
            },
          },
        },
      });
      res.status(200).json({
        success: true,
        message: "Updated Data Successfully",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Updated Data Failed",
        error: error.message,
      });
    }
  }
  static async deletedSubsUser(req, res) {
    const { id } = req.params;
    try {
      const isAlready = await prisma.subscription_user.findFirst({
        where: {
          id: Number(id),
        },
      });
      if (!isAlready) {
        return res.status(404).json({
          success: false,
          message: "Id INVALID",
        });
      }
      const result = await prisma.subscription_user.delete({
        where: {
          id: Number(req.params.id),
        },
      });
      res.status(200).json({
        success: true,
        message: "Deleted data Successfully",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Deleted Data Failed",
        error: error.message,
      });
    }
  }
}
module.exports = subsUserController;
