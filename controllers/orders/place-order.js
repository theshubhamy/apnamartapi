import Order from "../../models/Order.js";
import { validationErrorHandler } from "../../helpers/validation-error-handler.js";
export const PlaceOrder = async (req, res, next) => {
  validationErrorHandler(req, next);
  const {
    userName,
    userEmail,
    userPhone,
    orderedProduct,
    shippingAddress,
    razorpay,
    paymentStatus,
    totalAmount,
  } = req.body;
  try {
    const order = new Order({
      userId: req.userId,
      name: userName,
      email: userEmail,
      phone: userPhone,
      orderedProduct,
      shippingAddress,
      razorpay,
      totalAmount,
      paymentStatus,
      orderStatus: "Processing",
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
