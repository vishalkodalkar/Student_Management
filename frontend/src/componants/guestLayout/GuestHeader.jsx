import React, { useEffect } from "react";

 
const GuestHeader = () => {

  // Adds subtle background on scroll
  useEffect(() => {
    const handleScroll = () => {
      const header = document.querySelector(".guest-header");
      if (window.scrollY > 40) {
        header.classList.add("scrolled");
      } else {
        header.classList.remove("scrolled");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="guest-header">
      <div className="container py-4 text-center">
        <h1 className="fw-bold mb-2">
          Student Management System
        </h1>
        <p className="lead mb-0">
          Simplifying student records, authentication, and academic workflows
        </p>
      </div>

      {/* Inline styles only */}
      <style>{`
        .guest-header {
          position: sticky;
          top: 0;
          z-index: 1030;
          background: linear-gradient(
            135deg,
            #4f46e5,
            #6366f1,
            #7c3aed
          );
          color: #ffffff;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .guest-header.scrolled {
          box-shadow: 0 6px 20px rgba(0, 0, 0, 0.18);
        }

        .guest-header h1 {
          font-size: 2rem;
          letter-spacing: 0.5px;
        }

        .guest-header p {
          opacity: 0.95;
          font-size: 1rem;
        }

        @media (min-width: 768px) {
          .guest-header h1 {
            font-size: 2.6rem;
          }

          .guest-header p {
            font-size: 1.1rem;
          }
        }
      `}</style>
    </header>
  );
};

export default GuestHeader;
