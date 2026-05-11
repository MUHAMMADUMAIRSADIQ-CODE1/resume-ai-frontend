import React, { useContext } from "react";
import { context } from "../../store/context";
import { Link } from "react-router-dom";

const LandingHeader = () => {
    const { theme, setTheme, setState, user } = useContext(context);

    const toggleTheme = () => {
        setTheme((prev) => (prev === "dark" ? "light" : "dark"));
    };

    return (
        <header
            style={{
                background: "var(--bg)",
                borderBottom: "1px solid var(--border)",
            }}
            className="sticky-top"
        >

            <nav className="navbar navbar-expand-lg">
                <div className="container">

                    {/* LOGO */}
                    <a
                        className="navbar-brand fw-bold d-flex align-items-center gap-2"
                        style={{ color: "var(--text)" }}
                    >
                        <i className="bi bi-braces-asterisk text-primary fs-4"></i>
                        AI Resume
                    </a>

                    {/* DESKTOP NAV */}
                    <div className="d-none d-lg-flex ms-auto align-items-center gap-4">

                        <a className="nav-link-custom" href="#" >Home</a>
                        {user ? <Link to='/dashboard' className="nav-link-custom" href="#features">Dashboard</Link> :
                            <a className="nav-link-custom" href="#" onClick={()=>setState("Login")}>Dashboard</a>}
                        <a className="nav-link-custom" href="#about">About</a>
                        <a className="nav-link-custom" href="#contact">Contact</a>
                        <a className="nav-link-custom" href="#contact" onClick={() => setState("Login")}>Login</a>
                        <a className="nav-link-custom" href="#contact" onClick={() => setState("Signup")}>Signup</a>

                        <button
                            onClick={toggleTheme}
                            className="btn btn-sm theme-btn"
                        >
                            {theme === "dark" ? "🌙" : "☀️"}
                        </button>

                    </div>

                    {/* MOBILE HAMBURGER */}
                    <button
                        className="btn d-lg-none theme-btn"
                        data-bs-toggle="offcanvas"
                        data-bs-target="#mobileMenu"
                    >
                        <i className="bi bi-list fs-3"></i>
                    </button>

                </div>
            </nav>

            {/* OFFCANVAS MOBILE */}
            <div
                className="offcanvas offcanvas-end"
                id="mobileMenu"
                style={{
                    background: "var(--bg)",
                    color: "var(--text)",
                }}
            >

                <div className="offcanvas-header border-bottom">
                    <h5 className="fw-bold">Menu</h5>
                    <button className="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>
                </div>

                <div className="offcanvas-body d-flex flex-column gap-2">

                    <a className="side-link" href="#" data-bs-dismiss="offcanvas" >Home</a>
                    <Link to='/dashboard' className="side-link" href="#features">Features</Link>
                    <a className="side-link" href="#about" data-bs-dismiss="offcanvas">About</a>
                    <a className="side-link" href="#contact" data-bs-dismiss="offcanvas">Contact</a>
                    <a className="side-link" href="#contact" data-bs-dismiss="offcanvas" onClick={() => setState("Signup")} >Signup</a>
                    <a className="side-link" href="#contact" data-bs-dismiss="offcanvas" onClick={() => setState("Login")}>Login</a>

                    <hr />

                    <button onClick={toggleTheme} className="btn btn-primary w-100">
                        Toggle Theme
                    </button>

                </div>

            </div>

            {/* STYLE */}
            <style>{`
        .nav-link-custom {
          color: var(--text);
          text-decoration: none;
          font-weight: 500;
          transition: 0.2s;
        }

        .nav-link-custom:hover {
          color: #0d6efd;
        }

        .theme-btn {
          border: 1px solid var(--border);
          background: var(--card);
          color: var(--text);
        }

        .side-link {
          padding: 12px 14px;
          border-radius: 8px;
          text-decoration: none;
          color: var(--text);
        }

        .side-link:hover {
          background: rgba(0,123,255,0.1);
        }
      `}</style>

        </header>
    );
};

export default LandingHeader;