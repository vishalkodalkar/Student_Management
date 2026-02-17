import Student from "../models/Student.js";

/* ======================================================
   GET STUDENTS (OPTIONAL STATUS FILTER)
====================================================== */
export const getStudents = async (req, res) => {
  try {
    const { status } = req.query;

    const filter = status ? { status } : {};
    const students = await Student.find(filter).select(
      "-password"
    );

    res.status(200).json(students);
  } catch (error) {
    res.status(500).json({
      message: "Failed to fetch students ❌",
      error: error.message,
    });
  }
};

/* ======================================================
   APPROVE STUDENT
====================================================== */
export const approveStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found ❌" });
    }

    student.status = "active";
    await student.save();

    res.status(200).json({
      message: "Student approved successfully ✅",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to approve student ❌",
      error: error.message,
    });
  }
};

/* ======================================================
   REJECT STUDENT
====================================================== */
export const rejectStudent = async (req, res) => {
  try {
    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found ❌" });
    }

    student.status = "rejected";
    await student.save();

    res.status(200).json({
      message: "Student rejected ❌",
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to reject student ❌",
      error: error.message,
    });
  }
};

/* ======================================================
   ACTIVATE / DEACTIVATE STUDENT
====================================================== */
export const updateStudentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "inactive"].includes(status)) {
      return res.status(400).json({ message: "Invalid status ❌" });
    }

    const student = await Student.findById(req.params.id);
    if (!student) {
      return res.status(404).json({ message: "Student not found ❌" });
    }

    student.status = status;
    await student.save();

    res.status(200).json({
      message: `Student ${status} successfully ✅`,
    });
  } catch (error) {
    res.status(500).json({
      message: "Failed to update status ❌",
      error: error.message,
    });
  }
};
/* ======================================================
   UPDATE ACADEMIC STATUS (ADMIN ONLY)
====================================================== */
export const updateAcademicStatus = async (req, res) => {
  try {
    const { attendance, cgpa, remarks } = req.body;

    const update = {
      "academic.attendance": attendance !== undefined ? Number(attendance) : null,
      "academic.cgpa": cgpa !== undefined ? Number(cgpa) : null,
      "academic.remarks": remarks || "",
      "academic.updatedBy": req.admin._id,
      "academic.updatedAt": new Date(),
    };

    const student = await Student.findByIdAndUpdate(
      req.params.id,
      { $set: update },
      { new: true }
    );

    if (!student) {
      return res.status(404).json({ message: "Student not found ❌" });
    }

    res.status(200).json({
      message: "Academic status updated successfully ✅",
      academic: student.academic,
    });
  } catch (error) {
    console.error("Academic update error:", error);
    res.status(500).json({
      message: "Failed to update academic data ❌",
      error: error.message,
    });
  }
};


