function errorHandler(err, req, res, next) {
  // Log to console for development
  // console.log(err);

  let message = err.message;
  let statusCode = err.statusCode;

  // Mongoose bad ObjectID
  if (err.name === "CastError") {
    message = `Resource not found with id ${err.value}`;
    statusCode = 404;

    // Mongoose duplicate key
  } else if (err.code === 11000) {
    message = "Duplicate field value entered";
    statusCode = 400;

    // Mongoose validation error
  } else if (err.name === "ValidationError") {
    message = Object.values(err.errors).map((val) => val.message);
    statusCode = 400;
  }

  res.status(statusCode || 500).json({
    success: false,
    error: message || "Server Error",
  });
}

module.exports = errorHandler;
