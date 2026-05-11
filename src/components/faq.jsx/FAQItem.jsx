import { useState, useEffect, useRef, useContext } from "react";
import { context } from "../../store/context";


// const SAMPLE_DATA = {
//   result: {
//     summary:
//       "A results-driven software engineer with 6+ years of experience building scalable web applications across fintech and e-commerce domains. Demonstrates strong command of modern JavaScript ecosystems and cloud infrastructure. The resume effectively communicates technical depth, though personal impact on business outcomes could be more explicitly quantified to stand out in competitive applicant pools.",
//     experience_analysis: [
//       {
//         title: "Senior Frontend Engineer",
//         company: "Stripe Inc.",
//         feedback:
//           "Strong role with impressive brand recognition. However, bullet points lean heavily on technologies used rather than outcomes delivered. Consider reframing: instead of 'built dashboard with React', write 'reduced merchant onboarding time by 40% by architecting a unified React dashboard'. Quantified impact is the difference between a good resume and a great one.",
//       },
//       {
//         title: "Full-Stack Developer",
//         company: "Shopify",
//         feedback:
//           "Solid tenure showing growth. The description of your GraphQL API work is technically accurate but reads as task-oriented. Highlight the scale — how many requests per second? How many merchants were affected? Recruiters at this level want to understand scope and complexity, not just tooling.",
//       },
//       {
//         title: "Junior Developer",
//         company: "TechStartup Co.",
//         feedback:
//           "Expected entry-level content. This section is appropriately brief given your seniority. You may consider trimming it further or removing it entirely to give more real estate to your later, more impressive roles.",
//       },
//     ],
//     projects_analysis: [
//       {
//         name: "OpenMetrics — Open Source Observability Toolkit",
//         feedback:
//           "An excellent addition. 1.2k GitHub stars is a meaningful signal of community trust. Mention the tech stack more prominently and add a one-liner on the problem it solves. Make it effortless for recruiters to see the value.",
//       },
//       {
//         name: "E-Commerce Recommendation Engine",
//         feedback:
//           "Good concept, but the description is vague. Specify the ML technique used, the dataset size, and the measured lift in conversion rate. Concrete metrics turn a generic project into a compelling proof point.",
//       },
//     ],
//     keywords: {
//       percentage: 72,
//       summary:
//         "The resume matches roughly 72% of keywords commonly found in Senior Frontend Engineer job descriptions at top-tier tech companies.",
//       areas:
//         "Missing: system design, accessibility (a11y), performance optimization, CI/CD pipelines, and cross-functional collaboration. These appear in over 80% of target JDs.",
//       recommendation:
//         "Integrate naturally into existing bullet points — don't keyword-stuff. Add 'improved Lighthouse accessibility score from 64 to 98' under your Stripe role to hit both performance and a11y signals.",
//     },
//     formatting: {
//       percentage: 85,
//       summary:
//         "The resume is well-structured and passes basic ATS parsing. Font size, margins, and section hierarchy are consistent. The single-column layout is ATS-safe.",
//       areas:
//         "Minor issues: inconsistent verb tense in the experience section, one table-based layout that may break certain ATS systems, and the skills section could benefit from categorisation.",
//       recommendation:
//         "Audit all bullet points for consistent past tense. Replace the table in the skills section with a plain comma-separated list grouped by category (e.g., Languages: TypeScript, Python | Frameworks: React, Next.js).",
//     },
//     education: {
//       percentage: 90,
//       summary:
//         "Education section is clean and appropriately concise. BSc Computer Science from a recognised university is well-positioned.",
//       areas:
//         "Graduation year is missing, which can raise flags with automated screening systems. Relevant coursework and GPA are absent — optional, but could add value.",
//       recommendation:
//         "Add graduation year. If GPA was above 3.5/4.0, consider including it. Adding 2–3 relevant courses (Distributed Systems, Algorithms) can help ATS matching.",
//     },
//   },
//   analysis: {
//     strengths: [
//       "Strong brand-name employers (Stripe, Shopify) that immediately signal credibility.",
//       "Open source contribution with measurable traction (1.2k GitHub stars) demonstrates community engagement.",
//       "Clear technical depth in modern JavaScript ecosystem with consistent, coherent skill progression.",
//       "Clean, ATS-compatible formatting with strong readability and logical information hierarchy.",
//     ],
//     weaknesses: [
//       "Impact metrics are largely absent — achievements described in terms of tasks, not outcomes.",
//       "Keyword coverage is 72%, leaving meaningful gaps against target job descriptions.",
//       "The oldest role (TechStartup Co.) consumes space that could be redirected to showcasing projects.",
//       "No mention of leadership, mentoring, or cross-functional collaboration — critical signals for senior roles.",
//     ],
//     suggestions: [
//       "Rewrite every bullet point using the formula: Action Verb + Context + Quantified Result.",
//       "Add a 'Core Competencies' summary section at the top — 6–8 keywords in a scannable format.",
//       "Include 1–2 sentences in the summary about the type of company or problem you want to work on next; it signals intentionality.",
//       "Consider a 'Talks & Writing' section if you have blog posts or conference talks — strong differentiator at senior level.",
//       "Request a peer review from a senior engineer at a FAANG company — external perspective catches blind spots invisible to the author.",
//     ],
//   },
// };

/* ─── inline styles (same as HTML version) ─── */
const css = {
  page: {
    background: "#f5f4ff",
    minHeight: "100vh",
    padding: "2rem 1rem",
    fontFamily: "'Segoe UI', system-ui, sans-serif",
  },
  pageLabel: {
    fontSize: 11,
    fontWeight: 600,
    letterSpacing: "0.08em",
    textTransform: "uppercase",
    color: "#7F77DD",
    marginBottom: 4,
  },
  pageTitle: { fontSize: 26, fontWeight: 700, color: "#1a1a2e", marginBottom: 4 },
  pageSub: { fontSize: 13, color: "#aaa", marginBottom: "1.5rem" },
  scoreCard: {
    background: "#fff",
    border: "1px solid #e8e6f8",
    borderRadius: 16,
    padding: "1.1rem 1.4rem",
    marginBottom: "1rem",
    boxShadow: "0 2px 12px rgba(99,66,246,0.06)",
  },
  ringWrap: { position: "relative", width: 56, height: 56, flexShrink: 0 },
  ringCenter: {
    position: "absolute",
    inset: 0,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 14,
    fontWeight: 700,
    color: "#534AB7",
  },
  tag: {
    fontSize: 12,
    fontWeight: 500,
    padding: "4px 12px",
    borderRadius: 999,
    background: "#EEEDFE",
    color: "#3C3489",
    border: "1px solid #AFA9EC",
    display: "inline-block",
  },
  accItem: (open) => ({
    border: open ? "1px solid #AFA9EC" : "1px solid #ece9fb",
    borderRadius: 14,
    background: "#fff",
    overflow: "hidden",
    transition: "border-color 0.2s, box-shadow 0.2s",
    boxShadow: open ? "0 4px 18px rgba(99,66,246,0.09)" : "none",
    marginBottom: 8,
  }),
  accHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    gap: 10,
    padding: "14px 16px",
    background: "transparent",
    border: "none",
    cursor: "pointer",
    textAlign: "left",
  },
  accIconBox: (open) => ({
    width: 32,
    height: 32,
    borderRadius: 9,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 15,
    flexShrink: 0,
    background: open ? "#EEEDFE" : "#f3f2fb",
    color: open ? "#534AB7" : "#888",
    transition: "background 0.2s, color 0.2s",
  }),
  accLabel: (open) => ({
    fontSize: 14,
    fontWeight: 600,
    flex: 1,
    color: open ? "#534AB7" : "#2d2d3a",
    transition: "color 0.2s",
  }),
  accChevron: (open) => ({
    width: 22,
    height: 22,
    borderRadius: "50%",
    border: open ? "2px solid #7F77DD" : "2px solid #ddd",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
    fontSize: 18,
    fontWeight: 300,
    lineHeight: 1,
    color: open ? "#534AB7" : "#aaa",
    transform: open ? "rotate(45deg)" : "rotate(0deg)",
    transition: "transform 0.28s cubic-bezier(0.4,0,0.2,1), border-color 0.2s, color 0.2s",
  }),
  accBody: (open) => ({
    maxHeight: open ? 2000 : 0,
    overflow: "hidden",
    opacity: open ? 1 : 0,
    transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.3s",
  }),
  accInner: {
    padding: "14px 16px 16px",
    borderTop: "1px solid #f0eefb",
  },
  bodyText: { fontSize: 13, color: "#666", lineHeight: 1.75, margin: 0 },
  expItem: { paddingLeft: 14, borderLeft: "2.5px solid #CECBF6", marginBottom: 16 },
  expTitle: { fontSize: 13, fontWeight: 700, color: "#1a1a2e" },
  expCompany: { fontSize: 11, fontWeight: 600, color: "#7F77DD", margin: "2px 0 5px" },
  projDot: { width: 7, height: 7, borderRadius: "50%", background: "#7F77DD", flexShrink: 0 },
  projName: { fontSize: 13, fontWeight: 700, color: "#1a1a2e" },
  barWrap: { height: 5, background: "#ede9ff", borderRadius: 99, overflow: "hidden", margin: "10px 0 14px" },
  metricGray: { borderRadius: 10, padding: "12px 14px", background: "#f7f6ff", marginBottom: 8 },
  metricAmber: { borderRadius: 10, padding: "12px 14px", background: "#fff8ee", border: "1px solid #fce8c2", marginBottom: 8 },
  metricPurple: { borderRadius: 10, padding: "12px 14px", background: "#f3f1fe", border: "1px solid #d5d0f7" },
  metricLabel: (color) => ({ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.07em", color, marginBottom: 5 }),
  bulletDot: (color) => ({ width: 7, height: 7, borderRadius: "50%", background: color, flexShrink: 0, marginTop: 5 }),
  summaryCard: {
    borderRadius: 12,
    padding: "14px 16px",
    background: "linear-gradient(135deg, #f5f3ff, #ede9fe)",
    border: "1px solid #dcd6ff",
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 10,
    fontWeight: 800,
    textTransform: "uppercase",
    letterSpacing: "0.08em",
    color: "#5b21b6",
    marginBottom: 6,
  },
  summaryText: {
    fontSize: 13,
    color: "#2e2a4a",
    lineHeight: 1.7,
    margin: 0,
    fontWeight: 500,
  },
};

/* ─── ScorePill ─── */
const ScorePill = ({ value }) => {
  const s =
    value >= 85
      ? { bg: "#EAF3DE", color: "#3B6D11", border: "#97C459" }
      : value >= 70
        ? { bg: "#FAEEDA", color: "#854F0B", border: "#EF9F27" }
        : { bg: "#FCEBEB", color: "#A32D2D", border: "#F09595" };
  return (
    <span
      style={{
        fontSize: 11, fontWeight: 700, padding: "3px 9px",
        borderRadius: 999, background: s.bg, color: s.color,
        border: `1px solid ${s.border}`, marginLeft: 8,
      }}
    >
      {value}%
    </span>
  );
};

/* ─── RingGauge ─── */
const RingGauge = ({ score }) => {
  const r = 22;
  const circ = 2 * Math.PI * r;
  const offset = circ * (1 - score / 100);
  const circleRef = useRef(null);

  useEffect(() => {
    if (!circleRef.current) return;
    circleRef.current.style.strokeDashoffset = circ;
    circleRef.current.style.transition = "none";
    const t = setTimeout(() => {
      if (circleRef.current) {
        circleRef.current.style.transition =
          "stroke-dashoffset 1.2s cubic-bezier(0.4,0,0.2,1)";
        circleRef.current.style.strokeDashoffset = offset;
      }
    }, 300);
    return () => clearTimeout(t);
  }, []);

  return (
    <div style={css.ringWrap}>
      <svg width="56" height="56" viewBox="0 0 56 56" style={{ transform: "rotate(-90deg)", display: "block" }}>
        <circle cx="28" cy="28" r={r} fill="none" stroke="#EEEDFE" strokeWidth="5" />
        <circle
          ref={circleRef}
          cx="28" cy="28" r={r}
          fill="none" stroke="#7F77DD"
          strokeWidth="5" strokeLinecap="round"
          strokeDasharray={circ}
          strokeDashoffset={circ}
        />
      </svg>
      <div style={css.ringCenter}>{score}</div>
    </div>
  );
};

/* ─── AnimatedBar ─── */
const AnimatedBar = ({ value, color, active }) => {
  const barRef = useRef(null);
  useEffect(() => {
    if (!barRef.current) return;
    if (active) {
      const t = setTimeout(() => {
        if (barRef.current) barRef.current.style.width = value + "%";
      }, 80);
      return () => clearTimeout(t);
    } else {
      barRef.current.style.width = "0%";
    }
  }, [active, value]);

  return (
    <div style={css.barWrap}>
      <div
        ref={barRef}
        style={{
          height: "100%", borderRadius: 99, background: color,
          width: "0%", transition: "width 0.85s cubic-bezier(0.4,0,0.2,1)",
        }}
      />
    </div>
  );
};

/* ─── MetricContent ─── */
const MetricContent = ({ data, active }) => {
  const barColor =
    data?.percentage >= 85 ? "#639922" : data?.percentage >= 70 ? "#EF9F27" : "#E24B4A";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
      <AnimatedBar value={data?.percentage} color={barColor} active={active} />
      <div style={css.metricGray}>
        <div style={css.metricLabel("#999")}>Overview</div>
        <p style={css.bodyText}>{data?.summary}</p>
      </div>
      <div style={css.metricAmber}>
        <div style={css.metricLabel("#854F0B")}>Areas to Address</div>
        <p style={{ ...css.bodyText, color: "#633806" }}>{data?.areas}</p>
      </div>
      <div style={css.metricPurple}>
        <div style={css.metricLabel("#534AB7")}>Recommendation</div>
        <p style={{ ...css.bodyText, color: "#3C3489" }}>{data?.recommendation}</p>
      </div>
      <div style={css.summaryCard}>
        <div style={css.summaryLabel}>AI Summary</div>
        <p style={css.summaryText}>{data?.summary}</p>
      </div>
    </div>
  );
};

/* ─── BulletList ─── */
const BulletList = ({ items, dotColor }) => (
  <ul className="list-unstyled mb-0">
    {items.map((item, i) => (
      <li key={i} className="d-flex align-items-start gap-2 mb-2">
        <div style={css.bulletDot(dotColor)} className="mt-1 flex-shrink-0" />
        <p style={css.bodyText}>{item}</p>
      </li>
    ))}
  </ul>
);

/* ─── AccordionItem ─── */
const AccordionItem = ({ id, icon, label, badge, isOpen, onToggle, children }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div style={css.accItem(isOpen)}>
      <button
        style={{
          ...css.accHeader,
          background: hovered && !isOpen ? "#f9f8ff" : "transparent",
        }}
        onClick={() => onToggle(id)}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <div style={css.accIconBox(isOpen)}>{icon}</div>
        <span style={css.accLabel(isOpen)}>{label}</span>
        {badge !== undefined && <ScorePill value={badge} />}
        <div style={css.accChevron(isOpen)}>+</div>
      </button>

      <div style={css.accBody(isOpen)}>
        <div style={css.accInner}>{children}</div>
      </div>
    </div>
  );
};

/* ─── Main Component ─── */
export default function ResumeAnalysis() {
  const [openId, setOpenId] = useState(null);
  let { resumeAnalyze } = useContext(context)
  const num = (v) => Number(v) || 0;
  const atsScore = num(resumeAnalyze?.result?.ats_score);
  const keywordsPercentage = num(resumeAnalyze?.result?.keywords?.percentage);
  const formattingPercentage = num(resumeAnalyze?.result?.formatting?.percentage);
  const relevance = num(resumeAnalyze?.result?.relevance);
  const readability = num(resumeAnalyze?.result?.readability);
  const impactWords = num(resumeAnalyze?.result?.impact_words);
  const jobMatchesPercentage = num(resumeAnalyze?.result?.job_matches_percentage);
  const education = num(resumeAnalyze?.result?.education?.percentage);
  const experienceAnalysis = resumeAnalyze?.result?.experience_analysis || [];
  const projectsAnalysis = resumeAnalyze?.result?.projects_analysis || [];
  const educationOBJ = resumeAnalyze?.result?.education || {};
  const summary = resumeAnalyze?.result?.summary || "";
  const strengths = resumeAnalyze?.analysis?.strengths || [];
  const weaknesses = resumeAnalyze?.analysis?.weaknesses || [];
  const suggestions = resumeAnalyze?.analysis?.suggestions || [];
  const handleToggle = (id) => setOpenId((prev) => (prev === id ? null : id));
  const keywords = resumeAnalyze?.result?.keywords || {}
  const formatting = resumeAnalyze?.result?.formatting || {}
  let avgScore = Math.round(
    (atsScore + keywordsPercentage + formattingPercentage + relevance + impactWords + readability + jobMatchesPercentage + education) / 8
  );
  avgScore = (avgScore ? avgScore : "")

  const sections = [
    {
      id: "summary",
      icon: "✦",
      label: "Summary",
      content: <p style={css.bodyText}>{summary}</p>,
    },
    {
      id: "experience",
      icon: "◈",
      label: "Experience Analysis",
      content: (
        <div>
          {experienceAnalysis.map((item, i) => (
            <div key={i} style={{ ...css.expItem, marginBottom: i === experienceAnalysis.length - 1 ? 0 : 16 }}>
              <div style={css.expTitle}>{item.title}</div>
              <div style={css.expCompany}>{item.company}</div>
              <p style={css.bodyText}>{item.feedback}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "projects",
      icon: "◉",
      label: "Projects Analysis",
      content: (
        <div>
          {projectsAnalysis.map((item, i) => (
            <div key={i} style={{ marginBottom: i === projectsAnalysis.length - 1 ? 0 : 16 }}>
              <div className="d-flex align-items-center gap-2 mb-1">
                <div style={css.projDot} />
                <div style={css.projName}>{item.name}</div>
              </div>
              <p style={{ ...css.bodyText, paddingLeft: 15 }}>{item.feedback}</p>
            </div>
          ))}
        </div>
      ),
    },
    {
      id: "keywords",
      icon: "⌘",
      label: "Keywords Match",
      badge: keywordsPercentage,
      content: <MetricContent data={keywords} active={openId === "keywords"} />,
    },
    {
      id: "formatting",
      icon: "▣",
      label: "Formatting",
      badge: formattingPercentage,
      content: <MetricContent data={formatting} active={openId === "formatting"} />,
    },
    {
      id: "education",
      icon: "◎",
      label: "Education",
      badge: education,
      content: <MetricContent data={educationOBJ} active={openId === "education"} />,
    },
    {
      id: "strengths",
      icon: "↑",
      label: "Strengths",
      content: <BulletList items={strengths} dotColor="#639922" />,
    },
    {
      id: "weaknesses",
      icon: "↓",
      label: "Weaknesses",
      content: <BulletList items={weaknesses} dotColor="#E24B4A" />,
    },
    {
      id: "suggestions",
      icon: "→",
      label: "Suggestions",
      content: <BulletList items={suggestions} dotColor="#7F77DD" />,
    },
  ];

  return (
    <div style={css.page}>
      <div className="container" style={{ maxWidth: 700 }}>

        {/* ── Page Header ── */}
        <div className="mb-4">
          <div style={css.pageLabel}>Resume Analysis</div>
          <h1 style={css.pageTitle}>Your Resume Report</h1>
          <p style={css.pageSub}>Detailed breakdown across {sections.length} categories</p>
        </div>

        {/* ── Score Card ── */}
        <div style={css.scoreCard} className="d-flex align-items-center flex-wrap gap-3 mb-3">
          <RingGauge score={avgScore} />
          <div className="flex-grow-1">
            <div style={{ fontSize: 14, fontWeight: 600, color: "#1a1a2e" }}>Overall Score</div>
            <div style={{ fontSize: 12, color: "#aaa" }}>Averaged across key metrics</div>
          </div>
          <div className="d-flex gap-4">
            {[
              { label: "Keywords", val: `${keywordsPercentage}%`, color: "#854F0B" },
              { label: "Formatting", val: `${formattingPercentage}%`, color: "#3B6D11" },
              { label: "Education", val: `${education}%`, color: "#534AB7" },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div style={{ fontSize: 20, fontWeight: 700, color: s.color }}>{s.val}</div>
                <div style={{ fontSize: 11, color: "#aaa", marginTop: 1 }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Tags ── */}
        <div className="d-flex flex-wrap gap-2 mb-4">
          {["Frontend Engineer", "JavaScript", "React", "Stripe", "Shopify", "Open Source"].map((t) => (
            <span key={t} style={css.tag}>{t}</span>
          ))}
        </div>

        {/* ── Accordion ── */}
        <div>
          {sections.map((s) => (
            <AccordionItem
              key={s.id}
              id={s.id}
              icon={s.icon}
              label={s.label}
              badge={s.badge}
              isOpen={openId === s.id}
              onToggle={handleToggle}
            >
              {s.content}
            </AccordionItem>
          ))}
        </div>

        {/* ── Footer ── */}
        <p className="text-center mt-4" style={{ fontSize: 11, color: "#ccc" }}>
          Powered by AI Resume Analysis · Generated just now
        </p>
      </div>
    </div>
  );
}