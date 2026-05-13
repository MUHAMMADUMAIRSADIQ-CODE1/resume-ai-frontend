import { useContext, useEffect, useRef } from "react";
import Header from "../header/Header";
import LandingHeader from "../landingPage/SimpleHeader";
import { context } from "../../store/context";
import Footer from "../footer/Footer";

const stats = [
    { num: "98%", lbl: "ATS accuracy" },
    { num: "50k+", lbl: "CVs analyzed" },
    { num: "<5s", lbl: "instant results" },
    { num: "Free", lbl: "always" },
];

const steps = [
    {
        n: "1",
        title: "Upload your resume",
        desc: "Drop a PDF, Word document, or even a photo of your CV. Our system reads them all with no conversion needed on your end.",
    },
    {
        n: "2",
        title: "AI analyzes it instantly",
        desc: "Our AI scans structure, keywords, formatting, and content — matched against real hiring standards used by recruiters across industries.",
    },
    {
        n: "3",
        title: "Get your score and full report",
        desc: "Receive an ATS compatibility score, a breakdown of strengths and gaps, and clear prioritized steps to improve your resume.",
    },
];

const features = [
    { icon: "📊", title: "ATS score", desc: "See exactly how automated screening systems rate your resume from 0 to 100." },
    { icon: "🔍", title: "Keyword analysis", desc: "Discover which important industry keywords are missing from your CV right now." },
    { icon: "✅", title: "Format check", desc: "Verify your layout, section order, and structure meet what recruiters expect." },
    { icon: "💡", title: "Smart recommendations", desc: "Clear, actionable tips — no vague advice. Know exactly what to fix and why." },
    { icon: "🎯", title: "Job match score", desc: "Paste a job description and get a tailored score showing how well you fit that role." },
    { icon: "⚡", title: "Instant results", desc: "No waiting, no queues. Your full report is ready in under five seconds — free." },
];

function useScrollReveal() {
    const ref = useRef(null);
    useEffect(() => {
        const el = ref.current;
        if (!el) return;
        const observer = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) el.classList.add("visible"); },
            { threshold: 0.1 }
        );
        observer.observe(el);
        return () => observer.disconnect();
    }, []);
    return ref;
}

function Block({ children }) {
    const ref = useScrollReveal();
    return (
        <div ref={ref} style={{
            padding: "4.5rem 0",
            borderBottom: "1px solid #e2e8f0",
            opacity: 0,
            transform: "translateY(24px)",
            transition: "opacity 0.65s ease, transform 0.65s ease",
        }}
            className="reveal-block"
        >
            {children}
        </div>
    );
}

export default function AboutPage() {
    let {user}=useContext(context)
    return (
        <>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;1,400&family=Outfit:wght@300;400;500;600&display=swap');

        .reveal-block.visible {
          opacity: 1 !important;
          transform: translateY(0) !important;
        }

        .feat-card {
          background: #fff;
          border: 1px solid #e2e8f0;
          border-radius: 18px;
          padding: 1.6rem 1.5rem;
          transition: box-shadow 0.25s, transform 0.25s, border-color 0.25s;
          cursor: default;
        }
        .feat-card:hover {
          box-shadow: 0 12px 36px rgba(24,71,194,0.10);
          transform: translateY(-3px);
          border-color: #c7d7fb;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.4; transform: scale(0.65); }
        }
        .pulse-dot {
          width: 7px; height: 7px;
          background: #1847c2; border-radius: 50%;
          display: inline-block; margin-right: 7px;
          animation: pulse 2s infinite;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        .hero-eyebrow { animation: fadeUp 0.5s ease 0.05s both; }
        .hero-h1      { animation: fadeUp 0.5s ease 0.15s both; }
        .hero-sub     { animation: fadeUp 0.5s ease 0.25s both; }
        .hero-stats   { animation: fadeUp 0.5s ease 0.35s both; }

        .cta-btn {
          display: inline-flex; align-items: center; gap: 9px;
          background: #1847c2; color: #fff;
          padding: 14px 32px; border-radius: 10px;
          font-size: 15px; font-weight: 500;
          text-decoration: none; border: none; cursor: pointer;
          transition: background 0.2s, transform 0.15s;
          font-family: 'Outfit', sans-serif;
        }
        .cta-btn:hover { background: #1339a8; transform: translateY(-1px); }
        .cta-btn:active { transform: scale(0.98); }

        @media (max-width: 580px) {
          .hero-section { padding: 4rem 1.25rem 3.5rem !important; }
          .page-wrap { padding: 0 1.25rem !important; }
          .mission-card { padding: 1.75rem 1.5rem !important; }
          .builder-inner { flex-direction: column !important; }
          .cta-section { padding: 3rem 1.25rem !important; }
          .stat-box { min-width: 90px !important; }
          .feat-grid { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>
            {user ? <Header /> : <LandingHeader />}
            <div style={{ fontFamily: "'Outfit', sans-serif", background: "#f8fafc", color: "#0f172a"}}>

                {/* ── HERO ── */}
                <section className="hero-section" style={{
                    position: "relative", overflow: "hidden",
                    background: "#fff", padding: "6rem 2rem 5rem",
                    textAlign: "center", borderBottom: "1px solid #e2e8f0",
                }}>
                    <div style={{
                        position: "absolute", top: -140, left: "50%",
                        transform: "translateX(-50%)",
                        width: 700, height: 700,
                        background: "radial-gradient(circle, #dbeafe 0%, transparent 68%)",
                        pointerEvents: "none",
                    }} />

                    <div className="hero-eyebrow" style={{
                        display: "inline-flex", alignItems: "center",
                        background: "#eef2ff", color: "#1847c2",
                        fontSize: 12, fontWeight: 600,
                        letterSpacing: "0.08em", textTransform: "uppercase",
                        padding: "6px 16px", borderRadius: 99,
                        marginBottom: "1.75rem", position: "relative",
                    }}>
                        <span className="pulse-dot" />
                        About this tool
                    </div>

                    <h1 className="hero-h1" style={{
                        fontFamily: "'Playfair Display', serif",
                        fontSize: "clamp(2.4rem, 6vw, 4rem)",
                        fontWeight: 600, color: "#0f172a",
                        lineHeight: 1.18, marginBottom: "1.25rem", position: "relative",
                    }}>
                        Built to get you{" "}
                        <em style={{ fontStyle: "italic", color: "#1847c2" }}>noticed</em>
                        <br />by real recruiters
                    </h1>

                    <p className="hero-sub" style={{
                        fontSize: 17, color: "#64748b",
                        maxWidth: 500, margin: "0 auto 3rem",
                        lineHeight: 1.8, fontWeight: 300, position: "relative",
                    }}>
                        Most great resumes never reach a human. We built this AI analyzer to make sure yours does.
                    </p>

                    <div className="hero-stats" style={{
                        display: "flex", justifyContent: "center",
                        maxWidth: 560, margin: "0 auto",
                        background: "#f8fafc", border: "1px solid #e2e8f0",
                        borderRadius: 18, overflow: "hidden", position: "relative",
                    }}>
                        {stats.map((s, i) => (
                            <div key={i} className="stat-box" style={{
                                flex: 1, minWidth: 110, padding: "1.25rem 1rem",
                                textAlign: "center",
                                borderRight: i < stats.length - 1 ? "1px solid #e2e8f0" : "none",
                            }}>
                                <span style={{ fontSize: 26, fontWeight: 600, color: "#0f172a", display: "block" }}>{s.num}</span>
                                <span style={{ fontSize: 12, color: "#64748b", marginTop: 3 }}>{s.lbl}</span>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ── PAGE ── */}
                <div className="page-wrap" style={{ maxWidth: 860, margin: "0 auto", padding: "0 2rem" }}>

                    {/* MISSION */}
                    <Block>
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1847c2", marginBottom: "0.6rem" }}>Our Mission</p>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, lineHeight: 1.25, marginBottom: "0.9rem" }}>
                            Leveling the playing field
                        </h2>
                        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, maxWidth: 580, fontWeight: 300 }}>
                            Most companies use Applicant Tracking Systems to filter resumes automatically. A strong CV can still get rejected because of one missing keyword or a formatting issue — before any human ever sees it.
                        </p>
                        <div className="mission-card" style={{
                            marginTop: "2.25rem",
                            background: "#1847c2", borderRadius: 18,
                            padding: "2.5rem 3rem", position: "relative", overflow: "hidden",
                        }}>
                            <span style={{
                                position: "absolute", top: -30, right: 24,
                                fontFamily: "'Playfair Display', serif",
                                fontSize: 160, color: "rgba(255,255,255,0.06)",
                                lineHeight: 1, pointerEvents: "none",
                            }}>"</span>
                            <p style={{ fontSize: 18, color: "rgba(255,255,255,0.92)", lineHeight: 1.85, fontWeight: 300, position: "relative", maxWidth: 540 }}>
                                We built this analyzer so every job seeker — a fresh graduate, a career changer, or a seasoned professional — can see exactly how their resume performs and what to fix before sending it out.
                            </p>
                            <p style={{ marginTop: "1.25rem", fontSize: 13, color: "rgba(255,255,255,0.5)", position: "relative" }}>— The CV Analyzer team</p>
                        </div>
                    </Block>

                    {/* HOW IT WORKS */}
                    <Block>
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1847c2", marginBottom: "0.6rem" }}>How it works</p>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, lineHeight: 1.25, marginBottom: "0.9rem" }}>
                            Simple. Fast. Honest.
                        </h2>
                        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, maxWidth: 580, fontWeight: 300 }}>
                            No signup. No waiting. Upload your resume and get a full expert-level report in under five seconds.
                        </p>
                        <div style={{ marginTop: "2.5rem" }}>
                            {steps.map((s, i) => (
                                <div key={i} style={{
                                    display: "flex", gap: "1.5rem", alignItems: "flex-start",
                                    padding: "1.75rem 0",
                                    borderBottom: i < steps.length - 1 ? "1px solid #e2e8f0" : "none",
                                }}>
                                    <div style={{
                                        width: 46, height: 46, flexShrink: 0, borderRadius: "50%",
                                        background: "#eef2ff", border: "2px solid #c7d7fb",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 17, fontWeight: 600, color: "#1847c2",
                                    }}>{s.n}</div>
                                    <div>
                                        <h4 style={{ fontSize: 15, fontWeight: 600, marginBottom: 5 }}>{s.title}</h4>
                                        <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.75, fontWeight: 300 }}>{s.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </Block>

                    {/* FEATURES */}
                    <Block>
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1847c2", marginBottom: "0.6rem" }}>What you get</p>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, lineHeight: 1.25, marginBottom: "0.9rem" }}>
                            Everything in one report
                        </h2>
                        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, maxWidth: 580, fontWeight: 300 }}>
                            No fluff. Just the data and advice you need to make your resume beat the competition.
                        </p>

                        <div className="feat-grid" style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(195px, 1fr))",
                            gap: 14, marginTop: "2.25rem",
                        }}>
                            {features.map((f, i) => (
                                <div key={i} className="feat-card">
                                    <div style={{
                                        width: 38, height: 38, background: "#eef2ff",
                                        borderRadius: 10, display: "flex", alignItems: "center",
                                        justifyContent: "center", marginBottom: "1rem", fontSize: 18,
                                    }}>{f.icon}</div>
                                    <h4 style={{ fontSize: 14, fontWeight: 600, marginBottom: 5 }}>{f.title}</h4>
                                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, fontWeight: 300 }}>{f.desc}</p>
                                </div>
                            ))}
                        </div>

                        <div style={{
                            marginTop: "2rem", display: "flex", gap: "1rem", alignItems: "flex-start",
                            background: "#f0fdf4", border: "1px solid #bbf7d0",
                            borderRadius: 18, padding: "1.4rem 1.6rem",
                        }}>
                            <span style={{ fontSize: 22, flexShrink: 0, marginTop: 1 }}>🔒</span>
                            <p style={{ fontSize: 14, color: "#166534", lineHeight: 1.75, fontWeight: 300 }}>
                                <strong style={{ fontWeight: 600 }}>Your privacy is fully protected.</strong> We never store your resume or share it with anyone. Every analysis runs in real time and your file is never saved to our servers. What you upload stays yours — always.
                            </p>
                        </div>
                    </Block>

                    {/* WHO BUILT THIS */}
                    <Block>
                        <p style={{ fontSize: 11, fontWeight: 600, letterSpacing: "0.12em", textTransform: "uppercase", color: "#1847c2", marginBottom: "0.6rem" }}>Who built this</p>
                        <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(1.6rem,3vw,2.2rem)", fontWeight: 600, lineHeight: 1.25, marginBottom: "0.9rem" }}>
                            Made by someone who gets the struggle
                        </h2>
                        <p style={{ fontSize: 15, color: "#64748b", lineHeight: 1.85, maxWidth: 580, fontWeight: 300 }}>
                            This tool was born out of frustration — watching talented people get filtered out by algorithms, not by their actual abilities.
                        </p>
                        <div style={{
                            marginTop: "2rem", background: "#fff",
                            border: "1px solid #e2e8f0", borderRadius: 18,
                            padding: "2rem",
                        }}>
                            <div className="builder-inner" style={{ display: "flex", gap: "1.5rem", alignItems: "flex-start" }}>
                                <div style={{
                                    width: 58, height: 58, flexShrink: 0, borderRadius: "50%",
                                    background: "linear-gradient(135deg, #1847c2 0%, #6366f1 100%)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 22, fontWeight: 600, color: "#fff",
                                    fontFamily: "'Playfair Display', serif",
                                }}>A</div>
                                <div>
                                    <h4 style={{ fontSize: 16, fontWeight: 600, marginBottom: 3 }}>The Builder</h4>
                                    <p style={{ fontSize: 13, color: "#1847c2", marginBottom: 10, fontWeight: 500 }}>Founder, CV Analyzer</p>
                                    <p style={{ fontSize: 14, color: "#64748b", lineHeight: 1.8, fontWeight: 300 }}>
                                        After watching countless qualified friends fail to even get a callback, I built this to give every job seeker the same edge that career coaches charge hundreds of dollars for — completely free. This tool uses advanced AI to give you honest, expert-level feedback on your resume in seconds.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </Block>

                </div>

                {/* ── CTA ── */}
                <div className="cta-section" style={{ padding: "5rem 2rem", textAlign: "center", maxWidth: 860, margin: "0 auto" }}>
                    <div style={{
                        background: "#fff", border: "1px solid #e2e8f0",
                        borderRadius: 24, padding: "4rem 2rem",
                        position: "relative", overflow: "hidden",
                    }}>
                        <div style={{
                            position: "absolute", bottom: -80, right: -80,
                            width: 280, height: 280,
                            background: "radial-gradient(circle, #dbeafe 0%, transparent 70%)",
                            pointerEvents: "none",
                        }} />
                        <h2 style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(1.6rem,3vw,2.2rem)",
                            fontWeight: 600, marginBottom: "0.75rem",
                        }}>Ready to improve your CV?</h2>
                        <p style={{ fontSize: 15, color: "#64748b", maxWidth: 380, margin: "0 auto 2.25rem", lineHeight: 1.75, fontWeight: 300 }}>
                            It takes less than 30 seconds. Upload your resume and see exactly where you stand.
                        </p>
                        <button className="cta-btn" onClick={() => window.location.href = "/#analyze"}>
                            Analyze my CV
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" />
                            </svg>
                        </button>
                        <div style={{ marginTop: "1.25rem", fontSize: 13, color: "#64748b" }}>
                            <span style={{ margin: "0 10px" }}>✓ Free forever</span>
                            <span style={{ margin: "0 10px" }}>✓ No signup needed</span>
                            <span style={{ margin: "0 10px" }}>✓ Results in 5 seconds</span>
                        </div>
                    </div>
                </div>

            </div>
            <Footer/>
        </>
    );
}