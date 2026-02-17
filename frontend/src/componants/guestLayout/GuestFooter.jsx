import { Container, Row, Col } from "react-bootstrap";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaMapMarkerAlt, FaEnvelope, FaPhone } from "react-icons/fa";

const Footer = () => {
  return (
    <>
      <footer className="footer-section">
        <Container>
          <Row className="gy-4">

            {/* About Section */}
            <Col md={4}>
              <h5 className="footer-title">About Student Management System </h5>
              <p className="footer-text">
  Student Management System is a robust web-based application built to efficiently
  manage student records, authentication, and academic workflows using modern
  technologies for secure and scalable institution management.
</p>


              <div className="social-icons">
                <span><FaFacebookF /></span>
                <span><FaTwitter /></span>
                <span><FaLinkedinIn /></span>
              </div>
            </Col>

            {/* Quick Links */}
            <Col md={4}>
              <h5 className="footer-title">Quick Links</h5>
              <ul className="footer-links">
                <li><a href="/">Home</a></li>
                <li><a href="/register">Register</a></li>
                <li><a href="/login">Login</a></li>
              </ul>
            </Col>

            {/* Contact Info */}
            <Col md={4}>
              <h5 className="footer-title">Contact Us</h5>
              <p className="footer-contact">
                <FaMapMarkerAlt /> Ligand Software Solutions, Sankeshwar 591313
              </p>
              <p className="footer-contact">
                <FaEnvelope /> vishalnk322000@gmail.com
              </p>
              <p className="footer-contact">
                <FaPhone /> +91 7719906429
              </p>
            </Col>
          </Row>

          <hr className="footer-divider" />

          {/* Bottom */}
          <div className="footer-bottom text-center">
            <p className="mb-2">
              © 2026 Ligand Software Solutions. All Rights Reserved.
            </p>
           <div className="footer-policy">
            <a href="/privacy-policy">Privacy Policy</a>
            <span>|</span>
           <a href="/terms-of-service">Terms of Service</a>
            <span>|</span>
           <a href="/sitemap">Sitemap</a>
           </div>

          </div>
        </Container>
      </footer>

      {/* Inline CSS */}
      <style>{`
        .footer-section {
          background: linear-gradient(135deg, #6f7ce3, #7b4fa3);
          color: #fff;
          padding: 60px 0 30px;
          animation: fadeUp 1s ease;
        }

        .footer-title {
          font-weight: 600;
          margin-bottom: 18px;
        }

        .footer-text {
          font-size: 14px;
          line-height: 1.7;
          opacity: 0.9;
        }

        .footer-links {
          list-style: none;
          padding: 0;
        }

        .footer-links li {
          margin-bottom: 10px;
        }

        .footer-links a {
          color: #fff;
          text-decoration: none;
          opacity: 0.9;
          transition: all 0.3s ease;
        }

        .footer-links a:hover {
          opacity: 1;
          padding-left: 5px;
        }

        .footer-contact {
          font-size: 14px;
          margin-bottom: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          opacity: 0.9;
        }

        .social-icons span {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          margin-right: 10px;
          border-radius: 50%;
          background: rgba(255,255,255,0.15);
          cursor: pointer;
          transition: transform 0.3s ease, background 0.3s ease;
        }

        .social-icons span:hover {
          transform: translateY(-4px);
          background: rgba(255,255,255,0.3);
        }

        .footer-divider {
          margin: 30px 0 20px;
          border-color: rgba(255,255,255,0.2);
        }

        .footer-bottom {
          font-size: 14px;
          opacity: 0.9;
        }

        .footer-policy a {
          color: #fff;
          text-decoration: none;
          margin: 0 8px;
          opacity: 0.85;
        }

        .footer-policy a:hover {
          opacity: 1;
          text-decoration: underline;
        }

        @keyframes fadeUp {
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
    </>
  );
};

export default Footer;
