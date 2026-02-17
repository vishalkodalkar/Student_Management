import { Link } from "react-router-dom";
import { useEffect } from "react";

 

const Home = () => {

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
      <section className="hero-section text-black">
        <div className="container text-center hero-content">
          <h1 className="display-5 fw-bold mb-3 animate-fade">
            Student Management System
          </h1>

          <p className="lead mb-4 animate-fade delay-1 ">
            Empowering educational institutions with efficient digital student
            records, secure authentication, and streamlined academic workflows.
          </p>

          <div className="d-flex justify-content-center gap-3 animate-fade delay-2">
            <Link to="/login" className="btn btn-primary btn-lg px-4 shadow-sm">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline-light btn-lg px-4">
              Register
            </Link>
          </div>
        </div>
      </section>

      {/* ================= ABOUT ================= */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">

            <div className="col-md-6 mb-4 animate-slide">
              <h2 className="fw-semibold mb-3">
                About Student Management System
              </h2>
              <p className="text-muted">
                The Student Management System is a secure and scalable web-based
                platform designed to manage student records, authentication,
                and academic workflows efficiently. It centralizes institutional
                data and improves transparency across departments.
              </p>
            </div>

            <div className="col-md-6 animate-slide delay-1">
              <img
                src="/student-graduating.png"
                alt="Students gratuating together"
                className="img-fluid rounded shadow-sm"
                loading="lazy"
              />
            </div>

          </div>
        </div>
      </section>

      {/* ================= FEATURES ================= */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-semibold mb-4">
            Core Features
          </h2>

          <div className="row g-4">
            {[
              {
                title: "Student Registration & Login",
                img: "/student-registration.png",
                desc: "Secure and streamlined registration and authentication system for students with role-based access control."
              },
              {
                title: "Admin Management Panel",
                img: "/user-management.png",
                desc: "Powerful administrative dashboard to manage students, monitor records, and control system operations efficiently."
              },
              {
                title: "Course & Semester Tracking",
                img: "/course-management.jpg",
                desc: "Organized management of courses, semesters, and academic progress with clear data visibility."
              },
              {
                title: "Secure Role-Based Access",
                img: "/role-based.png",
                desc: "Ensures data protection by granting access strictly based on user roles such as admin and student."
              },
              {
                title: "Centralized Student Records",
                img: "/report-analysis.png",
                desc: "All student information stored securely in one centralized system for easy access and transparency."
              },
            ].map((feature, index) => (
              <div className="col-md-4" key={index}>
                <div className="card h-100 border-0 shadow-sm feature-card animate-fade">
                  <img
                    src={feature.img}
                    alt={feature.title}
                    className="card-img-top"
                    loading="lazy"
                  />
                  <div className="card-body">
                    <h5 className="card-title">{feature.title}</h5>
                    <p className="card-text text-muted">
                      {feature.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= WHY ================= */}
      <section className="why-section text-white py-5">
        <div className="container text-center">
          <h2 className="fw-semibold mb-3 animate-fade">
            Why Choose This System?
          </h2>
          <p className="lead animate-fade delay-1">
            A modern, easy-to-use platform built with scalability, transparency,
            and long-term institutional growth in mind.
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
            {["React.js", "Express.js", "MongoDB", "Bootstrap"].map(
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
          min-height: 100vh;
          padding-top: 120px;
          background:
            linear-gradient(
              rgba(80, 78, 125, 0.35),
              rgba(50, 28, 89, 0.32)
            ),
            url("/campus.png") center/cover no-repeat;
        }

        .hero-content {
          padding-bottom: 80px;
        }

        .navbar {
          background: transparent !important;
          transition: background 0.3s ease,
            box-shadow 0.3s ease,
            backdrop-filter 0.3s ease;
        }

        body.navbar-scrolled .navbar {
          background: rgba(2, 6, 23, 0.85) !important;
          backdrop-filter: blur(10px);
          box-shadow: 0 8px 24px rgba(0,0,0,0.25);
        }

        .feature-card {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          overflow: hidden;
        }

        .feature-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 14px 28px rgba(0,0,0,0.15);
        }

        .feature-card img {
          height: 200px;
          object-fit: cover;
          transition: transform 0.4s ease;
        }

        .feature-card:hover img {
          transform: scale(1.05);
        }

        .why-section {
          background: linear-gradient(135deg, #6366f1, #7c3aed);
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
        .delay-2 { animation-delay: 0.4s; }

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

export default Home;
