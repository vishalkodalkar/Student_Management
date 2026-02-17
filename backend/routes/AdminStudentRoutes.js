import express from "express";
import {
  getStudents,
  approveStudent,
  rejectStudent,
  updateStudentStatus,
} from "../controller/AdminStudentController.js";
import { adminAuth } from "../controller/AdminController.js";
import { updateAcademicStatus } from "../controller/AdminStudentController.js";





const router = express.Router();

/* ================= ADMIN STUDENT ROUTES ================= */

// 🔐 Get students
router.get("/students", adminAuth, getStudents);

// Approve student
router.put("/students/:id/approve", adminAuth, approveStudent);

// Reject student
router.put("/students/:id/reject", adminAuth, rejectStudent);

// Activate / Deactivate student
router.put("/students/:id/status", adminAuth, updateStudentStatus);


router.put(
  "/students/:id/academic",
  adminAuth,
  updateAcademicStatus
);



export default router;
