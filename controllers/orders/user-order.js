import Order from "../../models/Order.js";
export const getUserOrders = async (req, res) => {
  const userId = req.userId;
  try {
    const orders = await Order.find({ userId });
    if (!orders) {
      return res.status(404).json({
        message: "No orders found",
      });
    }
    res.status(200).json({
      msg: `Order fetched successfully`,
      orders,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
