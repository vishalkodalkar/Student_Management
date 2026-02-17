import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Admin from "../models/Admin.js";
import Student from "../models/Student.js";
import Message from "../models/Message.js";

// ==================== ADMIN AUTH (MOVED HERE) ====================
export const adminAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ message: "Unauthorized ❌" });
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "adminSecretKey"
    );

    if (decoded.role !== "admin") {
      return res.status(403).json({ message: "Admin access only ❌" });
    }

    const admin = await Admin.findById(decoded.id);
    if (!admin) {
      return res.status(401).json({ message: "Admin not found ❌" });
    }

    req.admin = admin; // attach admin to request
    next();
  } catch (error) {
    return res.status(401).json({ message: "Invalid or expired token ❌" });
  }
};

// ==================== REGISTER ADMIN ====================
export const registerAdmin = async (req, res) => {
  try {
    const { admin_id, name, email, password } = req.body;

    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({
        message: "Admin already exists ❌",
      });
    }

    const newAdmin = new Admin({
      admin_id,
      name,
      email,
      password, // hashed by schema
    });

    await newAdmin.save();

    res.status(201).json({
      message: "Admin registered successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Admin registration failed ❌",
      error: error.message,
    });
  }
};

// ==================== LOGIN ADMIN ====================
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({
        message: "Invalid credentials ❌",
      });
    }

    if (admin.status === "inactive") {
      return res.status(403).json({
        message: "Admin account is inactive ❌",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, admin.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials ❌",
      });
    }

    const token = jwt.sign(
      {
        id: admin._id,
        role: "admin",
      },
      process.env.JWT_SECRET || "adminSecretKey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Admin login successful ✅",
      token,
      admin: {
        admin_id: admin.admin_id,
        name: admin.name,
        email: admin.email,
        status: admin.status,
        role: "admin",
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Admin login failed ❌",
      error: error.message,
    });
  }
};

{/* _____Dashboard____*/ }

export const getAdminDashboard = async (req, res) => {
  try {
    const totalStudents = await Student.countDocuments();
    const activeStudents = await Student.countDocuments({ status: "active" });
    const messages = await Message.countDocuments();

    res.json({
      totalStudents,
      activeStudents,
      messages,
    });
  } catch (err) {
    res.status(500).json({ message: "Dashboard error" });
  }
};