const catchAsyncErrors = require("./catchAsyncErrors");
const ErrorHandler = require("../utils/errorHandler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.isAuthenticatedUser = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return next(new ErrorHandler("Please Login to This Resources"));
  }

  const decodedData = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decodedData.id);
  next();
});

// roles (if roles would be admin then access the all products otherwise not)

exports.isAdmin = async (req, res, next) => {
  try {
    if (req.user.role == "admin") {
      next();
    } else {
      return res.status(402).json({
        success: false,
        message: "you are not able to access this resources !",
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error?.message || "Something went wrong on checking admin !",
    });
  }
};
