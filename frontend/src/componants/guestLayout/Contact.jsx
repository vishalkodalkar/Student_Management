import { useState } from "react";
import axios from "axios";

const Contact = () => {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    subject: "Admission",
    message: "",
  });

  const [status, setStatus] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");

    try {
      await axios.post("https://student-management-tfu3.onrender.com/contact", form);
      setStatus("success");
      setForm({
        fullName: "",
        email: "",
        phone: "",
        subject: "Admission",
        message: "",
      });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section className="contact-hero py-5">
      <div className="container">
        <div className="row g-5">
          <div className="col-md-5">
            <h2 className="fw-bold">Contact Us</h2>
            <p className="text-muted">
              Reach out for admissions, support, or queries.
            </p>

            <ul className="list-unstyled">
              <li>📍 Sankeshwar, Karnataka</li>
              <li>✉️ vishalnk322000@gmail.com</li>
              <li>📞 +91 7719906429</li>
            </ul>
          </div>

          <div className="col-md-7">
            <form onSubmit={handleSubmit} className="card p-4 shadow">
              <input
                className="form-control mb-3"
                placeholder="Full Name"
                name="fullName"
                value={form.fullName}
                onChange={handleChange}
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
              />
              <input
                className="form-control mb-3"
                placeholder="Phone (optional)"
                name="phone"
                value={form.phone}
                onChange={handleChange}
              />

              <select
                className="form-control mb-3"
                name="subject"
                value={form.subject}
                onChange={handleChange}
              >
                <option>Admission</option>
                <option>Query</option>
                <option>Support</option>
                <option>Other</option>
              </select>

              <textarea
                className="form-control mb-3"
                placeholder="Message"
                rows="4"
                name="message"
                value={form.message}
                onChange={handleChange}
                required
              />

              <button className="btn btn-primary">
                {status === "loading" ? "Sending..." : "Send Message"}
              </button>

              {status === "success" && (
                <p className="text-success mt-2">
                  Message sent successfully
                </p>
              )}
              {status === "error" && (
                <p className="text-danger mt-2">
                  Failed to send message
                </p>
              )}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
