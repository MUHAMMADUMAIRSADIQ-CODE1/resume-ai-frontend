import React, { useContext } from "react";
import { context } from "../../store/context";
import { Link } from "react-router-dom";

const Footer = () => {
   const { user ,sidebar} = useContext(context);
  return (
    <footer className="footer-section pt-5 pb-4 mt-5 border-top">

      <div className="container">

        <div className="row g-4 text-center text-md-start">

          {/* Brand */}
          <div className="col-12 col-md-4">
            <h4 className="fw-bold mb-3">AI Resume Analyzer</h4>
            <p className="small text-secondary">
              A smart AI-powered platform that helps you analyze, improve,
              and optimize your resume for better job opportunities.
            </p>
          </div>

          {/* Links */}
          <div className="col-12 col-md-4">
            <h6 className="mb-3 fw-bold">Quick Links</h6>

            <ul className="list-unstyled small">
              <li><Link to='/' className="footer-link">Home</Link></li>
              <li><Link to='/dashboard' className="footer-link">Features</Link></li>
              <li><Link to='/about'  className="footer-link">How It Works</Link></li>
              <li><Link to='/contact'  className="footer-link">Contact</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-12 col-md-4">
            <h6 className="mb-3 fw-bold">Connect</h6>

            <div className="d-flex flex-column gap-2 small">

              <a href="https://github.com/MUHAMMADUMAIRSADIQ-CODE1" className="footer-link">
                <i className="bi bi-github me-2"></i> GitHub
              </a>

              <a href="https://www.linkedin.com/in/muhammad-umair-sadiq-047aa73a5/" className="footer-link">
                <i className="bi bi-linkedin me-2"></i> LinkedIn
              </a>

            </div>
          </div>

        </div>

        <hr className="border-secondary my-4" />

        {/* Bottom text */}
        <div className="text-center small text-secondary">
          © {new Date().getFullYear()} AI Resume Analyzer • Built By Umair ❤️
        </div>

      </div>
    </footer>
  );
};

export default Footer;