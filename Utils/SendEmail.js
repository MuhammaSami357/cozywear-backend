const nodemailer = require("nodemailer");

const sendEmail = async (to, subject, html) => {
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,        // ✅ FIXED
      pass: process.env.EMAIL_PASS,        // ✅
    },
  });

  const mailOptions = {
    from: `"CozyWear Support" <${process.env.EMAIL_USER}>`,  // ✅ FIXED
    to,
    subject,
    html,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`Reset link sent to: ${to}`);
  } catch (error) {
    console.error("Email sending failed:", error);   // ✅ Check this in console
    throw error;
  }
};

module.exports = sendEmail;
