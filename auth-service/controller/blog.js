const User = require("../model/User");
const ErrorResponse = require("../utils/ErrorResponse");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    //console.log(name, email, password);
    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);
    console.log("login Called");

    //validate email password
    if (!email || !password) {
      throw new ErrorResponse("Please provide an email and a password", 400);
    }

    //check for the user
    const user = await User.findOne({ email }).select("+password");

    console.log(user);

    if (!user) {
      throw new ErrorResponse("unregistered User", 400);
    }

    //chech for password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      throw new ErrorResponse("invalid credentials", 400);
    }

    const token = user.getSignedJwtToken();

    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

