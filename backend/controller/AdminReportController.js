import Student from "../models/Student.js";

/* ======================================================
   STUDENT STATUS REPORT
====================================================== */
export const getStudentStatusReport = async (req, res) => {
  try {
    const total = await Student.countDocuments();
    const pending = await Student.countDocuments({ status: "pending" });
    const active = await Student.countDocuments({ status: "active" });
    const inactive = await Student.countDocuments({ status: "inactive" });
    const rejected = await Student.countDocuments({ status: "rejected" });

    res.status(200).json({
      total,
      pending,
      active,
      inactive,
      rejected,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch student status report",
      error: error.message,
    });
  }
};

/* ======================================================
   COURSE-WISE REPORT
====================================================== */
export const getCourseWiseReport = async (req, res) => {
  try {
    const report = await Student.aggregate([
      {
        $group: {
          _id: "$course",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch course-wise report",
      error: error.message,
    });
  }
};

/* ======================================================
   SEMESTER-WISE REPORT
====================================================== */
export const getSemesterWiseReport = async (req, res) => {
  try {
    const report = await Student.aggregate([
      {
        $group: {
          _id: "$year_semister",
          count: { $sum: 1 },
        },
      },
    ]);

    res.status(200).json(report);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch semester-wise report",
      error: error.message,
    });
  }
};

/* ======================================================
   ACADEMIC SUMMARY REPORT (ADMIN DASHBOARD)
====================================================== */
export const getAcademicSummary = async (req, res) => {
  try {
    const students = await Student.find({
      $or: [
        { "academic.attendance": { $ne: null } },
        { "academic.cgpa": { $ne: null } },
      ],
    });

    const total = students.length;

    if (total === 0) {
      return res.status(200).json({
        avgCgpa: 0,
        avgAttendance: 0,
        atRisk: 0,
        updatedToday: 0,
      });
    }

    let cgpaSum = 0;
    let attendanceSum = 0;
    let atRisk = 0;
    let updatedToday = 0;

    const today = new Date().toDateString();

    students.forEach((s) => {
      const cgpa = s.academic?.cgpa;
      const attendance = s.academic?.attendance;

      if (cgpa !== null && cgpa !== undefined) {
        cgpaSum += cgpa;
      }

      if (attendance !== null && attendance !== undefined) {
        attendanceSum += attendance;
      }

      if (
        (cgpa !== null && cgpa < 6) ||
        (attendance !== null && attendance < 75)
      ) {
        atRisk++;
      }

      if (
        s.academic?.updatedAt &&
        new Date(s.academic.updatedAt).toDateString() === today
      ) {
        updatedToday++;
      }
    });

    res.status(200).json({
      avgCgpa: Number((cgpaSum / total).toFixed(2)),
      avgAttendance: Math.round(attendanceSum / total),
      atRisk,
      updatedToday,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to load academic summary",
      error: error.message,
    });
  }
};

/* ======================================================
   ATTENDANCE REPORT (ADMIN REPORT PAGE)
====================================================== */
export const getAttendanceReport = async (req, res) => {
  try {
    const students = await Student.find(
      { "academic.attendance": { $ne: null } },
      "Student_id name course academic.attendance status"
    );

    let totalAttendance = 0;
    let belowThreshold = 0;

    students.forEach((s) => {
      const attendance = s.academic.attendance;

      totalAttendance += attendance;

      if (attendance < 75) {
        belowThreshold++;
      }
    });

    res.status(200).json({
      totalStudents: students.length,
      averageAttendance:
        students.length > 0
          ? Math.round(totalAttendance / students.length)
          : 0,
      belowThreshold,
      students,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch attendance report",
      error: error.message,
    });
  }
};
