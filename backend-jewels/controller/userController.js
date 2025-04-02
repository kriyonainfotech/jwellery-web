const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { sendOTPEmail } = require("../services/emailService");

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body);

    // Check if all fields are provided
    if (!name || !email || !password) {
      return res.status(400).send({ message: "All fields are required" });
    }

    // Password validation regex
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[M])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    console.log(newUser);
    res.status(201).send({
      success: true,
      message: "User registered successfully",
      user: newUser,
    });
  } catch (err) {
    console.log(err);
    res.status(400).send({ success: false, error: err.message });
  }
};

// Generate OTP and send via email
const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

// User login endpoint
const loginUser = async (req, res) => {
  const { email, password } = req.body;
  console.log(req.body, "user body");
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).send({ message: "User not found" });
    }

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).send({ message: "Invalid credentials" });
    }

    // Generate OTP and send to email
    const otp = generateOTP();
    const otpToken = jwt.sign(
      { otp, userId: user._id },
      process.env.JWT_SECRETKEY,
      {
        expiresIn: "10m",
      }
    );

    console.log(otpToken, "otpt");
    const decodUser = jwt.verify(otpToken, process.env.JWT_SECRETKEY);
    console.log(decodUser, "user");

    console.log(otp);
    // Store OTP in cookie (for validation later)
    res.cookie("otpToken", otpToken, {
      httpOnly: true,
      secure: true, // Only set to true in production (for https)
      maxAge: 10 * 60 * 1000, // 10 minutes
    });

    // Send OTP to user's email
    await sendOTPEmail(email, otp);

    return res.status(200).json({
      success: true,
      message: "OTP sent to email",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      sucess: false,
      message: "Server error",
    });
  }
};

// OTP verification endpoint
const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  const otpToken = req.cookies.otpToken;

  if (!otpToken) {
    return res.status(400).json({ message: "OTP token not found" });
  }

  try {
    // Verify OTP token
    const decoded = jwt.verify(otpToken, process.env.JWT_SECRETKEY);
    console.log(decoded);
    if (decoded.otp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    // OTP is correct, generate authentication token
    const authToken = jwt.sign(
      { userId: decoded.userId },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1h" }
    );

    console.log(authToken, "aT");
    const decodUser = jwt.verify(authToken, process.env.JWT_SECRETKEY);
    console.log(decodUser, "user");

    // Clear OTP token from cookies after verification
    // res.clearCookie("otpToken");

    // Send authentication token
    res.cookie("authToken", authToken, {
      httpOnly: true,
      secure: true, // Only true in production
      maxAge: 60 * 60 * 1000, // 1 hour
    });

    return res.status(200).send({
      success: true,
      message: "Login successful",
      authToken,
    });
  } catch (err) {
    console.error(err);
    return res.status(400).send({
      sucess: false,
      message: "Invalid OTP or OTP expired",
    });
  }
};

// logout
const logout = async (req, res) => {
  res.clearCookie("authToken");

  res.status(200).send({
    success: true,
    message: "Logout successful",
  });
};
module.exports = {
  registerUser,
  loginUser,
  verifyOTP,
  logout,
};
