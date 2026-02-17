import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Button,
  Badge,

  Form,
} from "react-bootstrap";
import { motion } from "framer-motion";
import {
  FaUserShield,
  FaLock,
  FaEdit,
  FaSave,
  FaTimes,
  FaMoon,
  FaSun,
  FaCamera,
} from "react-icons/fa";

const AdminProfile = () => {
  /* ================= ROLE & PERMISSIONS ================= */
  // later this will come from authService / JWT
  const role = "SUPER_ADMIN"; // SUPER_ADMIN | ADMIN | VIEW_ONLY

  const canEditPersonal =
    role === "SUPER_ADMIN" || role === "ADMIN";
  const canEditSecurity = role === "SUPER_ADMIN";

  /* ================= DARK MODE ================= */
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("admin-dark") === "true"
  );

  useEffect(() => {
    localStorage.setItem("admin-dark", darkMode);
  }, [darkMode]);

  /* ================= PROFILE DATA ================= */
  const initialAdmin = {
    name: "Vishal Kodalkar",
    role: "System Administrator",
    organization: "Ligand Software Solutions",
    status: "Active",
    lastLogin: "12 Jan 2026, 10:42 AM",
    adminId: "ADM-10234",
    email: "vishalnk322000@gmail.com",
    phone: "+91 7719906429",
    address: "Sankeshwar, Karnataka, India",
    qualification: "MCA",
    department: "IT Administration",
    experience: "3+ Years",
    joinedOn: "01 Aug 2024",
    avatar: "/admin-avatar.png", // replace later with API image
  };

  const [admin, setAdmin] = useState(initialAdmin);
  const [editMode, setEditMode] = useState(false);
  const [tempAdmin, setTempAdmin] = useState(initialAdmin);

  /* ================= HANDLERS ================= */
  const handleEdit = () => {
    setTempAdmin(admin);
    setEditMode(true);
  };

  const handleCancel = () => {
    setTempAdmin(admin);
    setEditMode(false);
  };

  const handleSave = () => {
    setAdmin(tempAdmin);
    setEditMode(false);
    // later: API PUT /admin/profile
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempAdmin({ ...tempAdmin, [name]: value });
  };

  const handlePhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const preview = URL.createObjectURL(file);
      setTempAdmin({ ...tempAdmin, avatar: preview });
    }
  };

  const themeClass = darkMode
    ? "bg-gray-900 text-gray-200"
    : "bg-gray-50 text-gray-900";

  const cardClass = darkMode
    ? "bg-gray-800 text-gray-200"
    : "bg-white";

  /* ================= RENDER ================= */
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className={`${themeClass} min-h-screen py-4`}
    >
      <Container fluid="lg">
        {/* ================= HEADER ================= */}
        <Card className={`border-0 shadow-sm mb-4 ${cardClass}`}>
          <Card.Body className="d-flex align-items-center gap-4">
            <div className="relative">
              <img
                src={editMode ? tempAdmin.avatar : admin.avatar}
                alt="Admin"
                className="rounded-full border"
                width={90}
                height={90}
              />

              {editMode && canEditPersonal && (
                <label className="absolute bottom-0 right-0 bg-indigo-600 text-white p-2 rounded-full cursor-pointer">
                  <FaCamera />
                  <input
                    type="file"
                    hidden
                    accept="image/*"
                    onChange={handlePhotoChange}
                  />
                </label>
              )}
            </div>

            <div>
              <h4 className="mb-1 font-semibold">
                {admin.name}
              </h4>
              <p className="mb-1">
                <FaUserShield className="me-1" />
                {admin.role}
              </p>
              <Badge bg="success">{admin.status}</Badge>
            </div>

            <div className="ms-auto text-sm">
              <div>{admin.organization}</div>
              <div className="opacity-75">
                Last Login: {admin.lastLogin}
              </div>

              <Button
                variant="outline-secondary"
                size="sm"
                className="mt-2"
                onClick={() => setDarkMode(!darkMode)}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </Button>
            </div>
          </Card.Body>
        </Card>

        {/* ================= ACTION BAR ================= */}
        {(canEditPersonal || canEditSecurity) && (
          <div className="mb-3 text-end">
            {!editMode ? (
              <Button
                variant="primary"
                size="sm"
                onClick={handleEdit}
              >
                <FaEdit className="me-1" /> Edit Profile
              </Button>
            ) : (
              <>
                <Button
                  variant="success"
                  size="sm"
                  className="me-2"
                  onClick={handleSave}
                >
                  <FaSave className="me-1" /> Save
                </Button>
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={handleCancel}
                >
                  <FaTimes className="me-1" /> Cancel
                </Button>
              </>
            )}
          </div>
        )}

        {/* ================= CONTENT ================= */}
        <Row className="g-4">
          {/* PERSONAL */}
          <Col md={6}>
            <Card className={`border-0 shadow-sm ${cardClass}`}>
              <Card.Body>
                <h5 className="mb-3">Personal Information</h5>

                <Form>
                  <Form.Group className="mb-2">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      size="sm"
                      name="email"
                      value={tempAdmin.email}
                      disabled={!editMode || !canEditPersonal}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group className="mb-2">
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      size="sm"
                      name="phone"
                      value={tempAdmin.phone}
                      disabled={!editMode || !canEditPersonal}
                      onChange={handleChange}
                    />
                  </Form.Group>

                  <Form.Group>
                    <Form.Label>Address</Form.Label>
                    <Form.Control
                      size="sm"
                      name="address"
                      value={tempAdmin.address}
                      disabled={!editMode || !canEditPersonal}
                      onChange={handleChange}
                    />
                  </Form.Group>
                </Form>
              </Card.Body>
            </Card>
          </Col>

          {/* SECURITY */}
          <Col md={6}>
            <Card className={`border-0 shadow-sm ${cardClass}`}>
              <Card.Body>
                <h5 className="mb-3">
                  <FaLock className="me-2" />
                  Security & Access
                </h5>

                <p className="mb-1">
                  <strong>Role Level:</strong>{" "}
                  {role}
                </p>
                <p className="mb-3">
                  <strong>Password Status:</strong>{" "}
                  Secure
                </p>

                <Button
                  variant="outline-warning"
                  size="sm"
                  disabled={!canEditSecurity}
                >
                  Change Password
                </Button>

                {!canEditSecurity && (
                  <div className="text-muted text-sm mt-2">
                    Only SUPER_ADMIN can modify security
                  </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </motion.div>
  );
};

export default AdminProfile;
