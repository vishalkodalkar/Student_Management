import { useEffect, useState } from "react";
import {
  Card,
  Row,
  Col,
  Spinner,
  Badge,
  Alert,
  Button,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaMoon,
  FaSun,
  FaUserGraduate,
  FaChartLine,
} from "react-icons/fa";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { getStudentDashboard } from "../../services/studentService";

/* ================= ANIMATIONS ================= */
const fadeUp = {
  hidden: { opacity: 0, y: 25 },
  visible: { opacity: 1, y: 0 },
};

/* ================= PROGRESS RING ================= */
const ProgressRing = ({ value, label, color }) => {
  const radius = 52;
  const stroke = 8;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset =
    circumference - (value / 100) * circumference;

  return (
    <div className="text-center">
      <svg height={radius * 2} width={radius * 2}>
        <circle
          stroke="#e5e7e3"
          fill="transparent"
          strokeWidth={stroke}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <circle
          stroke={color}
          fill="transparent"
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference} ${circumference}`}
          style={{ strokeDashoffset, transition: "stroke-dashoffset 0.6s" }}
          r={normalizedRadius}
          cx={radius}
          cy={radius}
        />
        <text
          x="50%"
          y="50%"
          dy="6"
          textAnchor="middle"
          fontSize="18"
          fontWeight="bold"
          fill={color}
        >
          {value}%
        </text>
      </svg>
      <div className="mt-2 text-muted">{label}</div>
    </div>
  );
};

const UserDashboard = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [dark, setDark] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const res = await getStudentDashboard();
        setData(res.data);
      } catch {
        setError("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };
    loadDashboard();
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

  if (!data) return null;

  const {
    studentName,
    course,
    year_semister,
    status,
    academic = {},
  } = data;

  /* Dummy performance trend (can later be dynamic) */
  const performanceData = [
    { month: "Jan", score: academic.cgpa - 0.4 },
    { month: "Feb", score: academic.cgpa - 0.2 },
    { month: "Mar", score: academic.cgpa },
  ];

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={fadeUp}
      className={`container-fluid px-4 mt-4 pb-5 ${
        dark ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ minHeight: "100vh" }}
    >
      {/* ================= HEADER ================= */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="fw-bold">Student Dashboard</h2>
          <p className="text-muted">
            Welcome, <strong>{studentName}</strong>
          </p>
        </div>

        <Button
          variant={dark ? "outline-light" : "outline-dark"}
          onClick={() => setDark(!dark)}
        >
          {dark ? <FaSun /> : <FaMoon />}
        </Button>
      </div>

      {/* ================= BASIC INFO ================= */}
      <Row className="g-3 mb-4">
        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <FaUserGraduate size={26} className="text-primary mb-2" />
              <h6 className="text-muted">Course</h6>
              <h5>{course}</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <h6 className="text-muted">Semester</h6>
              <h5>{year_semister}</h5>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-0">
            <Card.Body className="text-center">
              <h6 className="text-muted">Status</h6>
              <Badge bg="success">{status}</Badge>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ================= PROGRESS RINGS ================= */}
      <Row className="g-3 mb-5">
        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex justify-content-center">
              <ProgressRing
                value={academic.attendance ?? 0}
                label="Attendance"
                color="#3b82f6"
              />
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card className="shadow-sm border-0">
            <Card.Body className="d-flex justify-content-center">
              <ProgressRing
                value={(academic.cgpa ?? 0) * 10}
                label="CGPA"
                color="#22c55e"
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ================= PERFORMANCE TREND ================= */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm border-0">
            <Card.Body>
              <h5 className="fw-semibold mb-3">
                Performance Trend <FaChartLine />
              </h5>

              <ResponsiveContainer width="100%" height={260}>
                <LineChart data={performanceData}>
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 10]} />
                  <Tooltip />
                  <Line
                    type="monotone"
                    dataKey="score"
                    stroke="#3b82f6"
                    strokeWidth={3}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ================= ADMIN REMARKS ================= */}
      <Row className="mb-5">
        <Col>
          <Card className="shadow-sm border-primary">
            <Card.Body>
              <h6 className="text-muted mb-2">Admin Remarks</h6>
              <p className="mb-0">
                {academic.remarks || "No remarks provided"}
              </p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </motion.div>
  );
};

export default UserDashboard;
