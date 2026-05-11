import { useState, useEffect, useContext, useRef } from "react";
import Header from "../components/header/Header";
import Sidebar from "../components/Sidebar/Sidebar";
import Footer from "../components/footer/Footer";
import { context } from "../store/context";
import FAQItem from "../components/faq.jsx/FAQItem";
import CreateResume from "../components/CreateResume/CreateResume";

const SIDEBAR_WIDTH = 240;

// ── Responsive CSS injected into <head> ──────────────────────────────────────
const responsiveCss = `
  *, *::before, *::after { box-sizing: border-box; }

  .dash-root {
    font-family: 'DM Sans', 'Segoe UI', sans-serif;
    background: #f5f5f2;
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    color: #111;
  }

  /* Body row */
  .dash-body {
    display: flex;
    flex: 1;
    min-height: 0;
    margin-top: 50px;
  }

  /* Sidebar wrapper — clips sidebar in/out via width transition */
  .dash-sidebar-wrapper {
    flex-shrink: 0;
    transition: width 0.25s cubic-bezier(.4,0,.2,1);
    overflow: hidden;
  }

  /* Main */
  .dash-main {
    flex: 1;
    min-width: 0;
    padding: 32px 28px 40px;
    overflow: hidden;
    transition: margin-left 0.25s cubic-bezier(.4,0,.2,1);
  }

  .dash-page-title {
    font-size: 22px; font-weight: 600; letter-spacing: -0.4px;
    margin-bottom: 4px; margin-left: 9px; color: #111;
  }
  .dash-page-sub {
    font-size: 13px; color: #777; margin-bottom: 28px; margin-left: 9px;
  }

  /* ── Stat cards ── */
  .stats-grid {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;
    margin-bottom: 28px;
  }
  .stat-card {
    background: #fff; border: 0.5px solid rgba(0,0,0,0.1); border-radius: 14px;
    padding: 20px 22px; position: relative; overflow: hidden;
    transition: transform 0.18s, box-shadow 0.18s; cursor: default;
  }
  .stat-card:hover { transform: translateY(-2px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
  .stat-label { font-size: 12px; font-weight: 500; color: #888; letter-spacing: 0.2px; margin-bottom: 10px; text-transform: uppercase; }
  .stat-value { font-size: 28px; font-weight: 700; letter-spacing: -1px; line-height: 1; color: #111; }
  .stat-delta { font-size: 12px; margin-top: 8px; font-weight: 500; display: flex; align-items: center; gap: 4px; }
  .stat-icon { position: absolute; right: 18px; top: 18px; width: 36px; height: 36px; border-radius: 9px; display: flex; align-items: center; justify-content: center; }

  /* ── Cards ── */
  .dash-card {
    background: #fff; border: 0.5px solid rgba(0,0,0,0.1);
    border-radius: 14px; padding: 24px; min-width: 0;
  }
  .card-header { display: flex; align-items: flex-start; justify-content: space-between; margin-bottom: 18px; gap: 12px; flex-wrap: wrap; }
  .card-title { font-size: 15px; font-weight: 600; color: #111; letter-spacing: -0.2px; }
  .card-sub { font-size: 12px; color: #888; margin-top: 2px; }

  /* ── Grids ── */
  .grid-2col { display: grid; grid-template-columns: 2fr 1fr; gap: 20px; margin-bottom: 20px; }
  .grid-3col { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; margin-bottom: 20px; }

  /* ── Resume list ── */
  .resume-list { display: flex; flex-direction: column; gap: 10px; }
  .resume-item {
    display: flex; align-items: center; gap: 14px; padding: 12px 14px;
    border: 0.5px solid rgba(0,0,0,0.08); border-radius: 10px; cursor: pointer;
    transition: all 0.15s; min-width: 0; background: #fff;
  }
  .resume-item:hover { background: #fafaf8; transform: translateX(3px); border-color: rgba(0,0,0,0.15); }
  .resume-thumb {
    width: 38px; height: 46px; border-radius: 6px; display: flex; align-items: center;
    justify-content: center; font-size: 10px; font-weight: 700; flex-shrink: 0;
    border: 0.5px solid rgba(0,0,0,0.1); letter-spacing: 0.5px;
  }
  .resume-name { font-size: 13.5px; font-weight: 500; color: #111; margin-bottom: 2px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
  .resume-meta { font-size: 12px; color: #888; }
  .resume-actions { margin-left: auto; display: flex; gap: 8px; flex-shrink: 0; }

  /* ── Pill ── */
  .pill { display: inline-flex; align-items: center; padding: 3px 9px; border-radius: 99px; font-size: 11px; font-weight: 600; margin-left: 8px; }

  /* ── ATS ── */
  .ats-value { font-size: 40px; font-weight: 700; letter-spacing: -1.5px; line-height: 1; color: #111; display: flex; align-items: baseline; gap: 4px; }
  .ats-denom { font-size: 16px; font-weight: 400; color: #aaa; }
  .ats-bar-bg { margin-top: 14px; height: 8px; background: #eee; border-radius: 99px; overflow: hidden; }
  .ats-bar-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg,#059669,#34d399); transition: width 1.4s cubic-bezier(.16,1,.3,1); }
  .ats-labels { display: flex; justify-content: space-between; margin-top: 6px; font-size: 11px; color: #aaa; }

  /* ── Score bars ── */
  .score-row { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
  .score-label { font-size: 12px; color: #555; width: 88px; flex-shrink: 0; }
  .score-bar-bg { flex: 1; height: 5px; background: #eee; border-radius: 99px; overflow: hidden; min-width: 0; }
  .score-bar-fill { height: 100%; border-radius: 99px; transition: width 1.2s cubic-bezier(.16,1,.3,1); }
  .score-pct { font-size: 12px; color: #999; width: 28px; text-align: right; flex-shrink: 0; }

  /* ── Job items ── */
  .job-item { display: flex; align-items: flex-start; gap: 12px; padding: 12px 0; cursor: pointer; transition: opacity 0.12s; border-bottom: 0.5px solid rgba(0,0,0,0.07); }
  .job-item:last-child { border-bottom: none; }
  .job-item:hover { opacity: 0.75; }
  .job-logo { width: 36px; height: 36px; border-radius: 8px; border: 0.5px solid rgba(0,0,0,0.1); display: flex; align-items: center; justify-content: center; font-size: 11px; font-weight: 700; flex-shrink: 0; background: #fafaf8; }
  .job-title { font-size: 13.5px; font-weight: 500; color: #111; margin-bottom: 2px; }
  .job-company { font-size: 12px; color: #888; }
  .job-match { margin-left: auto; flex-shrink: 0; display: flex; flex-direction: column; align-items: flex-end; gap: 2px; }
  .match-pct { font-size: 15px; font-weight: 700; color: #059669; }
  .match-label { font-size: 10px; color: #aaa; letter-spacing: 0.3px; }

  /* ── Keyword cloud ── */
  .kw-cloud { display: flex; flex-wrap: wrap; gap: 8px; }
  .kw-tag { padding: 5px 12px; border-radius: 99px; font-size: 12px; font-weight: 500; cursor: pointer; transition: transform 0.15s; white-space: nowrap; }
  .kw-tag:hover { transform: scale(1.06); }

  /* ── Activity ── */
  .activity-item { display: flex; gap: 12px; padding: 10px 0; border-bottom: 0.5px solid rgba(0,0,0,0.07); }
  .activity-item:last-child { border-bottom: none; }
  .activity-dot { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0; margin-top: 1px; }
  .activity-text { font-size: 13px; color: #555; line-height: 1.5; }
  .activity-time { font-size: 11px; color: #aaa; margin-top: 2px; }

  /* ── Tabs ── */
  .tab-row { display: flex; gap: 2px; background: #f0f0ed; border-radius: 8px; padding: 3px; flex-shrink: 0; }
  .tab-btn { padding: 5px 12px; border-radius: 6px; font-size: 12px; font-weight: 500; cursor: pointer; border: none; background: transparent; color: #888; font-family: inherit; transition: all 0.15s; }
  .tab-btn.active { background: #fff; color: #111; box-shadow: 0 0 0 0.5px rgba(0,0,0,0.12); }

  /* ── Buttons ── */
  .btn-ghost {
    display: inline-flex; align-items: center; gap: 6px; padding: 6px 14px; border-radius: 8px;
    font-size: 12px; font-weight: 500; cursor: pointer; background: transparent; color: #555;
    border: 0.5px solid rgba(0,0,0,0.15); font-family: inherit; transition: all 0.12s; white-space: nowrap;
  }
  .btn-ghost:hover { background: #f5f5f2; }
  .btn-ghost.primary { background: #1a56db; color: #fff; border-color: #1a56db; }
  .btn-ghost.primary:hover { background: #1447c0; }
  .btn-full { width: 100%; justify-content: center; margin-top: 16px; }

  /* ── Upload zone ── */
  .upload-zone { border: 1.5px dashed rgba(0,0,0,0.15); border-radius: 14px; padding: 32px 20px; text-align: center; cursor: pointer; transition: all 0.2s; margin-top: 20px; }
  .upload-zone:hover { border-color: #1a56db; background: #eff4ff; }
  .upload-icon-wrap { width: 48px; height: 48px; border-radius: 12px; background: #eff4ff; display: flex; align-items: center; justify-content: center; margin: 0 auto 12px; }
  .upload-title { font-size: 14px; font-weight: 600; color: #111; margin-bottom: 4px; }
  .upload-sub { font-size: 12px; color: #888; }

  /* ════════════════════════════════
     TABLET  768px – 1023px
  ════════════════════════════════ */
  @media (max-width: 1023px) {
    .dash-main { padding: 24px 20px 36px; }
    .dash-page-title { font-size: 20px; }
    .stats-grid { grid-template-columns: repeat(2, 1fr); gap: 14px; margin-bottom: 22px; }
    .grid-2col { grid-template-columns: 1fr; gap: 16px; margin-bottom: 16px; }
    .grid-3col { grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 16px; }
    .dash-card { padding: 20px; }
  }

  /* ════════════════════════════════
     MOBILE  < 640px
  ════════════════════════════════ */
  @media (max-width: 639px) {
    .dash-main { padding: 16px 14px 28px; }
    .dash-page-title { font-size: 17px; margin-left: 0; }
    .dash-page-sub { font-size: 12px; margin-left: 0; margin-bottom: 16px; }

    .stats-grid { grid-template-columns: 1fr 1fr; gap: 10px; margin-bottom: 16px; }
    .stat-card { padding: 14px 12px; }
    .stat-value { font-size: 22px; }
    .stat-label { font-size: 10px; margin-bottom: 6px; }
    .stat-icon { width: 28px; height: 28px; right: 10px; top: 10px; }

    .grid-2col { grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px; }
    .grid-3col { grid-template-columns: 1fr; gap: 12px; margin-bottom: 12px; }

    .dash-card { padding: 14px; border-radius: 12px; }
    .card-title { font-size: 14px; }
    .card-header { margin-bottom: 12px; }

    /* Hide hover-only resume action buttons on touch */
    .resume-actions { display: none !important; }
    .resume-item { padding: 10px; gap: 10px; }
    .resume-name { font-size: 12.5px; }
    .resume-thumb { width: 32px; height: 40px; }

    .ats-value { font-size: 32px; }

    /* Tabs compact */
    .tab-btn { padding: 4px 8px; font-size: 11px; }

    /* Job company text hidden — too cramped */
    .job-company { display: none; }

    .upload-zone { padding: 20px 14px; }
    .upload-title { font-size: 13px; }
  }

  /* ════════════════════════════════
     VERY SMALL  < 360px
  ════════════════════════════════ */
  @media (max-width: 359px) {
    .stats-grid { grid-template-columns: 1fr; }
    .stat-card { padding: 12px; }
  }
`;

// ── Sub-components ────────────────────────────────────────────────────────────

function StatCard({ label, value, delta, deltaUp, iconBg, iconColor, iconPath, unit }) {
    return (
        <div className="stat-card">
            <div className="stat-label">{label}</div>
            <div className="stat-value">
                {value}
                {unit && <span style={{ fontSize: "14px", fontWeight: 400, color: "#aaa" }}>{unit}</span>}
            </div>
            <div className="stat-delta" style={{ color: deltaUp ? "#059669" : "#dc2626" }}>
                {deltaUp ? "▲" : "▼"} {delta}
            </div>
            <div className="stat-icon" style={{ background: iconBg }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke={iconColor} strokeWidth="1.8">
                    <path d={iconPath} />
                </svg>
            </div>
        </div>
    );
}

function ScoreBar({ label, pct, color, animated }) {
    return (
        <div className="score-row">
            <div className="score-label">{label}</div>
            <div className="score-bar-bg">
                <div className="score-bar-fill" style={{ background: color, width: animated ? `${pct}%` : "0%" }} />
            </div>
            <div className="score-pct">{pct}%</div>
        </div>
    );
}

function ResumeItem({ name, company, score, scoreColor, scoreBg, color, bg, meta }) {
    const [hovered, setHovered] = useState(false);
    return (
        <div
            className="resume-item"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
        >
            <div className="resume-thumb" style={{ background: bg, color }}>PDF</div>
            <div style={{ minWidth: 0, flex: 1 }}>
                <div className="resume-name">
                    {name} — {company}
                    <span className="pill" style={{ background: scoreBg, color: scoreColor }}>{score}</span>
                </div>
                <div className="resume-meta">{meta}</div>
            </div>
            {hovered && (
                <div className="resume-actions">
                    <button className="btn-ghost" style={{ fontSize: "12px", padding: "4px 10px" }}>Edit</button>
                    <button className="btn-ghost primary" style={{ fontSize: "12px", padding: "4px 10px" }}>Apply</button>
                </div>
            )}
        </div>
    );
}

// ── Main Dashboard ────────────────────────────────────────────────────────────

export default function Dashboard() {
    const [activeTab, setActiveTab] = useState("All");
    const [animated, setAnimated] = useState(false);
    const [atsWidth, setAtsWidth] = useState(0);
    const { sidebar, width, user, setFile, resumeAnalyze } = useContext(context);
    const fileRef = useRef();
    useEffect(() => {
        const t = setTimeout(() => {
            setAnimated(true);
            setAtsWidth(92);
        }, 400);
        return () => clearTimeout(t);
    }, []);

    let fileinfo = () => {
        let fileresume = fileRef?.current?.files[0]
        if (fileresume) {
            setFile({ fileresume, fileName: fileRef.current.value })
        }
        fileRef.current.value = "";
    }
    const atsScore = resumeAnalyze?.result?.ats_score || "0";
    const keywordsPercentage = resumeAnalyze?.result?.keywords?.percentage || "0";
    const formattingPercentage = resumeAnalyze?.result?.formatting?.percentage || "0";
    const relevance = resumeAnalyze?.result?.relevance || "0";
    const readability = resumeAnalyze?.result?.readability || "0";
    const impactWords = resumeAnalyze?.result?.impact_words || "0";
    const skillsFound = resumeAnalyze?.result?.skills_found || [];
    const skillsMissing = resumeAnalyze?.result?.skills_missing || [];
    const jobMatches = resumeAnalyze?.result?.job_matches || [];
    const jobMatchesPercentage = resumeAnalyze?.result?.job_matches_percentage || "0";
    const experienceAnalysis = resumeAnalyze?.result?.experience_analysis || [];
    const projectsAnalysis = resumeAnalyze?.result?.projects_analysis || [];
    const education = resumeAnalyze?.result?.education || {};
    const summary = resumeAnalyze?.result?.summary || "";
    const strengths = resumeAnalyze?.analysis?.strengths || [];
    const weaknesses = resumeAnalyze?.analysis?.weaknesses || [];
    const suggestions = resumeAnalyze?.analysis?.suggestions || [];
    const stats = [
        { label: "Active Resumes", value: "4", delta: "+2 this month", deltaUp: true, iconBg: "#eff4ff", iconColor: "#1a56db", iconPath: "M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8zM14 2v6h6" },
        { label: "Avg ATS Score", value: atsScore, unit: "/100", delta: "+7 since last scan", deltaUp: true, iconBg: "#ecfdf5", iconColor: "#059669", iconPath: "M22 12h-4l-3 9L9 3l-3 9H2" },
        { label: "Job Matches", value: jobMatchesPercentage, delta: "34 new today", deltaUp: true, iconBg: "#f5f3ff", iconColor: "#7c3aed", iconPath: "M21 21l-4.35-4.35M11 19a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" },
        { label: "Applications Sent", value: "23", delta: "3 pending reply", deltaUp: false, iconBg: "#fffbeb", iconColor: "#d97706", iconPath: "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z" },
    ];

    const resumes = [
        { name: "Software Engineer", company: "Google", score: "92", scoreColor: "#059669", scoreBg: "#ecfdf5", color: "#1a56db", bg: "#eff4ff", meta: "Tailored · Updated 2h ago · 1 page" },
        { name: "Product Manager", company: "Meta", score: "74", scoreColor: "#d97706", scoreBg: "#fffbeb", color: "#7c3aed", bg: "#f5f3ff", meta: "Tailored · Updated yesterday · 2 pages" },
        { name: "Full Stack Developer", company: "Stripe", score: "88", scoreColor: "#059669", scoreBg: "#ecfdf5", color: "#059669", bg: "#ecfdf5", meta: "Tailored · Updated 3 days ago · 1 page" },
        { name: "General Resume", company: "Base", score: "Draft", scoreColor: "#d97706", scoreBg: "#fffbeb", color: "#888", bg: "#f0f0ed", meta: "Base template · Last edited 1 week ago" },
    ];

    const keywords = [
        { label: "N/A", bg: "#eff4ff", color: "#1a56db" },
        { label: "N/A", bg: "#ecfdf5", color: "#059669" },
        { label: "N/A", bg: "#ecfdf5", color: "#059669" },
        { label: "N/A", bg: "#eff4ff", color: "#1a56db" },
        { label: "N/A", bg: "#f5f3ff", color: "#7c3aed" },
        { label: "N/A", bg: "#fffbeb", color: "#d97706" },
        { label: "N/A", bg: "#ecfdf5", color: "#059669" },
        { label: "N/A", bg: "#fef2f2", color: "#dc2626" },
        { label: "N/A", bg: "#eff4ff", color: "#1a56db" },
        { label: "N/A", bg: "#fef2f2", color: "#dc2626" },
        { label: "N/A", bg: "#ecfdf5", color: "#059669" },
        { label: "N/A", bg: "#f5f3ff", color: "#7c3aed" },
    ];

    const activities = [
        { dotBg: "#ecfdf5", dotColor: "#059669", pathD: "M20 6L9 17l-5-5", text: "ATS scan completed on", name: "Google Resume", time: "2 hours ago" },
        { dotBg: "#eff4ff", dotColor: "#1a56db", pathD: "M12 20h9M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z", text: "AI suggested 5 improvements for", name: "Meta PM Resume", time: "Yesterday, 4:20 PM" },
        { dotBg: "#f5f3ff", dotColor: "#7c3aed", pathD: "M22 2L11 13M22 2L15 22l-4-9-9-4 20-7z", text: "Applied to Staff Engineer at", name: "Stripe", time: "2 days ago" },
        { dotBg: "#fffbeb", dotColor: "#d97706", pathD: "M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5", text: "Cover letter generated for", name: "Airbnb", time: "3 days ago" },
    ];

    const tabFilter = (r) => {
        if (activeTab === "All") return true;
        if (activeTab === "Drafts") return r.score === "Draft";
        return r.score !== "Draft";
    };

    return (
        <>
            <style>{responsiveCss}</style>
            <div className="dash-root">

                {/* ── Header — full width at top ── */}
                <Header />

                {/* ── Body: Sidebar + Main side by side ── */}
                <div className="dash-body">

                    {/* Sidebar wrapper: width animates between 0 and SIDEBAR_WIDTH */}
                    <div
                        className="dash-sidebar-wrapper"
                        style={{ width: sidebar ? `${SIDEBAR_WIDTH}px` : "0px" }}
                    >
                        <Sidebar />
                    </div>

                    {/* Main: fills remaining space, small left margin when sidebar closed */}
                    <main
                        className="dash-main"
                        style={{ marginLeft: sidebar ? width < 800 ? "-260px" : "0px" : "50px" }}
                    >
                        <div className="dash-page-title" style={{ marginLeft: '15px' }}>Good morning, {user?.userName} 👋</div>
                        <div className="dash-page-sub" style={{ marginLeft: '15px' }}>Here's your resume AI workspace overview</div>

                        {/* Stats */}
                        <div className="stats-grid">
                            {stats.map((s, i) => <StatCard key={i} {...s} />)}
                        </div>

                        {/* Row 2: Resume List + ATS Score */}
                        <div className="grid-2col">
                            <div className="dash-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-title">My Resumes</div>
                                        <div className="card-sub">4 documents · last edited 2h ago</div>
                                    </div>
                                    <div className="tab-row">
                                        {["All", "Drafts", "Published"].map((t) => (
                                            <button
                                                key={t}
                                                className={`tab-btn${activeTab === t ? " active" : ""}`}
                                                onClick={() => setActiveTab(t)}
                                            >
                                                {t}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                                <div className="resume-list">
                                    {resumes.filter(tabFilter).map((r, i) => <ResumeItem key={i} {...r} />)}
                                </div>
                            </div>

                            <div className="dash-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-title">ATS Score</div>
                                        <div className="card-sub">Software Engineer · Google</div>
                                    </div>
                                    <span className="pill" style={{ background: "#ecfdf5", color: "#059669" }}>Excellent</span>
                                </div>
                                <div className="ats-value">
                                    {atsScore} <span className="ats-denom">/ 100</span>
                                </div>
                                <div className="ats-bar-bg">
                                    <div className="ats-bar-fill" style={{ width: `${atsScore}%` }} />
                                </div>
                                <div className="ats-labels">
                                    <span>Poor</span><span>Good</span><span>Excellent</span>
                                </div>
                                <div style={{ marginTop: "22px" }}>
                                    <ScoreBar label="Keywords" pct={keywordsPercentage} color="#059669" animated={animated} />
                                    <ScoreBar label="Formatting" pct={formattingPercentage} color="#3b82f6" animated={animated} />
                                    <ScoreBar label="Relevance" pct={relevance} color="#059669" animated={animated} />
                                    <ScoreBar label="Readability" pct={readability} color="#3b82f6" animated={animated} />
                                    <ScoreBar label="Impact words" pct={impactWords} color="#d97706" animated={animated} />
                                </div>
                                <button className="btn-ghost btn-full">View Full Report ↗</button>
                            </div>
                        </div>

                        {/* Row 3: Jobs + Keywords + Activity */}
                        <div className="grid-3col">
                            <div className="dash-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-title">Top Job Matches</div>
                                        <div className="card-sub">Based on your best resume</div>
                                    </div>
                                    <button className="btn-ghost" style={{ fontSize: "12px", padding: "5px 10px" }}>See all</button>
                                </div>
                                {(jobMatches.length>0?jobMatches:[
                                    { logo: "N/A", logoColor: "#1a56db", title: "N/A", company: "N/A", matchPct: 0 },
                                    { logo:"N/A", logoColor: "#635bff", title: "N/A", company: "N/A", matchPct: 0 },
                                    { logo: "N/A", logoColor: "#ff5a5f", title: "N/A", company: "N/A", matchPct: 0 },
                                ]).map((j, i) => (
                                    <div key={i} className="job-item">
                                        <div className="job-logo" style={{ color: j.logoColor?j.logoColor:j?.color }}>{j.logo?j.logo:j?.companyName?.slice(0,3)}</div>
                                        <div style={{ minWidth: 0 }}>
                                            <div className="job-title">{j.title?j.title:j?.job}</div>
                                            <div className="job-company">{j.company?j.company:j?.companyName +j?.salary}</div>
                                        </div>
                                        <div className="job-match">
                                            <div className="match-pct">{j.matchPct?j.matchPct:j?.percentage}%</div>
                                            <div className="match-label">MATCH</div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="dash-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-title">Keyword Coverage</div>
                                        <div className="card-sub">Detected in your resumes</div>
                                    </div>
                                </div>
                                <div className="kw-cloud">
                                    {(skillsFound.length>0?skillsFound:keywords).map((kw, i) => (
                                        <span key={i} className="kw-tag" style={{ background: kw.bg?kw.bg:kw.backgroundColor, color: kw.color?kw.color:kw.color }}>
                                            {kw.label?kw.label:kw.Name}
                                        </span>
                                    ))}
                                </div>
                                <button className="btn-ghost btn-full" style={{ fontSize: "12px" }}>
                                    Find missing keywords ↗
                                </button>
                            </div>
                            <div className="dash-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-title">Missing Skills</div>
                                        <div className="card-sub">Detected in your resumes</div>
                                    </div>
                                </div>
                                <div className="kw-cloud">
                                    {(skillsMissing.length>0?skillsMissing:keywords).map((kw, i) => (
                                        <span key={i} className="kw-tag" style={{ background: kw.bg?kw.bg:kw.backgroundColor, color: kw.color?kw.color:kw.color }}>
                                            {kw.label?kw.label:kw.Name}
                                        </span>
                                    ))}
                                </div>
                                <button className="btn-ghost btn-full" style={{ fontSize: "12px" }}>
                                    Find missing keywords ↗
                                </button>
                            </div>

                            
                        </div>
                       <FAQItem/>

                        

                    </main>
                </div>

                {/* ── Footer — shifted right to match sidebar state ── */}
                <div style={{ marginLeft: sidebar ? width < 800 ? "-260px" : "240px" : "50px", transition: "margin-left 0.25s cubic-bezier(.4,0,.2,1)" }}>
                    <Footer />
                </div>

            </div>
        </>
    );
}