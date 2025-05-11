const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  }
});

const sendOTPEmail = async (to, otp) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to,
    subject: "Your OTP for Password Reset",
    text: `Your OTP is: ${otp}\n\nIt will expire in 10 minutes.`
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`✅ OTP sent to ${to}`);
  } catch (err) {
    console.error("EMAIL SEND FAILED:", err);
    throw new Error("Failed to send email");
  }
};

module.exports = sendOTPEmail;
