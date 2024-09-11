const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

class subscriptionController {
  static async getAllSubscription(req, res) {
    try {
      const result = await prisma.subscription.findMany({
        select: {
          id: true,
          name: true,
        },
      });
      res.status(200).json({
        success: true,
        message: "Displays Successfully",
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
  static async getAllSubscriptionById(req, res) {
    try {
      const result = await prisma.subscription.findUnique({
        where: {
          id: parseInt(req.params.id),
        },
        select: {
          id: true,
          name: true,
        },
      });
      if (!result) {
        return res.status(404).json({
          success: false,
          message: "Data Not Found",
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
  static async createSubsription(req, res) {
    try {
      const isAlready = await prisma.subscription.findFirst({
        where: {
          name: req.body.name,
        },
      });
      if (isAlready) {
        return res.status(400).json({
          success: false,
          message: "Subscription Name Is Already",
        });
      }
      const result = await prisma.subscription.create({
        data: {
          name: req.body.name,
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
  static async updatedSubscription(req, res) {
    try {
      const subsId = parseInt(req.params.id);
      const result = await prisma.subscription.update({
        where: {
          id: subsId,
        },
        data: {
          name: req.body.name,
        },
      });
      res.status(200).json({
        success: true,
        message: "Updated Successfully",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Updated Failed",
      });
    }
  }
  static async deletedSubscription(req, res) {
    const { id } = req.params;

    try {
      const isAlready = await prisma.subscription.findFirst({
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
      const result = await prisma.subscription.delete({
        where: {
          id: parseInt(req.params.id),
        },
      });
      res.status(200).json({
        success: true,
        message: "Deleted Successfully",
        data: null,
      });
    } catch (error) {
      return res.status(500).json({
        success: false,
        message: "Deleted Failed",
        error: error.message,
      });
    }
  }
}
module.exports = subscriptionController;
