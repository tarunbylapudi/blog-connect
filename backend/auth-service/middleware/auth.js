const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const User = require("../model/User");
const ErrorResponse = require("../utils/ErrorResponse");

//dotenv config
dotenv.config({ path: "config/config.env" });

exports.protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //verfy token
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRECT);
    console.log(decoded);
    req.user = await User.findById(decoded.id);
    next();
  } catch (error) {
    next(error);
  }
};
