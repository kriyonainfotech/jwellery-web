const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "saaraatrends@gmail.com",
    pass: "yrtg sciu dlha juyz",
  },
});

const sendOTPEmail = (email, otp) => {
  const mailOptions = {
    from: "saaraatrends@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is: ${otp}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };
