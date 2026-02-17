import { useEffect } from "react";

 
const AdminHome = () => {

  // 🔹 Scroll-based navbar background control
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 60) {
        document.body.classList.add("navbar-scrolled");
      } else {
        document.body.classList.remove("navbar-scrolled");
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>

      {/* ================= HERO ================= */}
      <section className="hero-section text-white">
        <div className="container hero-content text-center">
          <h1 className="display-5 fw-bold mb-3 animate-fade">
            Admin Home
          </h1>

          <p className="lead mb-4 animate-fade delay-1">
            Centralized control panel to manage students, academics,
            users, and institutional data efficiently.
          </p>
        </div>
      </section>

      {/* ================= ABOUT ADMIN ================= */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6 mb-4 animate-slide">
              <h2 className="fw-semibold mb-3">
                About Admin Panel
              </h2>
              <p className="text-muted">
                The Admin Panel provides complete authority over the
                Student Management System. Administrators can manage
                student records, monitor attendance, control courses,
                analyze performance reports, and ensure secure system
                operations from a single dashboard.
              </p>
            </div>

            <div className="col-md-6 animate-slide delay-1">
              <img
                src="/admin-workspace.png"
                alt="Admin workspace"
                className="img-fluid rounded shadow-sm"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= ADMIN MODULES ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-semibold mb-4">
            Administrative Modules
          </h2>

          <div className="row g-4">

            {[
              {
                title: "Student Management",
                img: "/student-management.png",
                desc: "Manage student profiles, enrollment data, and academic records centrally."
              },
              {
                title: "Attendance Tracking",
                img: "/attendance-tracking.png",
                desc: "Monitor daily attendance with accurate records and real-time insights."
              },
              {
                title: "Course Management",
                img: "/course-management.jpg",
                desc: "Create, update, and organize courses, semesters, and curriculum structure."
              },
              {
                title: "Exams & Grades",
                img: "/exam-management.png",
                desc: "Maintain examination records, grading systems, and academic performance."
              },
              {
                title: "User Management",
                img: "/user-management.png",
                desc: "Control roles, permissions, and access levels for admins and students."
              },
              {
                title: "Reports & Analytics",
                img: "/report-analysis.png",
                desc: "Generate analytical reports to support data-driven institutional decisions."
              }
            ].map((item, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 border-0 shadow-sm feature-card animate-fade">
                  <img
                    src={item.img}
                    className="card-img-top p-3"
                    alt={item.title}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{item.title}</h5>
                    <p className="card-text text-muted">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* ================= WHY ADMIN ================= */}
      <section className="why-section text-white py-5">
        <div className="container text-center">
          <h2 className="fw-semibold mb-3 animate-fade">
            Why This Admin System?
          </h2>
          <p className="lead animate-fade delay-1">
            Designed for reliability, scalability, and operational
            clarity—helping institutions manage data securely and efficiently.
          </p>
        </div>
      </section>

      {/* ================= TECH STACK ================= */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-semibold mb-4">
            Technology Stack
          </h2>

          <div className="row justify-content-center g-3">
            {["React.js", "Node.js", "Express.js", "MongoDB", "Bootstrap"].map(
              (tech, index) => (
                <div className="col-6 col-md-2 text-center" key={index}>
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
        .hero-section {
          min-height: 80vh;
          padding-top: 120px;
          background: linear-gradient(
            131deg,
            #6696c9ff,
            #276bcbff,
            #6c86abff
          );
        }

        .hero-content {
          padding-bottom: 80px;
        }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 28px rgba(0,0,0,0.15);
        }

        .why-section {
          background: linear-gradient(135deg, #334155, #1e293b);
        }

        .animate-fade {
          opacity: 0;
          animation: fadeIn 0.9s ease forwards;
        }

        .animate-slide {
          opacity: 0;
          animation: slideUp 0.9s ease forwards;
        }

        .delay-1 { animation-delay: 0.2s; }

        @keyframes fadeIn {
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

export default AdminHome;
