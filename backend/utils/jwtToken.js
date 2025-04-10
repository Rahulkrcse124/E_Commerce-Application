// create a token and saving cokkie
exports.sendToken = (user, statusCode, res)=> {

  const token = user.getJWTToken();

  // option for cookie
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE*24*60*60*1000 // after 7 days cookie will be expire 
    ),
    httpOnly: true
  };

  res.status(statusCode).cookie("token",token, options).json({
    sucess: true,
    user,
    token
  });
};