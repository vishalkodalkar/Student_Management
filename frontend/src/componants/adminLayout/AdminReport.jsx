import { useEffect, useState } from "react";
import { Card, Table, Row, Col, Spinner, Badge } from "react-bootstrap";
import { getAttendanceReport } from "../../services/authService";

const AdminReport = () => {
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadAttendanceReport = async () => {
      try {
        const res = await getAttendanceReport();
        setReport(res.data);
      } catch (error) {
        console.error("Failed to load attendance report", error);
      } finally {
        setLoading(false);
      }
    };

    loadAttendanceReport();
  }, []);

  const attendanceBadge = (value) =>
    value < 75 ? (
      <Badge bg="danger">At Risk</Badge>
    ) : (
      <Badge bg="success">Good</Badge>
    );

  return (
    <div className="container-fluid px-4 mt-4">
      <h4 className="fw-semibold mb-2">Attendance Report</h4>
      <p className="text-muted mb-4">
        Attendance performance overview of all students
      </p>

      {/* ================= SUMMARY CARDS ================= */}
      <Row className="mb-4 g-3">
        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h6>Total Students</h6>
              <h3 className="fw-bold">{report?.totalStudents ?? 0}</h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm">
            <Card.Body className="text-center">
              <h6>Average Attendance</h6>
              <h3 className="fw-bold">
                {report?.averageAttendance ?? 0}%
              </h3>
            </Card.Body>
          </Card>
        </Col>

        <Col md={4}>
          <Card className="shadow-sm border-danger">
            <Card.Body className="text-center">
              <h6>Below 75%</h6>
              <h3 className="fw-bold text-danger">
                {report?.belowThreshold ?? 0}
              </h3>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* ================= TABLE ================= */}
      {loading ? (
        <div className="text-center py-5">
          <Spinner animation="border" />
        </div>
      ) : !report || report.students.length === 0 ? (
        <div className="text-muted text-center py-4">
          No attendance data available
        </div>
      ) : (
        <Card className="shadow-sm">
          <Card.Body>
            <Table responsive hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Course</th>
                  <th>Attendance (%)</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {report.students.map((s) => {
                  const attendance = s.academic?.attendance ?? 0;

                  return (
                    <tr key={s._id}>
                      <td>{s.Student_id}</td>
                      <td>{s.name}</td>
                      <td>{s.course}</td>
                      <td>{attendance}%</td>
                      <td>{attendanceBadge(attendance)}</td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      )}
    </div>
  );
};

export default AdminReport;
