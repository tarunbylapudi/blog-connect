const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

const ErrorResponse = require("../utils/ErrorResponse");

//dotenv config
dotenv.config({ path: "config/config.env" });

const protect = async (req, res, next) => {
  let token;
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  //verfy token
  try {
    const decoded = await jwt.verify(token, process.env.JWT_SECRECT);
    
    console.log(decoded);
    req.user = { id: decoded.id };
    console.log(req.user);
    req.headers["x-current-user"] = decoded.id;
    //req.body.user = decoded.id;

    next();
  } catch (error) {
    next(error);
  }
};

module.exports = protect;
