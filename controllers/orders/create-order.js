import Order from "../../models/Order.js";
import Razorpay from "razorpay";

export const CreateOrder = async (req, res, next) => {
  const { totalAmount } = req.body;
  try {
    let instance = new Razorpay({
      key_id: process.env.RPAY_KEY_ID,
      key_secret: process.env.RPAY_KEY_SECRET,
    });
    let options = {
      amount: totalAmount * 100, // amount in the smallest currency unit
      currency: "INR",
    };
    instance.orders.create(options, function (err, order) {
      res.status(200).json({
        message: "Order created successfully",
        orderData: order,
      });
    });
  } catch (error) {
    if (!error.statusCode) {
      error.statusCode = 500;
    }
    next(error);
  }
};
