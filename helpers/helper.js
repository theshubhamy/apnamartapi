const Coupons = require("../models/Coupons");

// this method will help for writing data
exports.create = async (req, Model) => {
  const data = new Model(req.body);
  return await data.save();
};

// this method will help for general query
exports.read = async (req, Model) => {
  let { limit = 10, skip = 0, term, fields = "" } = req.query;
  let { categoryId } = req.params;

  if (fields) fields = fields.replace(",", " ");
  let query = {};
  if (term) {
    query = {
      name: { $regex: ".*" + term + ".*", $options: "i" },
    };
  }
  if (categoryId) {
    return await Model.find(query, fields)
      .where("categoryId")
      .equals(categoryId)
      .limit(limit)
      .skip(skip * limit);
  }
  return await Model.find(query, fields)
    .limit(limit)
    .skip(skip * limit);
};

// this method will help in getting single record
exports.readOne = async (req, Model) => {
  let { id } = req.params;
  let { fields = "" } = req.query;
  if (fields) fields = fields.replace(",", " ");

  return await Model.findById(id, fields);
};

// this method will help up in updating a document
exports.update = async (req, Model) => {
  return await Model.findByIdAndUpdate(req.params.id, req.body);
};

// this method will delete a record
exports.deleteOne = async (req, Model) => {
  return await Model.deleteOne({ _id: req.params.id });
};

// this will validate the coupon code and returns the discounted price
exports.validateCoupon = async (req) => {
  const { cartValue, couponCode } = req.body;
  // fetch the details of the coupon
  const couponData = await Coupons.findOne({ code: couponCode });
  if (!couponData) {
    return {
      error: true,
      message: "No coupon found",
      amountToPay: cartValue,
    };
  }

  if (cartValue < couponData.minCart) {
    return {
      error: true,
      message: `Cart value should be greater than ${couponData.minCart}`,
      amountToPay: cartValue,
    };
  }

  // here the cart value is greater than min cart
  if (couponData.type === "flat") {
    const amountToPay = +cartValue - +couponData.amount;
    return {
      error: false,
      message: "Discount applied",
      amountToPay,
    };
  } else {
    const amountToPay = +cartValue - (couponData.amount / 100) * +cartValue;
    return {
      error: false,
      message: "Discount applied",
      amountToPay,
    };
  }
};
