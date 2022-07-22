import Order from "../../models/Order.js";
export const DeleteOrder = async (req, res) => {
  const order = await Order.findById(req.params.id);
  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }
  await order.remove();
  res.status(200).json({
    message: "Order deleted successfully",
  });
};
