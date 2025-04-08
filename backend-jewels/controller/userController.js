// controllers/userController.js
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { validateRegisterData } = require("../middleware/authmiddleware"); // your existing validation

exports.registerUser = async (req, res) => {
  try {
    console.log("🚀 Registering user...");

    const { name, email, phone, password, address } = req.body;

    // 🔍 Validate Email & Password
    try {
      validateRegisterData(email, password);
    } catch (err) {
      console.error("❌ Validation Error:", err.message);
      return res.status(400).json({ message: err.message });
    }

    // 🔎 Check existing email / phone
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      console.warn("⚠️ Email already exists");
      return res.status(400).json({ message: "Email already exists" });
    }

    const existingPhone = await User.findOne({ phone });
    if (existingPhone) {
      console.warn("⚠️ Phone already exists");
      return res.status(400).json({ message: "Phone number already exists" });
    }

    // 🔐 Hash Password
    const hashedPassword = await bcrypt.hash(password, 10);

    // ✅ Create New User
    const user = await User.create({
      name,
      email,
      phone,
      password: hashedPassword,
      address,
    });

    console.log("✅ User created:", user.email);

    // 🎫 Create Token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    // 🍪 Set Cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(201)
      .json({
        message: "🎉 Registration successful!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
        },
      });
  } catch (err) {
    console.log("🔥 Registration failed:", err);
    res
      .status(500)
      .json({ success: false, smessage: "Server error: " + err.message });
  }
};

// Generate OTP and send via email
// const generateOTP = () => {
//   return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
// };

// User login endpoint
exports.loginUser = async (req, res) => {
  try {
    console.log("🔐 Login attempt started...");

    const { email, password } = req.body;

    if (!email || !password) {
      console.warn("⚠️ Email or password missing");
      return res
        .status(400)
        .json({ message: "Email and password are required." });
    }

    // 🔎 Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      console.warn("❌ No user found with this email");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🔐 Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.warn("❌ Incorrect password");
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // 🎫 Generate Token
    const token = jwt.sign(
      { id: user._id, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    // 🍪 Set Cookie
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000,
      })
      .status(200)
      .json({
        message: "✅ Login successful!",
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          phone: user.phone,
          isAdmin: user.isAdmin,
        },
        token,
      });

    console.log("🟢 Login successful:", user.email);
  } catch (err) {
    console.error("🔥 Login failed:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};

// // OTP verification endpoint
// const verifyOTP = async (req, res) => {
//   const { otp } = req.body;
//   const otpToken = req.cookies.otpToken;

//   if (!otpToken) {
//     return res.status(400).json({ message: "OTP token not found" });
//   }

//   try {
//     // Verify OTP token
//     const decoded = jwt.verify(otpToken, process.env.JWT_SECRETKEY);
//     console.log(decoded);
//     if (decoded.otp !== otp) {
//       return res.status(400).json({ message: "Invalid OTP" });
//     }

//     // OTP is correct, generate authentication token
//     const authToken = jwt.sign(
//       { userId: decoded.userId },
//       process.env.JWT_SECRETKEY,
//       { expiresIn: "1h" }
//     );

//     console.log(authToken, "aT");
//     const decodUser = jwt.verify(authToken, process.env.JWT_SECRETKEY);
//     console.log(decodUser, "user");

//     // Clear OTP token from cookies after verification
//     // res.clearCookie("otpToken");

//     // Send authentication token
//     res.cookie("authToken", authToken, {
//       httpOnly: true,
//       secure: true, // Only true in production
//       maxAge: 60 * 60 * 1000, // 1 hour
//     });

//     return res.status(200).send({
//       success: true,
//       message: "Login successful",
//       authToken,
//     });
//   } catch (err) {
//     console.error(err);
//     return res.status(400).send({
//       sucess: false,
//       message: "Invalid OTP or OTP expired",
//     });
//   }
// };

// // logout
// const logout = async (req, res) => {
//   res.clearCookie("authToken");

//   res.status(200).send({
//     success: true,
//     message: "Logout successful",
//   });
// };

exports.getUserById = async (req, res) => {
  try {
    const { id } = req.params;

    // Find user by ID
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Respond with user data
    res.status(200).json({
      success: true,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        isAdmin: user.isAdmin,
        address: user.address,
        createdAt: user.createdAt,
      },
    });
  } catch (err) {
    console.error("Error fetching user by ID:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
};
