import mongoose from "mongoose";
import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import StudentRoutes from "./routes/StudentRoutes.js";
import AdminRoutes from "./routes/AdminRoutes.js";
import MessageRoutes from "./routes/MessageRoutes.js";
import adminStudentRoutes from "./routes/AdminStudentRoutes.js";
import adminReportRoutes from "./routes/AdminReportRoutes.js";


dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

/* ===============================
   ROUTES
=============================== */

// Student APIs
app.use("/", StudentRoutes);

// Admin APIs (login, register, dashboard)
app.use("/admin", AdminRoutes);

// Messages APIs
app.use("/", MessageRoutes);

// Admin Student Management APIs
app.use("/admin", adminStudentRoutes);

// Admin Report //
- app.use("/", adminStudentRoutes);
+ app.use("/admin", adminStudentRoutes);
app.use("/admin", adminReportRoutes);



/* ===============================
   SERVER & DATABASE
=============================== */

const PORT = process.env.PORT ||5000;
const URL = process.env.MONGOURL;

mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running on port: ${PORT}`);
    });
  })
  .catch((error) => console.error(error));
