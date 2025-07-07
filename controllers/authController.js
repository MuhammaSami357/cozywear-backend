// const User = require('../models/User');
// const bcrypt = require('bcryptjs');
// const generateToken = require('../utils/generateToken');
// const sendEmail = require('../Utils/SendEmail');
// const crypto = require('crypto');

// // ✅ Signup
// exports.signup = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: 'User already exists' });

//     const hash = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hash });

//     res.status(201).json({
//       msg: "Signup successful",
//       token: generateToken(user._id),
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // ✅ Login
// exports.login = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'User not found' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

//     res.status(200).json({
//       msg: "Login successful",
//       token: generateToken(user._id),
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // mobile login 

// exports.mobLogin = async (req, res) => {
//   const { email, password } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(400).json({ msg: 'User not found' });

//     const match = await bcrypt.compare(password, user.password);
//     if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

//     res.status(200).json({
//       msg: "Login successful",
//       token: generateToken(user._id),
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };

// // ✅ Mobile Signup (optional logic)
// exports.mobSignup = async (req, res) => {
//   const { name, email, password } = req.body;
//   try {
//     const existing = await User.findOne({ email });
//     if (existing) return res.status(400).json({ msg: 'User already exists' });

//     const hash = await bcrypt.hash(password, 10);
//     const user = await User.create({ name, email, password: hash });

//     res.status(201).json({
//       msg: "Signup successful",
//       token: generateToken(user._id),
//       user: { id: user._id, name: user.name, email: user.email }
//     });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };


// // ✅ Forgot Password
// // exports.forgotPassword = async (req, res) => {
// //   const { email } = req.body;
// //   try {
// //     const user = await User.findOne({ email });
// //     if (!user) return res.status(404).json({ msg: 'User not found' });

// //     const token = crypto.randomBytes(32).toString("hex");
// //     user.resetToken = token;
// //     user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
// //     await user.save();

// //     const resetLink = `http://localhost:3000/reset-password/${token}`;



// //     await sendEmail(
// //       email,
// //       "Reset Your Password",
// //       `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
// //     );

// //     res.json({ msg: "Reset link sent to your email" });
// //   } catch (err) {
// //     res.status(500).json({ msg: err.message });
// //   }
// // };





// exports.forgotPassword = async (req, res) => {
//   const { email } = req.body;

//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ message: "User not found" });

//     const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
//       expiresIn: "10m",
//     });

//     const resetLink = `http://localhost:3000/reset-password/${token}`; // ✅ URL FIXED HERE

//     // Use your mail sending logic here
//     await sendEmail({
//       to: email,
//       subject: "Password Reset Link",
//       html: `<p>Click <a href="${resetLink}">here</a> to reset your password</p>`,
//     });

//     res.status(200).json({ message: "Reset link sent to your email" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Something went wrong" });
//   }
// };





























// // mobile forgot password ...............



// exports.mobForgotPassword = async (req, res) => {
//   const { email } = req.body;
//   try {
//     const user = await User.findOne({ email });
//     if (!user) return res.status(404).json({ msg: 'User not found' });

//     const token = crypto.randomBytes(32).toString("hex");
//     user.resetToken = token;
//     user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
//     await user.save();

//     const resetLink = `http://192.168.18.11:5000/reset-password?token=${token}`;


//     await sendEmail(
//       email,
//       "Reset Your Password",
//       `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
//     );

//     res.json({ msg: "Reset link sent to your email" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };




// // ✅ Reset Password
// exports.resetPassword = async (req, res) => {
//   const { password } = req.body;
// const { token } = req.params;

//   try {
//     const user = await User.findOne({
//       resetToken: token,
//       resetTokenExpiry: { $gt: Date.now() }
//     });

//     if (!user) return res.status(400).json({ msg: 'Invalid or expired token' });

//     const hash = await bcrypt.hash(password, 10);
//     user.password = hash;
//     user.resetToken = undefined;
//     user.resetTokenExpiry = undefined;
//     await user.save();

//     res.json({ msg: "Password reset successful" });
//   } catch (err) {
//     res.status(500).json({ msg: err.message });
//   }
// };



































const User = require('../models/User');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');
const sendEmail = require('../Utils/SendEmail');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

// ✅ Signup
const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(201).json({
      msg: "Signup successful",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Login
const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    res.status(200).json({
      msg: "Login successful",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Mobile Login
const mobLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ msg: 'User not found' });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ msg: 'Invalid credentials' });

    res.status(200).json({
      msg: "Login successful",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Mobile Signup
const mobSignup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ msg: 'User already exists' });

    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({ name, email, password: hash });

    res.status(201).json({
      msg: "Signup successful",
      token: generateToken(user._id),
      user: { id: user._id, name: user.name, email: user.email }
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Forgot Password (Web)
const forgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "10m",
    });

    const resetLink = `http://localhost:3000/reset-password/${token}`;

    await sendEmail(
  email,  // email address (string)
  "Password Reset Link",  // subject
  `<p>Click <a href="${resetLink}">here</a> to reset your password</p>` // HTML body
);

    res.status(200).json({ message: "Reset link sent to your email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

// ✅ Forgot Password (Mobile)
const mobForgotPassword = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ msg: 'User not found' });

    const token = crypto.randomBytes(32).toString("hex");
    user.resetToken = token;
    user.resetTokenExpiry = Date.now() + 3600000; // 1 hour
    await user.save();

    const resetLink = `http://192.168.18.11:3000/reset-password/${token}`


    await sendEmail(
      email,
      "Reset Your Password",
      `<p>Click the link below to reset your password:</p><a href="${resetLink}">${resetLink}</a>`
    );

    res.json({ msg: "Reset link sent to your email" });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
};

// ✅ Reset Password


const resetPassword = async (req, res) => {
  const { password } = req.body;
  const { token } = req.params;

  try {
    console.log("Token from URL:", token);
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);
    if (!user) return res.status(404).json({ msg: "User not found" });

    const hash = await bcrypt.hash(password, 10);
    user.password = hash;
    await user.save();

    res.json({ msg: "Your password has been successfully reset. You can now log in with your new password." });
  } catch (err) {
    return res.status(400).json({ msg: " Reset failed. Link expired or may be invalid  ." });
  }
};

module.exports = {
  signup,
  login,
  forgotPassword,
  resetPassword,
  mobSignup,
  mobLogin,
  mobForgotPassword
};
