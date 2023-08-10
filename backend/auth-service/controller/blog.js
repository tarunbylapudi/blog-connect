const User = require("../model/User");
const ErrorResponse = require("../utils/ErrorResponse");
const produceMessage = require("../config/kafkaProducerConfig");

exports.register = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    const user = await User.create({ name, email, password });

    //console.log(name, email, password);
    const token = user.getSignedJwtToken();
    await produceMessage(`User registration successfull with ID: ${user.id}`);
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    console.log(email, password);

    //validate email password
    if (!email || !password) {
      throw new ErrorResponse("Please provide an email and a password", 400);
    }

    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!regex.test(email)) {
      await produceMessage("Please add a valid email");
      throw new ErrorResponse("Please add a valid email", 400);
    }
    //check for the user
    const user = await User.findOne({ email }).select("+password");

    //console.log(user);

    if (!user) {
      await produceMessage("User unrigistered");
      throw new ErrorResponse("unregistered User", 400);
    }

    //chech for password match
    const isMatch = await user.matchPassword(password);

    if (!isMatch) {
      await produceMessage("invalid password");
      throw new ErrorResponse("invalid password", 400);
    }

    const token = user.getSignedJwtToken();
    await produceMessage(`User logged in successfully with ID: ${user.id}`);
    res.status(200).json({ success: true, token });
  } catch (error) {
    next(error);
  }
};
