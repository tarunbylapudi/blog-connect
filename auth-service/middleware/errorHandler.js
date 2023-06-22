const errorResponse = require("../utils/errorResponse");

const errorHandler = (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

   //mongoose bag object Id
   if (err.name === "CastError") {
    console.log(req.params)
    const message = `Resource not found with id : ${error.value}`;
    error = new ErrorResponse(message, 404);
  } 

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate feild entered";
    error = new errorResponse(message, 400);
  }

  //mongoose validation error
  if (err.name === "ValidationError") {
    error = new errorResponse(err.message, 400);
  }

  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
