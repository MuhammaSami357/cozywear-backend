const express = require("express");
const router = express.Router();
const {
  signup,
  login,
  forgotPassword,
  resetPassword,
  mobSignup,
  mobLogin,
  mobForgotPassword,
} = require("../controllers/authController");

// 📌 Signup (name, email, password)
router.post("/signup", signup);

// 📌 Login (email, password)
router.post("/login", login);

// 📌 Forgot password (send email link)
router.post("/forgot-password", forgotPassword);

router.post("/mobile-forgot-password", mobForgotPassword)

// 📌 Reset password (via token)
router.post("/reset-password/:token", resetPassword);


// 📌 Mobile-based signup (for future use)
router.post("/mobile-signup", mobSignup);

// 📌 Mobile-based login (for future use)

router.post("/mobile-login", mobLogin);

module.exports = router;
