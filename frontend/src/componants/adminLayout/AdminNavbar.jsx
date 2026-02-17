import { NavLink, useNavigate } from "react-router-dom";

const AdminNavbar = () => {
  const navigate = useNavigate();

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <style>{`
        .admin-nav {
          height: 70px;
          background: #d8d6f893;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0 30px;
          border-bottom: 1px solid #4a5568ff;
        }

        .admin-nav a {
          color: #040b24ff;
          font-weight: 500;
          margin-left: 20px;
          text-decoration: none;
          position: relative;
        }

        .admin-nav a.active {
          color: #3784baff;
        }

 .logout {
  border: 1px solid #09091eff;
  color: #080f57ff;
  font-weight: 500;
  background: transparent;
  padding: 4px 12px;        /* 🔹 reduced size */
  font-size: 1.1 rem;        /* 🔹 slightly smaller text */
  border-radius: 6px;
  cursor: pointer;
  margin-left: 12px;        /* 🔹 space from Messages */
  transition: 
    background 0.3s ease,
    color 0.3s ease,
    box-shadow 0.3s ease,
    transform 0.2s ease;
}

/* Hover animation */
.logout:hover {
  background: linear-gradient(135deg, #4f46e5, #6366f1);
  color: #ffffff;
  box-shadow: 0 6px 16px rgba(79, 70, 229, 0.3); /* slightly lighter */
  transform: translateY(-1px);                  /* subtle lift */
}

/* Click feedback */
.logout:active {
  transform: translateY(0);
  box-shadow: 0 3px 10px rgba(79, 70, 229, 0.25);
}

      `}</style>

      <nav className="admin-nav">
        <strong>Admin Panel</strong>
        <div>
          <NavLink to="/admin/home">Home</NavLink>
          <NavLink to="/admin/dashboard">Dashboard</NavLink>
          <NavLink to="/admin/profile">Profile</NavLink>
          <NavLink to="/admin/messages">Messages</NavLink>
          <NavLink to="/admin/studentmanagement">StudentManagement</NavLink>
          <NavLink to="/admin/report">Report</NavLink>
          <button className="logout" onClick={logout}>Logout</button>
        </div>
      </nav>
    </>
  );
};

export default AdminNavbar;
