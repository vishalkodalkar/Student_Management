import React, { useState } from "react";
import axios from "axios";
import { Form, Button, Alert } from "react-bootstrap";

const StudentRegister = () => {
  const [formData, setFormData] = useState({
    Student_id: "",
    name: "",
    email: "",
    contact: "",
    password: "",
    course: "",
    year_semister: "",
  });

  const [message, setMessage] = useState(null);
  const [validated, setValidated] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    if (!form.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post(`https://student-management-tfu3.onrender.com/studentRegister`, formData);
      setMessage({ text: res.data.message, type: "success" });
      setValidated(false);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Something went wrong",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {message && (
        <Alert variant={message.type} className="mb-3">
          {message.text}
        </Alert>
      )}

      <Form noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Student ID</Form.Label>
          <Form.Control
            name="Student_id"
            value={formData.Student_id}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Name</Form.Label>
          <Form.Control
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Contact</Form.Label>
          <Form.Control
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 🔹 PASSWORD FIELD WITH INSTRUCTION */}
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            minLength={6}
          />
          <Form.Text className="text-muted">
            At least 6 characters
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Course</Form.Label>
          <Form.Control
            name="course"
            value={formData.course}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Year / Semester</Form.Label>
          <Form.Control
            name="year_semister"
            value={formData.year_semister}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button
          type="submit"
          className="w-100 mb-3"
          size="lg"
          disabled={isLoading}
        >
          {isLoading ? "Creating Account..." : "Register"}
        </Button>

        {/* 🔹 ALREADY HAVE ACCOUNT LINK */}
        <div className="text-center">
          <span className="text-muted">
            Already have an account?{" "}
            <a href="/login" className="text-decoration-none fw-semibold">
              Sign in
            </a>
          </span>
        </div>
      </Form>

      {/* Inline styling */}
      <style>{`
        .form-control {
          border-radius: 8px;
          padding: 10px 14px;
        }
        .form-control:focus {
          box-shadow: 0 0 0 3px rgba(13,110,253,.25);
        }
        button {
          border-radius: 10px;
          font-weight: 600;
        }
      `}</style>
    </>
  );
};

export default StudentRegister;
