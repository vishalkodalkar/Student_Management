import axios from "axios";

const API = axios.create({
  baseURL: "https://student-management-tfu3.onrender.com", // ✅ BACKEND PORT
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

/* ================= STUDENT DASHBOARD ================= */

export const getStudentDashboard = () =>
  API.get("/student/dashboard");

/*======student profile=====*/

export const getStudentProfile = () =>
  API.get("/student/profile");

