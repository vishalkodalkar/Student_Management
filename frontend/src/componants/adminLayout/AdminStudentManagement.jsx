import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Table,
  Button,
  Badge,
  Spinner,
  Modal,
  Form,
} from "react-bootstrap";
import axios from "axios";
import {
  getAllStudents,
  approveStudent,
  rejectStudent,
  updateStudentStatus,
} from "../../services/authService";

const AdminStudentManagement = () => {
  const [students, setStudents] = useState([]);
  const [statusFilter, setStatusFilter] = useState("pending");
  const [loading, setLoading] = useState(false);
  const [actionLoading, setActionLoading] = useState(null);

  /* ================= ACADEMIC MODAL STATES ================= */
  const [showAcademicModal, setShowAcademicModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [saving, setSaving] = useState(false);

  const [academicForm, setAcademicForm] = useState({
    attendance: "",
    cgpa: "",
    remarks: "",
  });

  /* ================= FETCH STUDENTS ================= */
  const loadStudents = async (status) => {
    setLoading(true);
    try {
      const res = await getAllStudents(status);
      setStudents(res.data);
    } catch (error) {
      console.error("Failed to load students");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadStudents(statusFilter);
  }, [statusFilter]);

  /* ================= ACTION HANDLERS ================= */
  const handleApprove = async (id) => {
    setActionLoading(id);
    try {
      await approveStudent(id);
      loadStudents(statusFilter);
    } finally {
      setActionLoading(null);
    }
  };

  const handleReject = async (id) => {
    setActionLoading(id);
    try {
      await rejectStudent(id);
      loadStudents(statusFilter);
    } finally {
      setActionLoading(null);
    }
  };

  const handleToggleStatus = async (id, currentStatus) => {
    setActionLoading(id);
    const newStatus = currentStatus === "active" ? "inactive" : "active";
    try {
      await updateStudentStatus(id, newStatus);
      loadStudents(statusFilter);
    } finally {
      setActionLoading(null);
    }
  };

  /* ================= ACADEMIC MODAL HANDLERS ================= */
  const openAcademicModal = (student) => {
    setSelectedStudent(student);
    setAcademicForm({
      attendance: student.academic?.attendance || "",
      cgpa: student.academic?.cgpa || "",
      remarks: student.academic?.remarks || "",
    });
    setShowAcademicModal(true);
  };

  const closeAcademicModal = () => {
    setShowAcademicModal(false);
    setSelectedStudent(null);
  };

  const saveAcademicData = async () => {
    try {
      setSaving(true);
      await axios.put(
           `https://student-management-tfu3.onrender.com/students/${selectedStudent._id}/academic`,
              academicForm,
             {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
             },
           }
        );

      
      alert("Academic status updated successfully ✅");
      closeAcademicModal();
      loadStudents(statusFilter);
    } catch (error) {
      alert("Failed to update academic data ❌");
    } finally {
      setSaving(false);
    }
  };

  /* ================= STATUS BADGE ================= */
  const statusBadge = (status) => {
    switch (status) {
      case "pending":
        return <Badge bg="warning">Pending</Badge>;
      case "active":
        return <Badge bg="success">Active</Badge>;
      case "inactive":
        return <Badge bg="secondary">Inactive</Badge>;
      case "rejected":
        return <Badge bg="danger">Rejected</Badge>;
      default:
        return <Badge bg="dark">Unknown</Badge>;
    }
  };

  return (
    <Container fluid className="py-4">
      {/* ================= HEADER ================= */}
      <Row className="mb-3">
        <Col>
          <h4 className="fw-semibold">Student Management</h4>
          <p className="text-muted mb-0">
            Approve, activate, and manage student records
          </p>
        </Col>
      </Row>

      {/* ================= FILTER TABS ================= */}
      <Row className="mb-3">
        <Col>
          <Button
            variant={statusFilter === "pending" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setStatusFilter("pending")}
          >
            Pending
          </Button>
          <Button
            variant={statusFilter === "active" ? "primary" : "outline-primary"}
            className="me-2"
            onClick={() => setStatusFilter("active")}
          >
            Active
          </Button>
          <Button
            variant={statusFilter === "inactive" ? "primary" : "outline-primary"}
            onClick={() => setStatusFilter("inactive")}
          >
            Inactive
          </Button>
        </Col>
      </Row>

      {/* ================= STUDENT TABLE ================= */}
      <Card className="border-0 shadow-sm">
        <Card.Body>
          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" />
            </div>
          ) : students.length === 0 ? (
            <div className="text-center text-muted py-4">
              No students found
            </div>
          ) : (
            <Table responsive hover className="align-middle">
              <thead className="table-light">
                <tr>
                  <th>Student ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Course</th>
                  <th>Year/Sem</th>
                  <th>Status</th>
                  <th className="text-end">Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.map((s) => (
                  <tr key={s._id}>
                    <td>{s.Student_id}</td>
                    <td>{s.name}</td>
                    <td>{s.email}</td>
                    <td>{s.course}</td>
                    <td>{s.year_semister}</td>
                    <td>{statusBadge(s.status)}</td>
                    <td className="text-end">
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => openAcademicModal(s)}
                      >
                        Update Academic
                      </Button>

                      {s.status === "pending" && (
                        <>
                          <Button
                            size="sm"
                            variant="success"
                            className="me-2"
                            disabled={actionLoading === s._id}
                            onClick={() => handleApprove(s._id)}
                          >
                            Approve
                          </Button>
                          <Button
                            size="sm"
                            variant="danger"
                            disabled={actionLoading === s._id}
                            onClick={() => handleReject(s._id)}
                          >
                            Reject
                          </Button>
                        </>
                      )}

                      {(s.status === "active" || s.status === "inactive") && (
                        <Button
                          size="sm"
                          variant={
                            s.status === "active"
                              ? "outline-danger"
                              : "outline-success"
                          }
                          disabled={actionLoading === s._id}
                          onClick={() =>
                            handleToggleStatus(s._id, s.status)
                          }
                        >
                          {s.status === "active"
                            ? "Deactivate"
                            : "Activate"}
                        </Button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>

      {/* ================= ACADEMIC MODAL ================= */}
      <Modal show={showAcademicModal} onHide={closeAcademicModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>Update Academic Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Attendance (%)</Form.Label>
              <Form.Control
                type="number"
                min={0}
                max={100}
                value={academicForm.attendance}
                onChange={(e) =>
                  setAcademicForm({
                    ...academicForm,
                    attendance: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>CGPA</Form.Label>
              <Form.Control
                type="number"
                step="0.1"
                min={0}
                max={10}
                value={academicForm.cgpa}
                onChange={(e) =>
                  setAcademicForm({
                    ...academicForm,
                    cgpa: e.target.value,
                  })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Remarks</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={academicForm.remarks}
                onChange={(e) =>
                  setAcademicForm({
                    ...academicForm,
                    remarks: e.target.value,
                  })
                }
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeAcademicModal}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={saveAcademicData}
            disabled={saving}
          >
            {saving ? "Saving..." : "Save"}
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default AdminStudentManagement;
