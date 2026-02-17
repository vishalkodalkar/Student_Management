import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import Student from "../models/Student.js";

/* ======================================================
   REGISTER STUDENT
====================================================== */
export const registerStudent = async (req, res) => {
  try {
    const {
      Student_id,
      name,
      email,
      contact,
      password,
      course,
      year_semister,
      role,
    } = req.body;

    const existingStudent = await Student.findOne({ email });
    if (existingStudent) {
      return res.status(400).json({ message: "Student already exists ❌" });
    }

    const newStudent = new Student({
      Student_id,
      name,
      email,
      contact,
      password,
      course,
      year_semister,
      role,
    });

    await newStudent.save();
    await sendWelcomeEmail(newStudent);

    res.status(201).json({
      message: "Student registered successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Student registration failed ❌",
      error: error.message,
    });
  }
};

/* ======================================================
   LOGIN STUDENT
====================================================== */
export const loginStudent = async (req, res) => {
  try {
    const { email, password } = req.body;

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    const isPasswordValid = await bcrypt.compare(password, student.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials ❌" });
    }

    /* 🔐 STATUS CHECK */
    if (student.status !== "active") {
      return res.status(403).json({
        message:
          student.status === "pending"
            ? "Your account is pending admin approval"
            : student.status === "inactive"
            ? "Your account has been deactivated by admin"
            : "Your account access is restricted",
      });
    }

    const token = jwt.sign(
      { id: student._id, role: student.role },
      process.env.JWT_SECRET || "studentSecretKey",
      { expiresIn: "1h" }
    );

    res.status(200).json({
      message: "Login successful ✅",
      token,
      student: {
        studentId: student._id,
        name: student.name,
        email: student.email,
        contact: student.contact,
        role: student.role,
      },
    });
  } catch (error) {
    res.status(500).json({
      message: "Student login failed ❌",
      error: error.message,
    });
  }
};

/* ======================================================
   STUDENT DASHBOARD (READ ONLY)
====================================================== */
export const getDashboard = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select(
      "name course year_semister status academic"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found" });
    }

    res.status(200).json({
      studentName: student.name,
      course: student.course,
      year_semister: student.year_semister,
      status: student.status,
      academic: student.academic || {},
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load dashboard",
      error: error.message,
    });
  }
};

/* ======================================================
   STUDENT PROFILE (PRIVATE)
====================================================== */
export const getStudentProfile = async (req, res) => {
  try {
    const student = await Student.findById(req.user.id).select(
      "-password"
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found ❌" });
    }

    res.status(200).json({
      studentId: student.Student_id,
      name: student.name,
      email: student.email,
      contact: student.contact,
      course: student.course,
      year_semister: student.year_semister,
      status: student.status,
      academic: student.academic || {},
      createdAt: student.createdAt,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load profile ❌",
      error: error.message,
    });
  }
};


/* ======================================================
   EMAIL FUNCTION (PRIVATE)
====================================================== */
const sendWelcomeEmail = async (student) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "Gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL,
      to: student.email,
      subject: "Welcome to Student Management System",
      html: `
        <p>Hello ${student.name},</p>
        <p>Welcome to the Student Management System.</p>
        <p>Your registration was successful.</p>
        <p>Regards,<br/>Student Management Team</p>
      `,
    });
  } catch (error) {
    console.error("Email error:", error.message);
  }
};
