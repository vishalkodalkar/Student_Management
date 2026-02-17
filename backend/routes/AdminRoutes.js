import express from "express";
import {
  registerAdmin,
  loginAdmin,
  adminAuth,
  getAdminDashboard,
} from "../controller/AdminController.js";

const router = express.Router();

// -------------------- ADMIN ROUTES --------------------

// 🔐 Protected admin dashboard (TOKEN REQUIRED)
router.get("/admindashboard", adminAuth, getAdminDashboard);

// Register admin (PUBLIC)
router.post("/adminRegister", registerAdmin);

// Login admin (PUBLIC)
router.post("/adminLogin", loginAdmin);

export default router;
