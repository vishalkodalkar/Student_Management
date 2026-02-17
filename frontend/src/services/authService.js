import axios from "axios";

const API = "https://student-management-tfu3.onrender.com";

/* ======================================================
   AUTH HEADER (JWT)
   Used for all protected admin APIs
====================================================== */
const authHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

/* ======================================================
   EXISTING FUNCTIONS – DO NOT TOUCH
====================================================== */
export const registerStudent = (data) =>
  axios.post(`${API}/studentRegister`, data);

export const registerAdmin = (data) =>
  axios.post(`${API}/adminRegister`, data);

export const loginStudent = (data) =>
  axios.post(`${API}/studentLogin`, data);

export const loginAdmin = (data) =>
  axios.post(`${API}/adminLogin`, data);

/* ======================================================
   ADMIN DASHBOARD
====================================================== */
export const getAdminDashboard = () =>
  axios.get(`${API}/admin/admindashboard`, authHeader());

/* ======================================================
   ADMIN STUDENT MANAGEMENT (NEW)
====================================================== */

// Get all students OR filter by status (pending / active / inactive)
export const getAllStudents = (status = "") =>
  axios.get(
    `${API}/admin/students${status ? `?status=${status}` : ""}`,
    authHeader()
  );

// Approve a pending student
export const approveStudent = (studentId) =>
  axios.put(
    `${API}/admin/students/${studentId}/approve`,
    {},
    authHeader()
  );

// Reject a student
export const rejectStudent = (studentId) =>
  axios.put(
    `${API}/admin/students/${studentId}/reject`,
    {},
    authHeader()
  );

// Activate or Deactivate a student
export const updateStudentStatus = (studentId, status) =>
  axios.put(
    `${API}/admin/students/${studentId}/status`,
    { status },
    authHeader()
  );

// Update academic status (for reports later)
export const updateAcademicStatus = (studentId, academicStatus) =>
  axios.put(
    `${API}/admin/students/${studentId}/academic`,
    {
      attendance: academicStatus.attendance,
      cgpa: academicStatus.cgpa,
      remarks: academicStatus.remarks,
    },
    authHeader()
  );

  export const getStudentStatusReport = () =>
  axios.get(`${API}/admin/reports/status`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getCourseWiseReport = () =>
  axios.get(`${API}/admin/reports/course`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

export const getSemesterWiseReport = () =>
  axios.get(`${API}/admin/reports/semester`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  export const getAcademicSummary = () =>
  axios.get(`${API}/admin/reports/academic-summary`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });

  /* ================= REPORTS ================= */

export const getAttendanceReport = () =>
  axios.get(`${API}/admin/reports/attendance`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });


