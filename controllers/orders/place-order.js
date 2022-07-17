import Order from "../../models/Order.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
export const PlaceOrder = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {
    orderedProduct,
    shippingAddress,
    paymentMethod,
    paymentResult,
    totalAmount,
  } = req.body;
  try {
    const order = new Order({
      userId: req.userId,
      userName: req.name,
      userEmail: req.email,
      userPhone: req.phone,
      orderedProduct,
      shippingAddress,
      paymentMethod,
      paymentResult,
      totalAmount,
      orderStatus: "Processing",
      isPaid: false,
      isDelivered: false,
    });
    await order.save();
    res.status(201).json({
      msg: `Order placed successfully`,
      order,
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};
