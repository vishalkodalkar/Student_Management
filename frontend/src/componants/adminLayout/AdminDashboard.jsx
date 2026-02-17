import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Row, Col, Spinner } from "react-bootstrap";
import {
  getAdminDashboard,
  getAcademicSummary,
} from "../../services/authService";

const modules = [
  {
    title: "Student Management",
    color: "primary",
    actions: [
      { label: "Add Student", path: "/admin/studentmanagement" },
      { label: "View Students", path: "/admin/studentmanagement" },
    ],
  },
  {
    title: "Messages",
    color: "success",
    actions: [{ label: "View Messages", path: "/admin/messages" }],
  },
  {
    title: "Reports",
    color: "warning",
    actions: [{ label: "Attendance Report", path: "/admin/report" }],
  },
];

const AdminDashboard = () => {
  const [data, setData] = useState({});
  const [academicSummary, setAcademicSummary] = useState(null);
  const [loadingAcademic, setLoadingAcademic] = useState(false);

  const navigate = useNavigate();

  /* ================= EXISTING DASHBOARD DATA ================= */
  useEffect(() => {
    getAdminDashboard().then((res) => setData(res.data));
  }, []);

  /* ================= ACADEMIC SUMMARY ================= */
  useEffect(() => {
    const loadAcademicSummary = async () => {
      try {
        setLoadingAcademic(true);
        const res = await getAcademicSummary();
        setAcademicSummary(res.data);
      } catch (error) {
        console.error("Failed to load academic summary");
      } finally {
        setLoadingAcademic(false);
      }
    };

    loadAcademicSummary();
  }, []);

  return (
    <div className="container-fluid mt-4 px-4">
      <h2 className="fw-bold mb-4 text-dark">Admin Dashboard</h2>

      {/* ================= KPI CARDS ================= */}
      <div className="row mb-4">
        <Kpi title="Total Students" value={data.totalStudents} color="primary" />
        <Kpi
          title="Active Students"
          value={data.activeStudents}
          color="success"
        />
        <Kpi
          title="Messages"
          value={data.messages}
          color="danger"
          clickable
          onClick={() => navigate("/admin/messages")}
        />
      </div>

      {/* ================= ACADEMIC SUMMARY CARDS ================= */}
      <Row className="mb-4 g-3">
        {loadingAcademic ? (
          <Col className="text-center">
            <Spinner animation="border" />
          </Col>
        ) : (
          academicSummary && (
            <>
              <Col md={3}>
                <Card className="shadow-sm">
                  <Card.Body className="text-center">
                    <h6 className="text-muted">Average CGPA</h6>
                    <h3 className="fw-bold">{academicSummary.avgCgpa}</h3>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="shadow-sm">
                  <Card.Body className="text-center">
                    <h6 className="text-muted">Avg Attendance</h6>
                    <h3 className="fw-bold">
                      {academicSummary.avgAttendance}%
                    </h3>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="shadow-sm border-danger">
                  <Card.Body className="text-center">
                    <h6 className="text-muted">At-Risk Students</h6>
                    <h3 className="fw-bold text-danger">
                      {academicSummary.atRisk}
                    </h3>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={3}>
                <Card className="shadow-sm">
                  <Card.Body className="text-center">
                    <h6 className="text-muted">Updated Today</h6>
                    <h3 className="fw-bold">
                      {academicSummary.updatedToday}
                    </h3>
                  </Card.Body>
                </Card>
              </Col>
            </>
          )
        )}
      </Row>

      {/* ================= MODULES ================= */}
      <div className="row">
        {modules.map((m, i) => (
          <div className="col-md-4 mb-4" key={i}>
            <div
              className={`card h-100 border-0 shadow module-card bg-${m.color}-subtle`}
            >
              <div className="card-body">
                <h5 className={`fw-semibold text-${m.color}`}>
                  {m.title}
                </h5>

                {m.actions.map((a, j) => (
                  <button
                    key={j}
                    className={`btn btn-outline-${m.color} btn-sm me-2 mt-3`}
                    onClick={() => navigate(a.path)}
                  >
                    {a.label}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

/* ================= KPI CARD ================= */
const Kpi = ({ title, value, color, clickable = false, onClick }) => (
  <div className="col-md-4 mb-3">
    <div
      className={`card text-white shadow-lg kpi-card bg-${color}`}
      style={{
        cursor: clickable ? "pointer" : "default",
        transition: "all 0.3s ease",
      }}
      onClick={clickable ? onClick : undefined}
    >
      <div className="card-body text-center">
        <h6 className="text-uppercase opacity-75">{title}</h6>
        <h2 className="fw-bold">{value || 0}</h2>
      </div>
    </div>
  </div>
);

export default AdminDashboard;
