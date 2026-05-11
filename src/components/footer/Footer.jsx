import React, { useContext } from "react";
import { context } from "../../store/context";

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
              <li><a href="#" className="footer-link">Home</a></li>
              <li><a href="#" className="footer-link">Features</a></li>
              <li><a href="#" className="footer-link">How It Works</a></li>
              <li><a href="#" className="footer-link">Contact</a></li>
            </ul>
          </div>

          {/* Social */}
          <div className="col-12 col-md-4">
            <h6 className="mb-3 fw-bold">Connect</h6>

            <div className="d-flex flex-column gap-2 small">

              <a href="#" className="footer-link">
                <i className="bi bi-github me-2"></i> GitHub
              </a>

              <a href="#" className="footer-link">
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