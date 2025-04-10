const nodemailer = require("nodemailer");
const CatchAsyncErrors = require("../middleware/catchAsyncErrors");
const ErrorHandler = require("./errorHandler");

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMPT_HOST,
    port: process.env.SMPT_PORT,
    service: process.env.SMPT_SERVICE, 
    auth: {
      user: process.env.SMPT_MAIL, 
      pass: process.env.SMPT_PASSWORD,
    },
  });

  const mailOptions = {
    from: process.env.SMPT_MAIL,
    to: options.email, 
    subject: options.subject, 
    text: options.message, 
  };

  // Send the email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEmail;

// RESET PASSWORD

const resetPassword = CatchAsyncErrors(async(req , res , next)=> {

})

