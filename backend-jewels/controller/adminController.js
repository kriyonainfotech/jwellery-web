const { v4: uuidv4 } = require("uuid");
const adminModel = require("../models/adminModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Hash Password Helper
const hashPassword = async (password) => {
  const saltRounds = 10;
  return await bcrypt.hash(password, saltRounds);
};

// Register Admin (combined service + controller)
const registeradminHandler = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(req.body, "request body");

    // Validate input
    if (!name || !email || !password) {
      return res.status(400).send({ error: "All fields are required." });
    }

    // let response = validateRegisterData(email, password);
    // if (response) {
    //   return res
    //     .status(400)
    //     .send({ error: "email or password are not strong enough" });
    // }

    // Check if admin already exists
    const existingAdmin = await adminModel.findOne({
      email,
    });
    if (existingAdmin) {
      return res
        .status(400)
        .send({ error: "Admin with this email already exists." });
    }

    // Hash password
    const hashedPassword = await hashPassword(password);

    // Create new admin
    const adminInstance = new adminModel({
      adminId: uuidv4(),
      name,
      email,
      password: hashedPassword,
    });

    // Save admin to database
    const newAdmin = await adminInstance.save();
    console.log(newAdmin, "admin created");

    // Return success response
    return res.status(201).send({
      success: true,
      message: "Admin registered successfully.",
      data: {
        adminId: newAdmin.adminId,
        name: newAdmin.name,
        email: newAdmin.email,
        role: newAdmin.role,
      },
    });
  } catch (error) {
    console.error("Error registering admin:", error);
    return res.status(500).send({ success: false, message: error.message });
  }
};

const loginadminHandler = async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body, "req.body");

    // Validate input
    if (!email || !password) {
      return res.status(400).send({
        success: false,
        error: "Email and password are required.",
      });
    }

    const admin = await adminModel.findOne({ email });
    if (!admin) {
      return res.status(400).send("Admin not found.");
    }

    // Compare passwords
    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).send("Invalid password.");
    }

    // Generate JWT token
    const token = jwt.sign(
      {
        id: admin._id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRETKEY, // Secret key
      { expiresIn: "10m" } // Token expiration time
    );

    // Set JWT token in a cookie
    res.cookie("loggedtoken", token, {
      httpOnly: true,
      secure: true,
      maxAge: 10 * 60 * 1000, // 10 minutes
      sameSite: "None",
    });

    return res.status(200).send({
      success: true,
      message: "Login successful, Enter Secret key to proceed further.",
      loggedtoken: token,
    });
  } catch (error) {
    console.log(error, "Error in login admin");
    return res.status(500).send({ success: false, message: error.message });
  }
};

// Verify the static secret key provided by the admin
const verifySecretKey = async (req, res) => {
  try {
    const { secretKey } = req.body;
    const admin = req.admin;
    console.log(admin, "record");
    // Ensure the secret key is provided
    if (!secretKey) {
      return res
        .status(400)
        .send({ success: false, message: "Secret key is required." });
    }

    // Compare the provided secret key with the predefined one
    if (secretKey != process.env.ADMIN_SECRET_KEY) {
      return res
        .status(401)
        .send({ success: false, message: "Invalid secret key." });
    }

    console.log(req.cookies);
    // Secret key is correct, clear the JWT token cookie
    res.clearCookie("loggedtoken"); // This will clear the JWT token from the cookie

    // Secret key is correct, return a success message and JWT token
    const newToken = jwt.sign(
      {
        adminId: admin.id,
        email: admin.email,
        role: admin.role,
      },
      process.env.JWT_SECRETKEY,
      { expiresIn: "1d" } // Set expiration for the token
    );

    res.cookie("verifiedtoken", newToken, {
      httpOnly: true,
      secure: true,
      maxAge: 24 * 60 * 60 * 1000, // 1 day (in milliseconds)
      sameSite: "None",
    });

    return res.status(200).send({
      success: true,
      message: "Secret key verified successfully. Access granted.",
      verifiedtoken: newToken,
      admin,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({ error: "Internal server error." });
  }
};

const verifyAdmin = async (req, res) => {
  try {
    res.status(200).send({
      success: true,
      message: " Admin verified successfully",
    });
  } catch (error) {
    console.log(error, " admin not verified");
    res.status(500).send({
      success: false,
      message: "role not  admin",
      error,
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query; // Default to page 1, 10 users per page
    const skip = (page - 1) * limit; // Calculate the number of users to skip

    // Fetch users with pagination
    const allUsers = await adminModel.find({}).skip(skip).limit(Number(limit));
    const totalUsers = await adminModel.countDocuments(); // Get total user count

    if (allUsers.length === 0) {
      return res.status(404).send({ message: "No users found." });
    }

    return res.status(200).send({
      success: true,
      message: "Users fetched successfully",
      data: {
        users: allUsers,
        total: totalUsers,
        page: Number(page),
        totalPages: Math.ceil(totalUsers / limit),
      },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: "Internal server error",
    });
  }
};

module.exports = {
  registeradminHandler,
  loginadminHandler,
  verifySecretKey,
  verifyAdmin,
  getAllUsers,
};
