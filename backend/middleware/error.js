const ErrorHandler = require("../utils/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error";

  // wrong mongodb id error (Cast error)
  if (err.name === "castError") {
    const message = `Resorces not found invalid: ${err.Path}`;
    err = new ErrorHandler(message, 400);
  }

  // mongoose duplicate error
  if (err.code === 11000) {
    const message = `Dublicate ${Object.keys(err.keyValue)} Entered`;
    err = new ErrorHandler(message, 400);
  }


  // Wrong JWT Token
  if(err.name === "jsonWebTokenError") {
    const message  = 'Json Web Token is Invalid please try again';
    err = new ErrorHandler(message, 400);
  }


  // JWT expired error
  if(err.name === "TokenExpiredError") {
    const message = "json web token is expired try again";
    err = new ErrorHandler(message, 400);
  }

  
  res.status(err.statusCode).json({
    sucess: false,
    message: err.message,
  });
};
