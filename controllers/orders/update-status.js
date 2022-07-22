import Order from "../../models/Order.js";
import { updateStock } from "../../controllers/orders/update-stock.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";

export const UpdateOrderStatus = async (req, res, next) => {
  validationErrorHandler(req, next);
  const { status, id } = req.body;
  const order = await Order.findById(id);
  if (!order) {
    return res.status(404).json({
      message: "Order not found",
    });
  }
  if (order.orderStatus === "Delivered") {
    const error = new Error("Order Already Delivered");
    error.statusCode = 403;
    return next(error);
  }

  if (status === "Shipped") {
    order.orderedProduct.forEach(async (item) => {
      await updateStock(item.productId, item.quantity);
    });
  }
  order.orderStatus = status;
  if (status === "Delivered") {
    order.deliveredAt = Date.now();
    order.isDelivered = true;
  }
  await order.save();
  res.status(200).json({
    message: "Order status updated successfully",
    order,
  });
};
