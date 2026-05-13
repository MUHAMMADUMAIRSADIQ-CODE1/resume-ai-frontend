import React, { useContext, useState } from 'react'
import { useAuth } from '../../auth/hooks/hook'
import { context } from '../../store/context'
import { Link } from 'react-router-dom'

const Sidebar = () => {
    let { handleLogout } = useAuth()
    let { sidebar, setSidebar, profile, setProfile } = useContext(context)
    let [tooltip, setTooltip] = useState()
    async function signOut() {
        await handleLogout()
        localStorage.setItem('url', '')
    }

    return (
        <div className={`sidebar ${sidebar ? "active" : "collapsed"}`}>

            {/* Toggle */}
            <div className="toggle-btn" onClick={() => setSidebar(!sidebar)}>
                <i className="bi bi-chevron-left"></i>
            </div>

            <div className="sidebar-inner">

                <div className="logo">AI Resume</div>

                {/* Scroll Wrapper */}
                <div className="menu-scroll">
                    <ul className="menu">

                        {[
                            { icon: "bi-house", text: "Home",path:'/'  },
                            { icon: "bi-info-circle", text: "About",path:'/about'  },
                            { icon: "bi-stars", text: "Features",path:'/dashboard' },
                            { icon: "bi-envelope", text: "Contact",path:'/contact' },
                            { icon: "bi-speedometer2", text: "Dashboard",path:'/dashboard' },
                            { icon: "bi-file-earmark-plus", text: "Analyze Resume", path: '/ResumeAnalyzePage' },
                            { icon: "bi-folder2-open", text: "My Resumes" },
                            { icon: "bi-bar-chart-line", text: "Analyzer" },
                            { icon: "bi-person-circle", text: "Profile", action: () => setProfile(!profile) }
                        ].map((item, idx) => (
                            <li
                                onMouseEnter={(e) => {
                                    const rect = e.currentTarget.getBoundingClientRect();
                                    console.log(rect)
                                    setTooltip({
                                        text: item.text,
                                        x: rect.right + 10,
                                        y: rect.top + rect.height / 2
                                    });
                                }}
                                onMouseLeave={() => setTooltip(null)}
                                onClick={() => {
                                    item.action ? item.action() : null
                                }}
                            >
                                <i className={`bi ${item.icon}`}></i>
                                <Link style={{
                                    textDecoration: "none",
                                    color: 'white'
                                }} to={item?.path ? item?.path : '/'}><span>{item.text}</span></Link>

                            </li>
                        ))}

                    </ul>
                </div>
                {!sidebar && tooltip && (
                    <div
                        style={{
                            position: "fixed",
                            left: tooltip.x,
                            top: tooltip.y,
                            transform: "translateY(-50%)",
                            background: "#111",
                            color: "#fff",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            pointerEvents: "none",
                            zIndex: 999999
                        }}
                    >
                        {tooltip.text}
                    </div>
                )}
                {/* Logout */}
                <div className="logout" onClick={signOut}>
                    <i className="bi bi-box-arrow-right"></i>
                    <span>Logout</span>
                    <div className="tooltip">Logout</div>
                </div>

            </div>
        </div >
    )
}

export default Sidebar
