const ErrorHandler = require("../utils/errorHandler");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const userModel = require("../models/userModel");
const { sendToken } = require("../utils/jwtToken");
const sendEmail = require("../utils/sendEmail");
const crypto = require("crypto");
const cloudnary = require("cloudinary");

// user registration
exports.registerUser = CatchAsyncErrors(async (req, res, next) => {
  const myCloud = await cloudnary.v2.uploader.upload(req.body.avatar, {
    folder: "avatars",
    width: 150,
    crop: "scale",
  });
  const { name, email, password } = req.body;

  const user = await userModel.create({
    name,
    email,
    password,
    avatar: {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    },
  });

  // Generate and send token
  sendToken(user, 201, res);
});

// use login
exports.loginUser = CatchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Check if email and password are provided
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email and password", 400));
  }

  // Find user and include password
  const user = await userModel.findOne({ email }).select("+password");
  if (!user) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Compare passwords
  const isPasswordMatch = await user.comparePassword(password);
  if (!isPasswordMatch) {
    return next(new ErrorHandler("Invalid email or password", 401));
  }

  // Generate and send token
  sendToken(user, 200, res);
});

// user LOG OUT
exports.logout = CatchAsyncErrors(async (req, res, next) => {
  res.cookie("token", null, {
    expires: new Date(Date.now()),
    httpOnly: true,
  });

  res.status(200).json({
    sucess: true,
    message: "Log Out Sucessfully",
  });
});

// forgot password
exports.forgotPassword = CatchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findOne({ email: req.body.email });

  if (!user) {
    return next(new ErrorHandler("User not found", 404));
  }

  // Get reset password token
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${req.protocol}://${req.get(
    "host"
  )}/password/reset/${resetToken}`;

  const message = `Your password reset token is:\n\n${resetPasswordUrl}\n\nIf you have not requested this, please ignore it.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Ecommerce Password Recovery",
      message,
    });

    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });

    return next(new ErrorHandler(error.message, 500));
  }
});

// reset password
exports.resetPassword = CatchAsyncErrors(async (req, res, next) => {
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await userModel.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(
      new ErrorHandler("Reset password is invalid or has been expired", 400)
    );
  }

  user.password = req.body.password;
  user.resetPsswordToken = undefined;
  user.resetPasswordExpire = undefined;

  await user.save();

  sendToken(user, 200, res);
});

// get user details
exports.getUserDetails = CatchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user.id);

  if (!user) {
    res.status(400).json({
      sucess: false,
      message: `user not found`,
    });
  }

  res.status(200).json({
    sucess: true,
    user,
  });
});

// update user password
exports.updatePassword = CatchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.user.id).select("+password");

  const isMatchPassword = await user.comparePassword(req.body.oldPassword);

  if (!isMatchPassword) {
    return next(new ErrorHandler("old password is incorrect", 400));
  }

  if (req.body.newPassword != req.body.confirmPassword) {
    return next(new ErrorHandler("password does not match"));
  }

  await user.save();

  user.password = req.body.newPassword;

  sendToken(user, 200, res);
});

// updated user profile
exports.updateProfile = CatchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
  };

  // here we are change
  if (req.body.avatar !== "") {
    const user = await userModel.findById(req.user.id);

    const imageId = user.avatar.public_id;

    await cloudnary.v2.uploader.destroy(imageId);

    const myCloud = await cloudnary.v2.uploader.upload(req.body.avatar, {
      folder: "avatars",
      width: 150,
      crop: "scale",
    });

    newUserData.avatar = {
      public_id: myCloud.public_id,
      url: myCloud.secure_url,
    };
  }

  const user = await userModel.findByIdAndUpdate(req.user.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const response = await user.save();

  res.status(200).json({
    sucess: true,
    message: "user updates sucessfully",
    response,
  });
});

//  get All users(Admin)
exports.getAllUsers = CatchAsyncErrors(async (req, res, next) => {
  const users = await userModel.find();

  res.status(200).json({
    "sucess:": true,
    users,
  });
});

// get single details (Admin)
exports.getSingleUser = CatchAsyncErrors(async (req, res, next) => {
  const user = await userModel.findById(req.params.id);

  if (!user) {
    return next(
      new ErrorHandler(`user does not esist on this id: ${req.param.id}`)
    );
  }

  res.status(200).json({
    sucess: true,
    user,
  });
});

// update user role (Admin)
exports.updateUserRole = CatchAsyncErrors(async (req, res, next) => {
  const newUserData = {
    name: req.body.name,
    email: req.body.email,
    role: req.body.role,
  };

  // we will add cloudnary later

  const user = await userModel.findByIdAndUpdate(req.params.id, newUserData, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });

  const response = await user.save();

  res.status(200).json({
    sucess: true,
    message: "user updates sucessfully",
    response,
  });
});

// delete user (Admin)
exports.deleteUser = CatchAsyncErrors(async (req, res, next) => {
  const userId = req.params.id;

  const user = await userModel.findById(userId);

  if (!user) {
    return next(new ErrorHandler(`user is not esixt on id: ${userId}`, 404));
  }

  const imageId = user.avatar.public_id;

  await cloudnary.v2.uploader.destroy(imageId);

  await user.deleteOne();

  res.status(200).json({
    sucess: true,
    message: "user deleted sucessfully",
  });
});
