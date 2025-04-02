const jwt = require("jsonwebtoken");
const adminModel = require("../models/adminModel");
const userModel = require("../models/userModel");

const protect = (req, res, next) => {
  const token = req.cookies.token || req.header("Authorization")?.split(" ")[1];
  if (!token) return res.status(401).json({ message: "Not authorized" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    res.status(403).json({ message: "Invalid token" });
  }
};

const validateRegisterData = (email, password) => {
  const emailRegex = /^[a-z][a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/;
  const passwordRegex =
    /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  if (!emailRegex.test(email)) {
    throw new Error("Email must start with a lowercase letter.");
  }
  if (!passwordRegex.test(password)) {
    throw new Error(
      "Password must be at least 8 characters long, include a number, and a special character."
    );
  }
};

// Middleware to check if the superadmin is logged in
const authenticateJWT = (req, res, next) => {
  const token =
    req.cookies.loggedtoken || req.header("Authorization")?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .send({ error: "No token provided. Please login first." });
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRETKEY, (err, admin) => {
    if (err) {
      return res.status(403).send({ error: "Invalid or expired token." });
    }
    console.log(admin, "admin details");
    // If the token is valid, attach the user (superadmin info) to the request
    req.admin = admin;
    next(); // Proceed to the next middleware or the route handler
  });
};

const isAdminLoggedIn = async (req, res, next) => {
  try {
    // Check if token is present in cookies
    const token =
      req.cookies.verifiedtoken || req.header("Authorization")?.split(" ")[1];

    console.log(token, "token in isAdminLoggedIn");

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "Admin is not logged in. Please log in first.",
      });
    }

    // Verify token and decode
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    console.log(decoded, "admin");
    // Check if the decoded admin exists
    const admin = await adminModel.findById(decoded.adminId);
    if (!admin) {
      return res.status(401).send({
        success: false,
        message: "Admin not found. Please log in again.",
      });
    }

    // Attach admin info to the request object for further use in controllers
    req.admin = admin;

    // Move to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Failed to authenticate admin.",
    });
  }
};

const isUserLoggedIn = async (req, res, next) => {
  try {
    // Check if token is present in cookies
    const token =
      req.cookies.authToken || req.header("Authorization")?.split(" ")[1];

    console.log(token, "token in isUserLoggedIn");

    if (!token) {
      return res.status(401).send({
        success: false,
        message: "User is not logged in. Please log in first.",
      });
    }

    // Verify token and decode
    const decoded = jwt.verify(token, process.env.JWT_SECRETKEY);
    // Check if the decoded admin exists
    const user = await userModel.findById(decoded.userId);
    console.log(user, "user");

    if (!user) {
      return res.status(401).send({
        success: false,
        message: "User not found. Please log in again.",
      });
    }

    // Attach admin info to the request object for further use in controllers
    req.user = user;

    // Move to the next middleware or controller
    next();
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Failed to authenticate admin.",
    });
  }
};

module.exports = {
  protect,
  validateRegisterData,
  authenticateJWT,
  isAdminLoggedIn,
  isUserLoggedIn,
};
