exports.generatedErorrs = (err, req, res, next) => {
  console.error("Error: ", err);
  const statusCode = err.statusCode || 500;
  if (err.name === "MongoServerError" && err.message.includes("E11000 duplicate key")) {
    err.message = "User with this email address already exists";
  }
  res.status(statusCode).json({
    message: err.message,
    errName: err.name,
    stack: err.stack, // In production, stack: undefined (security best practice)
  });
};
