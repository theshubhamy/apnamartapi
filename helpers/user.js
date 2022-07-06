const User = require("../models/User");
const jwt = require("jsonwebtoken");

// adding new user to the database
exports.newUser = async (req) => {
  const { email } = req.body;
  // check if the email is already in the database or not
  let user = await User.findOne({ email });
  if (!user) {
    // if not, add the user in the database with the details from the google auth
    const data = new User(req.body);
    user = await data.save();
  }

  // generate a new json web token here with the user details and return it in the respones
  return jwt.sign({ email }, "somesecret");
};
