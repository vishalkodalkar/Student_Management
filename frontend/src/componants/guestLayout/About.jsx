import React from "react";

/**
 * About Page
 * Student Management System
 * UI-only | Bootstrap-based | Animated
 */

const About = () => {
  return (
    <div>

      {/* ================= ABOUT HERO ================= */}
      <section className="about-hero text-white">
        <div className="container text-center py-5">
          <h1 className="fw-bold mb-3 animate-fade">
            About Student Management System
          </h1>
          <p className="lead animate-fade delay-1">
            A modern digital solution designed to manage student records,
            authentication, and academic workflows efficiently.
          </p>
        </div>
      </section>

      {/* ================= ABOUT CONTENT ================= */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center g-5">

            {/* LEFT CONTENT */}
            <div className="col-md-6 animate-slide">
              <h2 className="fw-semibold mb-3">
                What is This System?
              </h2>
              <p className="text-muted">
                The Student Management System is a secure and scalable web
                application developed to manage student information, academic
                records, and user authentication in a centralized platform.
              </p>
              <p className="text-muted">
                It minimizes manual effort, improves transparency, and ensures
                efficient communication between students and administrators
                using modern web technologies.
              </p>
            </div>

            {/* RIGHT HIGHLIGHT CARD */}
            <div className="col-md-6 animate-slide delay-1">
              <div className="card border-0 shadow-sm about-highlight-card">
                <div className="card-body">
                  <h5 className="fw-semibold mb-3">
                    Key Highlights
                  </h5>
                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">
                      Centralized student data management
                    </li>
                    <li className="list-group-item">
                      Secure login and role-based access
                    </li>
                    <li className="list-group-item">
                      Efficient academic workflow handling
                    </li>
                    <li className="list-group-item">
                      Admin and student role separation
                    </li>
                  </ul>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ================= CORE CAPABILITIES ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-semibold mb-4">
            Core Capabilities
          </h2>

          <div className="row g-4">
            {[
              {
                title: "Student Records Management",
                desc: "Maintain accurate student profiles and academic data in a centralized system.",
              },
              {
                title: "Administrative Control",
                desc: "Admins can manage users, monitor data, and control system operations securely.",
              },
              {
                title: "Authentication & Security",
                desc: "Secure authentication with encrypted passwords and role-based authorization.",
              },
              {
                title: "Scalable Architecture",
                desc: "Built using modern MERN stack technologies for future growth and scalability.",
              },
            ].map((item, index) => (
              <div className="col-md-6" key={index}>
                <div
                  className="card h-100 border-0 shadow-sm feature-card animate-fade"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="card-body">
                    <h5 className="fw-semibold mb-2">
                      {item.title}
                    </h5>
                    <p className="text-muted mb-0">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= TECHNOLOGY STACK ================= */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-semibold mb-4">
            Technology Stack
          </h2>

          <div className="row justify-content-center g-3">
            {["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap"].map(
              (tech, index) => (
                <div className="col-6 col-md-2" key={index}>
                  <div className="card border-0 shadow-sm py-3 animate-fade">
                    <strong>{tech}</strong>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* ================= STYLES ================= */}
      <style>{`
        .about-hero {
          background: linear-gradient(135deg, #4f46e5, #6366f1, #7c3aed);
        }

        .animate-fade {
          opacity: 0;
          animation: fadeIn 0.9s ease forwards;
        }

        .animate-slide {
          opacity: 0;
          animation: slideUp 0.9s ease forwards;
        }

        .delay-1 {
          animation-delay: 0.2s;
        }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 28px rgba(0,0,0,0.15);
        }

        .about-highlight-card {
          background: linear-gradient(
            135deg,
            rgba(79, 70, 229, 0.08),
            rgba(124, 58, 237, 0.08)
          );
          border-left: 5px solid #6366f1;
        }

        .about-highlight-card .list-group-item {
          background: transparent;
          border: none;
          padding-left: 0;
          font-weight: 500;
        }

        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
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

export default About;
