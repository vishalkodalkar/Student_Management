import { NavLink } from "react-router-dom";

const GuestNavbar = () => {
  return (
    <>
      <style>{`
        .guest-nav {
          height: 70px;
          background: rgba(75, 101, 245, 0.65);
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          border-bottom: 3px solid rgba(255, 260, 255, 0.35);
          backdrop-filter: blur(8px);
        }

        .guest-nav a {
          color: #eef2ff;
          margin-left: 22px;
          text-decoration: none;
          position: relative;
          font-weight: 520; /* slightly bold */
          transition: color 0.25s ease;
        }

        /* underline animation */
        .guest-nav a::after {
          content: "";
          position: absolute;
          bottom: -6px;
          left: 0;
          width: 0;
          height: 2px;
          background: #ffff;
          transition: width 0.3s ease;
        }

        /* hover + active state */
        .guest-nav a:hover {
          color: #ffffff;
        }

        .guest-nav a:hover::after,
        .guest-nav a.active::after {
          width: 100%;
        }

        .brand {
          font-weight: 700;
          font-size: 18px;
          color: #ffffff;
          letter-spacing: 0.3px;
        }
      `}</style>

      <nav className="guest-nav">
        <div className="brand">Student Management System </div>
        <div>
          <NavLink to="/home">Home</NavLink>
          <NavLink to="/about">About</NavLink>
          <NavLink to="/contact">Contact</NavLink>
          <NavLink to="/login">Login</NavLink>
          <NavLink to="/register">Register</NavLink>
        </div>
      </nav>
    </>
  );
};

export default GuestNavbar;
