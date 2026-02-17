import { NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UserNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .user-nav {
          position: fixed;
          top: 0;
          width: 100%;
          height: 70px;
          z-index: 1000;
          background: rgba(15, 23, 42, 0.75);
          backdrop-filter: blur(12px);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 28px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }

        .brand {
          font-weight: 700;
          color: #e5e7eb;
          letter-spacing: 0.4px;
        }

        .nav-links a {
          color: #cbd5f5;
          margin-left: 22px;
          font-weight: 500;
          text-decoration: none;
          position: relative;
        }

        .nav-links a.active {
          color: #22d3ee;
        }

        .logout {
          margin-left: 24px;
          border: none;
          background: linear-gradient(135deg, #4f46e5, #6366f1);
          color: #fff;
          padding: 6px 18px;
          border-radius: 10px;
          font-weight: 500;
          cursor: pointer;
        }

        @media (max-width: 768px) {
          .nav-links {
            display: none;
          }
        }
      `}</style>

      <motion.nav
        className="user-nav"
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className="brand">Student Panel</div>

        <div className="nav-links">
          <NavLink to="/user/home">Home</NavLink>
          <NavLink to="/user/dashboard">Dashboard</NavLink>
          <NavLink to="/user/profile">Profile</NavLink>
          <NavLink to="/user/course">Course</NavLink>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </motion.nav>
    </>
  );
};

export default UserNavbar;
