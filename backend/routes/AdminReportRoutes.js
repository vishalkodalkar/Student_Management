import express from "express";
import {
  getAttendanceReport,
  getAcademicSummary,
  getStudentStatusReport,
  getCourseWiseReport,
  getSemesterWiseReport,
} from "../controller/AdminReportController.js";

import { verifyToken, isAdmin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/reports/status",  getStudentStatusReport);
router.get("/reports/course",  getCourseWiseReport);
router.get("/reports/semester",   getSemesterWiseReport);
router.get("/reports/academic-summary",   getAcademicSummary);
router.get("/reports/attendance",   getAttendanceReport);

export default router;
