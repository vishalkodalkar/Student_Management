import express from "express";
import {
  registerStudent,
  loginStudent,
  getDashboard,
  getStudentProfile,
} from "../controller/StudentController.js";

import {
  verifyToken
} from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= PUBLIC ROUTES ================= */

// Register student
router.post("/studentRegister", registerStudent);

// Login student
router.post("/studentLogin", loginStudent);

/* ================= PROTECTED STUDENT ROUTES ================= */

// Student dashboard
router.get(
  "/student/dashboard",
  verifyToken,
  getDashboard
);

// Student profile
router.get(
  "/student/profile",
  verifyToken,
  getStudentProfile
);

export default router;
