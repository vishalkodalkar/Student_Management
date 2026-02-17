import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const UserHome = () => {
  const navigate = useNavigate();

  return (
    <div className="user-home">

      {/* ================= HERO ================= */}
      <section className="hero">
        <motion.div
          className="hero-content"
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9 }}
        >
          <h1>Welcome Back, Scholar</h1>
          <p>
            “Education is the most powerful weapon which you can use to change the world.”
          </p>
          <span>— Nelson Mandela</span>
        </motion.div>
      </section>

      {/* ================= STATS (CLICKABLE ROUTES) ================= */}
      <section className="stats container">

        <StatCard
          title="Attendance"
          value="0%"
          onClick={() => navigate("/user/dashboard?tab=attendance")}
        />

        <StatCard
          title="Courses"
          value="0"
          onClick={() => navigate("/user/course")}
        />

        <StatCard
          title="Exams"
          value="0"
          onClick={() => navigate("/user/dashboard?tab=exams")}
        />

        <StatCard
          title="Messages"
          value="0"
          onClick={() => navigate("/user/dashboard?tab=messages")}
        />

      </section>

      {/* ================= JOURNEY ================= */}
      <section className="journey">
        <h2>Your Academic Journey</h2>

        <div className="journey-grid">
          <JourneyCard
            title="Stay Consistent"
            desc="Daily attendance and discipline shape your success."
          />
          <JourneyCard
            title="Track Progress"
            desc="Know where you stand and where to improve."
          />
          <JourneyCard
            title="Achieve Excellence"
            desc="Every small effort compounds into greatness."
          />
        </div>
      </section>

      {/* ================= STYLES ================= */}
      <style>{`
        .user-home {
          padding-top: 70px;
          background: linear-gradient(180deg, #f8fafc, #eef2ff, #ffffff);
          color: #0f172a;
        }

        .hero {
          min-height: 90vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background:
            radial-gradient(circle at top, rgba(99,102,241,0.18), transparent 60%),
            linear-gradient(135deg, #f1f5ff, #ffffff);
          text-align: center;
          padding: 0 20px;
        }

        .hero h1 {
          font-size: clamp(2.3rem, 5vw, 3.6rem);
          font-weight: 800;
          background: linear-gradient(90deg, #4f46e5, #22d3ee);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin-bottom: 18px;
        }

        .hero p {
          max-width: 720px;
          font-size: 1.15rem;
          color: #475569;
        }

        .stats {
          max-width: 1200px;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
          gap: 24px;
          margin: -90px auto 90px;
          padding: 0 20px;
        }

        .stat-card {
          background: rgba(255,255,255,0.85);
          backdrop-filter: blur(12px);
          border-radius: 22px;
          padding: 30px 24px;
          text-align: center;
          border: 1px solid rgba(99,102,241,0.12);
          box-shadow: 0 12px 30px rgba(79,70,229,0.12);
          cursor: pointer;
          transition: all 0.35s ease;
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 20px 45px rgba(79,70,229,0.18);
        }

        .stat-card::after {
          content: "View";
          display: block;
          margin-top: 6px;
          font-size: 0.85rem;
          color: #6366f1;
          opacity: 0;
          transition: opacity 0.25s ease;
        }

        .stat-card:hover::after {
          opacity: 1;
        }

        .stat-card h2 {
          font-size: 2.2rem;
          font-weight: 800;
          color: #4f46e5;
        }

        .stat-card p {
          color: #64748b;
          font-weight: 500;
        }

        .journey {
          padding: 90px 20px;
          text-align: center;
          background: linear-gradient(180deg, #ffffff, #f8fafc);
        }

        .journey-grid {
          margin-top: 48px;
          max-width: 1200px;
          margin-inline: auto;
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
          gap: 28px;
        }

        .journey-card {
          background: #ffffff;
          border-radius: 22px;
          padding: 34px;
          border: 1px solid rgba(148,163,184,0.25);
          box-shadow: 0 10px 28px rgba(0,0,0,0.06);
          transition: all 0.35s ease;
        }

        .journey-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 45px rgba(0,0,0,0.1);
        }
      `}</style>
    </div>
  );
};

/* ================= COMPONENTS ================= */

const StatCard = ({ title, value, onClick }) => (
  <motion.div
    className="stat-card"
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.97 }}
    onClick={onClick}
  >
    <h2>{value}</h2>
    <p>{title}</p>
  </motion.div>
);

const JourneyCard = ({ title, desc }) => (
  <motion.div
    className="journey-card"
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6 }}
  >
    <h4>{title}</h4>
    <p>{desc}</p>
  </motion.div>
);

export default UserHome;
