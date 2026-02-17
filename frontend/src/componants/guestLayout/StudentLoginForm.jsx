import { useState } from "react";
import axios from "axios";
import { Form, Button, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const StudentLoginForm = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [validated, setValidated] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formEl = e.currentTarget;

    if (!formEl.checkValidity()) {
      e.stopPropagation();
      setValidated(true);
      return;
    }

    setIsLoading(true);
    try {
      const res = await axios.post("https://student-management-tfu3.onrender.com/studentLogin", form );
      // store auth data
      localStorage.setItem("token", res.data.token);
      localStorage.setItem(
        "user",
        JSON.stringify({ role: "student", ...res.data.student })
      );

      setMessage({ text: "Student Login Successful", type: "success" });

      // 🔹 Auto redirect to student home
      setTimeout(() => {
        navigate("/user/home");
      }, 800);
    } catch (err) {
      setMessage({
        text: err.response?.data?.message || "Student login failed",
        type: "danger",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {message && (
        <Alert variant={message.type} className="mb-3 text-center">
          {message.text}
        </Alert>
      )}

      <Form
        noValidate
        validated={validated}
        onSubmit={handleSubmit}
        className="animate-slide"
      >
        <Form.Group className="mb-3">
          <Form.Label>Student Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={form.email}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {/* 🔹 Password with show / hide */}
        <Form.Group className="mb-4">
          <Form.Label>Password</Form.Label>
          <InputGroup>
            <Form.Control
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Enter password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? "Hide" : "Show"}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button
          type="submit"
          size="lg"
          className="w-100 mb-3"
          disabled={isLoading}
        >
          {isLoading ? "Logging in..." : "Login as Student"}
        </Button>

        <div className="text-center">
          <span className="text-muted">
            Don’t have an account?{" "}
            <a href="/register" className="text-decoration-none fw-semibold">
              Register
            </a>
          </span>
        </div>
      </Form>

      {/* 🔹 Inline CSS only */}
      <style>{`
        .form-control {
          border-radius: 8px;
          padding: 10px 14px;
        }

        .form-control:focus {
          box-shadow: 0 0 0 3px rgba(13,110,253,.25);
          border-color: #0d6efd;
        }

        button {
          border-radius: 10px;
          font-weight: 600;
        }

        .animate-slide {
          animation: slideUp 0.5s ease;
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
};

export default StudentLoginForm;
