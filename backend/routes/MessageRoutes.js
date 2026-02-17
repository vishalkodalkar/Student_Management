import express from "express";
import {
  sendMessage,
  getAllMessages,
  replyToMessage,
} from "../controller/MessageController.js";

import { adminAuth } from "../controller/AdminController.js";

const router = express.Router();

// Public route
router.post("/contact", sendMessage);

// Admin-only routes
router.get("/admin/messages", adminAuth, getAllMessages);
router.put("/admin/messages/:id/reply", adminAuth, replyToMessage);

export default router;
