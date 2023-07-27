const ErrorResponse = require("../utils/ErrorResponse");

const produceMessage = require("../config/kafkaProducerConfig");

const errorHandler = async (err, req, res, next) => {
  let error = { ...err };

  error.message = err.message;

  //mongoose bad object Id
  if (err.name === "CastError") {
    console.log(req.params);
    const message = `Resource not found with id : ${error.value}`;
    error = new ErrorResponse(message, 404);
  }

  //Mongoose duplicate key
  if (err.code === 11000) {
    const message = "Duplicate feild entered";
    error = new ErrorResponse(message, 400);
  }

  //mongoose validation error
  if (err.name === "ValidationError") {
    error = new ErrorResponse(err.message, 400);
  }
  await produceMessage(error.message);
  res
    .status(error.statusCode || 500)
    .json({ success: false, error: error.message || "Server Error" });
};

module.exports = errorHandler;
