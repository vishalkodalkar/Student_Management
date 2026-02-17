import { useState } from "react";
import StudentRegisterForm from "./StudentRegisterForm";
import AdminRegisterForm from "./AdminRegisterForm";

const Register = () => {
  const [mode, setMode] = useState(null); // student | admin

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="card shadow-lg p-4 animate-fade"
        style={{ width: "420px", borderRadius: "15px" }}
      >
        <h3 className="text-center fw-bold mb-4 text-primary">
          Create Account
        </h3>

        {!mode && (
          <div className="d-grid gap-3">
            <button
              className="btn btn-outline-primary btn-lg register-btn"
              onClick={() => setMode("student")}
            >
              🎓 Register as Student
            </button>

            <button
              className="btn btn-outline-danger btn-lg register-btn"
              onClick={() => setMode("admin")}
            >
              🛡️ Register as Admin
            </button>
          </div>
        )}

        {mode === "student" && (
          <div className="animate-slide">
            <StudentRegisterForm />
          </div>
        )}

        {mode === "admin" && (
          <div className="animate-slide">
            <AdminRegisterForm />
          </div>
        )}
      </div>

      {/* Inline animation styles (no extra file needed) */}
      <style>{`
        .animate-fade {
          animation: fadeIn 0.6s ease-in-out;
        }

        .animate-slide {
          animation: slideUp 0.5s ease;
        }

        .register-btn:hover {
          transform: translateY(-2px);
          transition: 0.3s;
          box-shadow: 0 8px 20px rgba(0,0,0,0.15);
        }

        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: scale(0.95);
          }
          to {
            opacity: 1;
            transform: scale(1);
          }
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
    </div>
  );
};

export default Register;
