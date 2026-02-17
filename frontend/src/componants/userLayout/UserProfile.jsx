import { useEffect, useState } from "react";
import { Card, Row, Col, Spinner, Badge, Alert } from "react-bootstrap";
import { motion } from "framer-motion";
import { getStudentProfile } from "../../services/studentService";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

const hoverCard = {
  hover: { y: -6, transition: { duration: 0.3 } },
};

const UserProfile = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await getStudentProfile();
        setProfile(res.data);
      } catch {
        setError("Failed to load profile");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
  }, []);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <Alert variant="danger">{error}</Alert>
      </div>
    );
  }

  if (!profile) return null;

  const {
    studentId,
    name,
    email,
    contact,
    course,
    year_semister,
    status,
    academic = {},
    createdAt,
  } = profile;

  return (
    <motion.div
      className="container-fluid px-4 py-4"
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      style={{
        background: "linear-gradient(180deg, #f8fafc, #eef4ff)",
        minHeight: "100vh",
        paddingTop: "90px", // ensures header is visible below navbar
      }}
    >
      {/* ================= HEADER ================= */}
      <motion.div variants={fadeUp} className="mb-4">
        <h2 className="fw-bold">Student Profile</h2>
        <p className="text-muted">
          Personal and academic information overview
        </p>
      </motion.div>

      {/* ================= MAIN CONTENT ================= */}
      <Row className="g-4">
        {/* ================= PROFILE CARD ================= */}
        <Col md={4}>
          <motion.div whileHover="hover" variants={hoverCard}>
            <Card className="shadow-sm border-0 text-center">
              <Card.Body>
                {/* ================= PROFILE IMAGE ================= */}
                <div className="position-relative d-inline-block mb-3">
                  <label htmlFor="profilePhoto" style={{ cursor: "pointer" }}>
                    <img
                      src={
                        profile.photoPreview ||
                        "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                      }
                      alt="Profile"
                      className="rounded-circle shadow-sm"
                      style={{
                        width: "110px",
                        height: "110px",
                        objectFit: "cover",
                        border: "3px solid #e5e7eb",
                      }}
                    />

                    {/* Hover overlay */}
                    <div
                      className="position-absolute top-0 start-0 w-100 h-100 rounded-circle d-flex align-items-center justify-content-center"
                      style={{
                        background: "rgba(0,0,0,0.45)",
                        color: "#fff",
                        opacity: 0,
                        transition: "0.3s",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.opacity = 1)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.opacity = 0)
                      }
                    >
                      <small>Change</small>
                    </div>
                  </label>

                  {/* Hidden file input */}
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    hidden
                    onChange={(e) => {
                      const file = e.target.files[0];
                      if (file) {
                        const preview = URL.createObjectURL(file);
                        setProfile((prev) => ({
                          ...prev,
                          photoPreview: preview,
                        }));
                      }
                    }}
                  />
                </div>

                {/* ================= USER INFO ================= */}
                <h4 className="fw-bold mb-1">{name}</h4>
                <p className="text-muted mb-2">{email}</p>

                <Badge
                  bg={status === "active" ? "success" : "secondary"}
                  className="px-3 py-2"
                >
                  {status}
                </Badge>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>

        {/* ================= DETAILS CARD ================= */}
        <Col md={8}>
          <motion.div whileHover="hover" variants={hoverCard}>
            <Card className="shadow-sm border-0">
              <Card.Body>
                <h5 className="fw-semibold mb-3 text-primary">
                  Basic Details
                </h5>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Student ID</strong>
                    <p className="text-muted mb-0">{studentId}</p>
                  </Col>
                  <Col md={6}>
                    <strong>Contact</strong>
                    <p className="text-muted mb-0">{contact}</p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Course</strong>
                    <p className="text-muted mb-0">{course}</p>
                  </Col>
                  <Col md={6}>
                    <strong>Semester</strong>
                    <p className="text-muted mb-0">{year_semister}</p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col md={6}>
                    <strong>Attendance</strong>
                    <p className="text-muted mb-0">
                      {academic.attendance ?? "N/A"}%
                    </p>
                  </Col>
                  <Col md={6}>
                    <strong>CGPA</strong>
                    <p className="text-muted mb-0">
                      {academic.cgpa ?? "N/A"}
                    </p>
                  </Col>
                </Row>

                <Row className="mb-3">
                  <Col>
                    <strong>Account Created</strong>
                    <p className="text-muted mb-0">
                      {new Date(createdAt).toLocaleDateString()}
                    </p>
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>

      {/* ================= ADMIN REMARKS ================= */}
      <Row className="mt-4">
        <Col>
          <motion.div whileHover="hover" variants={hoverCard}>
            <Card className="shadow-sm border-primary">
              <Card.Body>
                <h5 className="fw-semibold text-primary mb-2">
                  Admin Remarks
                </h5>
                <p className="mb-0 text-muted fs-6">
                  {academic.remarks || "No remarks provided"}
                </p>
              </Card.Body>
            </Card>
          </motion.div>
        </Col>
      </Row>
    </motion.div>
  );
};

export default UserProfile;
