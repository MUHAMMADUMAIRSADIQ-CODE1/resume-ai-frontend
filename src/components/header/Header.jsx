import React, { useState, useContext } from 'react'
import { useAuth } from '../../auth/hooks/hook'
import { Link } from 'react-router-dom'
import Profile from '../../Profile/Profile'
import { motion } from 'framer-motion'
import 'bootstrap/dist/css/bootstrap.min.css'
import { context } from '../../store/context'

const Header = () => {
  const { handleLogout, user } = useAuth()
  let { profile, setProfile } = useContext(context)

  const [open, setOpen] = useState(false)

  async function signOut() {
    await handleLogout()
    localStorage.setItem('url', '')
  }

  return (
    <>
      {profile && <Profile profile={profile} setProfile={setProfile} />}

      {/* ================= NAVBAR ================= */}
      <motion.nav
        className="navbar navbar-expand-lg bg-white shadow-sm sticky-top px-3"
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        style={{ position: 'fixed', top: '0px', left: '0px', right: '0px' }}
      >
        <div className="container-fluid d-flex align-items-center justify-content-between">

          {/* LOGO */}
          <Link className="navbar-brand d-flex align-items-center fw-bold" to="/">
            <i className="bi bi-robot fs-3 text-primary"></i>
            <span className="ms-2 d-none d-sm-inline">AI Resume</span>
          </Link>

          {/* RIGHT SIDE */}
          <div className="d-flex align-items-center flex-grow-1 justify-content-end">

            {/* ===== LINKS (Desktop Only) ===== */}
            <ul className="navbar-nav mx-auto gap-3 d-none d-lg-flex">
              {[{ text: 'Home', path: '/' }, { text: 'About', path: '/' }, { text: 'Features', path: '/dashboard' }, { text: 'Contact', path: '/' }].map((item, i) => (
                <li key={i} className="nav-item">
                  <Link className="nav-link fw-medium text-dark" to={item.path}>
                    {item.text}
                  </Link>
                </li>
              ))}
            </ul>

            {/* ===== SEARCH (Desktop Only) ===== */}
            <input
              className="form-control rounded-pill me-3 d-none d-lg-block"
              type="search"
              placeholder="Search..."
              style={{ width: '200px' }}
            />

            {/* ===== PROFILE (Always Visible) ===== */}
            <div className="dropdown">
              <img
                src={user?.profileURL || 'https://via.placeholder.com/40'}
                width="40"
                height="40"
                className="rounded-circle border shadow-sm"
                alt="profile"
                data-bs-toggle="dropdown"
                style={{ cursor: 'pointer', objectFit: 'cover' }}
              />

              <ul className="dropdown-menu dropdown-menu-end">
                <li><button className="dropdown-item">New Project</button></li>
                <li><button className="dropdown-item">Settings</button></li>
                <li>
                  <button
                    className="dropdown-item"
                    onClick={() => {
                      const newState = !profile
                      setProfile(newState)
                      localStorage.setItem('profile', JSON.stringify(newState))
                    }}
                  >
                    Profile
                  </button>
                </li>
                <li><hr /></li>
                <li>
                  <button className="dropdown-item text-danger" onClick={signOut}>
                    Sign Out
                  </button>
                </li>
              </ul>
            </div>

          </div>
        </div>
      </motion.nav>

      {/* ================= STYLE ================= */}
      <style>{`
        @media (max-width: 430px) {
          .navbar-brand span {
            display: none !important;
          }
        }
      `}</style>
    </>
  )
}

export default Header