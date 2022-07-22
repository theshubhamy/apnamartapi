import Order from "../../models/Order.js";
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find();
    if (!orders) {
      return res.status(404).json({
        message: "No orders found",
      });
    }
    let TotalAmount = 0;
    orders.forEach((order) => {
      TotalAmount += order.totalAmount;
    });
    res.status(200).json({
      msg: `Order feched successfully`,
      orders,
      TotalAmount,
    });
  } catch (error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
