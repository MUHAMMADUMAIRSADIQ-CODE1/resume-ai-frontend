import { useState, useEffect, useRef, useContext } from "react";
import Header from "../header/Header";
import { context } from "../../store/context";
import LandingHeader from "../landingPage/SimpleHeader";
import Footer from "../footer/Footer";

const TOPICS = [
    { id: "general", label: "General Inquiry", icon: "💬" },
    { id: "resume", label: "Resume Help", icon: "📄" },
    { id: "bug", label: "Bug Report", icon: "🐛" },
    { id: "feature", label: "Feature Request", icon: "✨" },
    { id: "billing", label: "Billing", icon: "💳" },
    { id: "partnership", label: "Partnership", icon: "🤝" },
];

const FAQS = [
    {
        q: "How does the AI resume analyzer work?",
        a: "Our AI scans your resume against thousands of job descriptions, scoring it on keywords, formatting, ATS compatibility, and impact language — giving you actionable feedback in seconds.",
    },
    {
        q: "Is my resume data kept private?",
        a: "Absolutely. Your resume is encrypted in transit and at rest. We never sell or share your data with third parties — your career documents are yours alone.",
    },
    {
        q: "What file formats are supported?",
        a: "We support PDF, DOCX, and TXT formats. For best results, upload a PDF — it preserves formatting that ATS systems read.",
    },
    {
        q: "How quickly will I get a response?",
        a: "Our support team typically responds within 4–8 business hours. For urgent issues, use the live chat widget on the analyzer page.",
    },
];

function useInView(ref, threshold = 0.15) {
    const [visible, setVisible] = useState(false);
    useEffect(() => {
        const obs = new IntersectionObserver(
            ([entry]) => { if (entry.isIntersecting) setVisible(true); },
            { threshold }
        );
        if (ref.current) obs.observe(ref.current);
        return () => obs.disconnect();
    }, [ref, threshold]);
    return visible;
}

function AnimatedSection({ children, delay = 0, className = "" }) {
    const ref = useRef(null);
    const visible = useInView(ref);
    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                transform: visible ? "translateY(0)" : "translateY(28px)",
                transition: `opacity 0.65s ease ${delay}ms, transform 0.65s ease ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}

function FaqItem({ faq }) {
    const [open, setOpen] = useState(false);
    return (
        <div
            onClick={() => setOpen(!open)}
            style={{
                background: "#fff",
                border: "1px solid #e8e8e8",
                borderRadius: 12,
                padding: "18px 22px",
                cursor: "pointer",
                transition: "box-shadow 0.2s, border-color 0.2s",
                boxShadow: open ? "0 4px 20px rgba(0,0,0,0.07)" : "none",
                borderColor: open ? "#c8d8ff" : "#e8e8e8",
            }}
        >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
                <span style={{ fontWeight: 600, fontSize: 15, color: "#1a1a2e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {faq.q}
                </span>
                <span
                    style={{
                        fontSize: 20,
                        color: "#4361ee",
                        transform: open ? "rotate(45deg)" : "rotate(0deg)",
                        transition: "transform 0.25s",
                        flexShrink: 0,
                        lineHeight: 1,
                    }}
                >
                    +
                </span>
            </div>
            {open && (
                <p style={{ marginTop: 12, fontSize: 14, color: "#555", lineHeight: 1.7, fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                    {faq.a}
                </p>
            )}
        </div>
    );
}

function ContactInfoCard({ icon, label, value, sub }) {
    return (
        <div
            style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 14,
                padding: "16px 0",
                borderBottom: "1px solid #f0f0f0",
            }}
        >
            <div
                style={{
                    width: 42,
                    height: 42,
                    borderRadius: 10,
                    background: "linear-gradient(135deg, #eef2ff 0%, #e0e7ff 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                    flexShrink: 0,
                }}
            >
                {icon}
            </div>
            <div>
                <p style={{ fontSize: 12, color: "#888", fontFamily: "'Plus Jakarta Sans', sans-serif", marginBottom: 2 }}>{label}</p>
                <p style={{ fontSize: 15, fontWeight: 600, color: "#1a1a2e", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{value}</p>
                {sub && <p style={{ fontSize: 12, color: "#aaa", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>{sub}</p>}
            </div>
        </div>
    );
}

export default function ContactPage() {
    const [activeTopic, setActiveTopic] = useState("general");
    const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });
    const [submitted, setSubmitted] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState({});
    const [focusedField, setFocusedField] = useState(null);
    let { user } = useContext(context)

    const validate = () => {
        const e = {};
        if (!form.name.trim()) e.name = "Name is required";
        if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) e.email = "Valid email required";
        if (!form.message.trim() || form.message.length < 20) e.message = "Please write at least 20 characters";
        return e;
    };

    const handleSubmit = () => {
        const e = validate();
        if (Object.keys(e).length) { setErrors(e); return; }
        setLoading(true);
        setTimeout(() => { setLoading(false); setSubmitted(true); }, 1600);
    };

    const inputStyle = (field) => ({
        width: "100%",
        padding: "12px 16px",
        borderRadius: 10,
        border: `1.5px solid ${errors[field] ? "#ff4d6d" : focusedField === field ? "#4361ee" : "#e2e8f0"}`,
        fontSize: 14,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        color: "#1a1a2e",
        background: "#fafafa",
        outline: "none",
        boxSizing: "border-box",
        transition: "border-color 0.2s, box-shadow 0.2s",
        boxShadow: focusedField === field ? "0 0 0 3px rgba(67,97,238,0.1)" : "none",
    });

    const labelStyle = {
        display: "block",
        fontSize: 13,
        fontWeight: 600,
        color: "#444",
        marginBottom: 6,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        letterSpacing: "0.01em",
    };

    return (
        <>
            {user ? <Header /> : <LandingHeader />}
            <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&family=Playfair+Display:wght@700;800&display=swap" rel="stylesheet" />

            <div style={{ background: "#f7f8fc", minHeight: "100vh", fontFamily: "'Plus Jakarta Sans', sans-serif" }}>

                {/* Hero Banner */}
                <div
                    style={{
                        background: "linear-gradient(135deg, #0f0c29 0%, #1a1a5e 50%, #24243e 100%)",
                        padding: "72px 24px 80px",
                        textAlign: "center",
                        position: "relative",
                        overflow: "hidden",
                    }}
                >
                    {/* Decorative circles */}
                    {[
                        { w: 320, h: 320, top: -80, left: -80, opacity: 0.06 },
                        { w: 200, h: 200, top: 20, right: -40, opacity: 0.04 },
                        { w: 160, h: 160, bottom: -60, left: "40%", opacity: 0.05 },
                    ].map((c, i) => (
                        <div
                            key={i}
                            style={{
                                position: "absolute",
                                width: c.w,
                                height: c.h,
                                top: c.top,
                                left: c.left,
                                right: c.right,
                                bottom: c.bottom,
                                borderRadius: "50%",
                                border: "1px solid rgba(255,255,255,0.3)",
                                opacity: c.opacity,
                                pointerEvents: "none",
                            }}
                        />
                    ))}

                    <div
                        style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            background: "rgba(67,97,238,0.25)",
                            border: "1px solid rgba(67,97,238,0.5)",
                            borderRadius: 999,
                            padding: "6px 18px",
                            marginBottom: 20,
                        }}
                    >
                        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#4cc9f0", display: "inline-block" }} />
                        <span style={{ color: "#a5b4fc", fontSize: 13, fontWeight: 500 }}>Support &amp; Contact</span>
                    </div>

                    <h1
                        style={{
                            fontFamily: "'Playfair Display', serif",
                            fontSize: "clamp(32px, 5vw, 52px)",
                            fontWeight: 800,
                            color: "#fff",
                            marginBottom: 16,
                            lineHeight: 1.1,
                        }}
                    >
                        We're Here to Help You<br />
                        <span style={{ color: "#4cc9f0" }}>Land Your Dream Job</span>
                    </h1>
                    <p
                        style={{
                            fontSize: 17,
                            color: "rgba(255,255,255,0.65)",
                            maxWidth: 520,
                            margin: "0 auto 32px",
                            lineHeight: 1.7,
                        }}
                    >
                        Have a question about your resume analysis, account, or partnership? Our team responds fast.
                    </p>

                    {/* Stats row */}
                    <div
                        style={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 40,
                            flexWrap: "wrap",
                        }}
                    >
                        {[
                            { num: "< 8hrs", label: "Avg. Response Time" },
                            { num: "98%", label: "Satisfaction Rate" },
                            { num: "50k+", label: "Resumes Analyzed" },
                        ].map((s) => (
                            <div key={s.label} style={{ textAlign: "center" }}>
                                <div style={{ fontSize: 24, fontWeight: 800, color: "#4cc9f0", fontFamily: "'Playfair Display', serif" }}>{s.num}</div>
                                <div style={{ fontSize: 12, color: "rgba(255,255,255,0.5)", marginTop: 2 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Main Content */}
                <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px" }}>

                    {/* Cards row */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                            gap: 16,
                            marginTop: -36,
                            marginBottom: 48,
                            position: "relative",
                            zIndex: 10,
                        }}
                    >
                        {[
                            { icon: "⚡", title: "Live Chat", desc: "Chat with us in real-time on the analyzer page", color: "#fff7ed" },
                            { icon: "📧", title: "Email Support", desc: "umair@resumeanalyzer.com", color: "#eff6ff" },
                            { icon: "📚", title: "Help Docs", desc: "Browse our knowledge base & tutorials", color: "#f0fdf4" },
                        ].map((card) => (
                            <AnimatedSection key={card.title}>
                                <div
                                    style={{
                                        background: "#fff",
                                        border: "1px solid #e8ecf4",
                                        borderRadius: 16,
                                        padding: "22px 20px",
                                        boxShadow: "0 4px 24px rgba(0,0,0,0.06)",
                                        display: "flex",
                                        alignItems: "flex-start",
                                        gap: 14,
                                        cursor: "default",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                    }}
                                    onMouseEnter={(e) => {
                                        e.currentTarget.style.transform = "translateY(-3px)";
                                        e.currentTarget.style.boxShadow = "0 8px 32px rgba(67,97,238,0.12)";
                                    }}
                                    onMouseLeave={(e) => {
                                        e.currentTarget.style.transform = "translateY(0)";
                                        e.currentTarget.style.boxShadow = "0 4px 24px rgba(0,0,0,0.06)";
                                    }}
                                >
                                    <div
                                        style={{
                                            width: 44,
                                            height: 44,
                                            borderRadius: 12,
                                            background: card.color,
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 22,
                                            flexShrink: 0,
                                        }}
                                    >
                                        {card.icon}
                                    </div>
                                    <div>
                                        <p style={{ fontWeight: 700, fontSize: 15, color: "#1a1a2e", marginBottom: 4 }}>{card.title}</p>
                                        <p style={{ fontSize: 13, color: "#888", lineHeight: 1.5 }}>{card.desc}</p>
                                    </div>
                                </div>
                            </AnimatedSection>
                        ))}
                    </div>

                    {/* Two Column: Info + Form */}
                    <div
                        style={{
                            display: "grid",
                            gridTemplateColumns: "1fr 1.65fr",
                            gap: 28,
                            marginBottom: 56,
                            alignItems: "start",
                        }}
                    >
                        {/* Left info panel */}
                        <AnimatedSection delay={100}>
                            <div
                                style={{
                                    background: "#fff",
                                    border: "1px solid #e8ecf4",
                                    borderRadius: 20,
                                    padding: "28px 26px",
                                    boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                                }}
                            >
                                <h2
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: 22,
                                        fontWeight: 800,
                                        color: "#1a1a2e",
                                        marginBottom: 6,
                                    }}
                                >
                                    Contact Information
                                </h2>
                                <p style={{ fontSize: 14, color: "#888", marginBottom: 22, lineHeight: 1.6 }}>
                                    Reach out through any channel — we're always happy to help.
                                </p>

                                <ContactInfoCard icon="📧" label="Email" value="umair@resumeanalyzer.com" sub="Fastest response channel" />
                                <ContactInfoCard icon="📞" label="Phone" value="0343-9693468" sub="Available Mon – Fri, 9am – 6pm" />
                                <ContactInfoCard icon="🕐" label="Support Hours" value="Mon – Fri, 9am – 6pm" sub="PKT (UTC+5)" />
                                <ContactInfoCard icon="📍" label="Based in" value="Karachi, Pakistan" />

                                <div style={{ marginTop: 22 }}>
                                    <p style={{ fontSize: 13, fontWeight: 600, color: "#444", marginBottom: 12 }}>Follow Us</p>
                                    <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
                                        {[
                                            { name: "LinkedIn", color: "#0077b5", bg: "#e8f4fd",path:'https://www.linkedin.com/in/muhammad-umair-sadiq-047aa73a5/' },
                                            { name: "Twitter/X", color: "#000", bg: "#f5f5f5" ,path:'#'},
                                            { name: "GitHub", color: "#333", bg: "#f0f0f0" ,path:'https://github.com/MUHAMMADUMAIRSADIQ-CODE1'},
                                        ].map((s) => (
                                            <a
                                                key={s.name}
                                                style={{
                                                    padding: "7px 14px",
                                                    borderRadius: 8,
                                                    border: "none",
                                                    background: s.bg,
                                                    color: s.color,
                                                    fontSize: 13,
                                                    fontWeight: 600,
                                                    cursor: "pointer",
                                                    fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                    transition: "opacity 0.15s",
                                                }}
                                                href={s.path}
                                                onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.75")}
                                                onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
                                            >
                                                {s.name}
                                            </a>
                                        ))}
                                    </div>
                                </div>

                                {/* Response time badge */}
                                <div
                                    style={{
                                        marginTop: 24,
                                        background: "linear-gradient(135deg, #f0fdf4, #dcfce7)",
                                        border: "1px solid #bbf7d0",
                                        borderRadius: 12,
                                        padding: "14px 16px",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 10,
                                    }}
                                >
                                    <span style={{ fontSize: 20 }}>✅</span>
                                    <div>
                                        <p style={{ fontSize: 13, fontWeight: 700, color: "#166534" }}>Usually responds in under 8 hours</p>
                                        <p style={{ fontSize: 12, color: "#4ade80" }}>Support team is online</p>
                                    </div>
                                </div>
                            </div>
                        </AnimatedSection>

                        {/* Right: Form */}
                        <AnimatedSection delay={200}>
                            <div
                                style={{
                                    background: "#fff",
                                    border: "1px solid #e8ecf4",
                                    borderRadius: 20,
                                    padding: "32px 30px",
                                    boxShadow: "0 2px 16px rgba(0,0,0,0.04)",
                                }}
                            >
                                {submitted ? (
                                    <div style={{ textAlign: "center", padding: "40px 0" }}>
                                        <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
                                        <h3
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: 26,
                                                fontWeight: 800,
                                                color: "#1a1a2e",
                                                marginBottom: 10,
                                            }}
                                        >
                                            Message Sent!
                                        </h3>
                                        <p style={{ color: "#666", fontSize: 15, lineHeight: 1.7, maxWidth: 340, margin: "0 auto 24px" }}>
                                            Thanks for reaching out. We'll review your message and get back to you within 8 hours.
                                        </p>
                                        <button
                                            onClick={() => { setSubmitted(false); setForm({ name: "", email: "", company: "", message: "" }); setActiveTopic("general"); }}
                                            style={{
                                                padding: "11px 28px",
                                                background: "#4361ee",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 10,
                                                fontSize: 14,
                                                fontWeight: 600,
                                                cursor: "pointer",
                                                fontFamily: "'Plus Jakarta Sans', sans-serif",
                                            }}
                                        >
                                            Send Another Message
                                        </button>
                                    </div>
                                ) : (
                                    <>
                                        <h2
                                            style={{
                                                fontFamily: "'Playfair Display', serif",
                                                fontSize: 22,
                                                fontWeight: 800,
                                                color: "#1a1a2e",
                                                marginBottom: 4,
                                            }}
                                        >
                                            Send Us a Message
                                        </h2>
                                        <p style={{ fontSize: 14, color: "#888", marginBottom: 22 }}>
                                            Fill in the form below and we'll get right back to you.
                                        </p>

                                        {/* Topic selector */}
                                        <div style={{ marginBottom: 22 }}>
                                            <label style={labelStyle}>What can we help you with?</label>
                                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                                {TOPICS.map((t) => (
                                                    <button
                                                        key={t.id}
                                                        onClick={() => setActiveTopic(t.id)}
                                                        style={{
                                                            padding: "7px 14px",
                                                            borderRadius: 999,
                                                            border: `1.5px solid ${activeTopic === t.id ? "#4361ee" : "#e2e8f0"}`,
                                                            background: activeTopic === t.id ? "#eef2ff" : "#fafafa",
                                                            color: activeTopic === t.id ? "#4361ee" : "#666",
                                                            fontSize: 13,
                                                            fontWeight: activeTopic === t.id ? 700 : 500,
                                                            cursor: "pointer",
                                                            fontFamily: "'Plus Jakarta Sans', sans-serif",
                                                            transition: "all 0.15s",
                                                            display: "flex",
                                                            alignItems: "center",
                                                            gap: 5,
                                                        }}
                                                    >
                                                        <span>{t.icon}</span> {t.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Name + Email */}
                                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14, marginBottom: 14 }}>
                                            <div>
                                                <label style={labelStyle}>Full Name <span style={{ color: "#ff4d6d" }}>*</span></label>
                                                <input
                                                    style={inputStyle("name")}
                                                    placeholder="Umair"
                                                    value={form.name}
                                                    onChange={(e) => { setForm({ ...form, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                                                    onFocus={() => setFocusedField("name")}
                                                    onBlur={() => setFocusedField(null)}
                                                />
                                                {errors.name && <p style={{ fontSize: 12, color: "#ff4d6d", marginTop: 4 }}>{errors.name}</p>}
                                            </div>
                                            <div>
                                                <label style={labelStyle}>Email Address <span style={{ color: "#ff4d6d" }}>*</span></label>
                                                <input
                                                    style={inputStyle("email")}
                                                    placeholder="umair@example.com"
                                                    value={form.email}
                                                    onChange={(e) => { setForm({ ...form, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                                                    onFocus={() => setFocusedField("email")}
                                                    onBlur={() => setFocusedField(null)}
                                                />
                                                {errors.email && <p style={{ fontSize: 12, color: "#ff4d6d", marginTop: 4 }}>{errors.email}</p>}
                                            </div>
                                        </div>

                                        {/* Company */}
                                        <div style={{ marginBottom: 14 }}>
                                            <label style={labelStyle}>Company / Organization <span style={{ color: "#aaa", fontWeight: 400 }}>(optional)</span></label>
                                            <input
                                                style={inputStyle("company")}
                                                placeholder="Acme Corp."
                                                value={form.company}
                                                onChange={(e) => setForm({ ...form, company: e.target.value })}
                                                onFocus={() => setFocusedField("company")}
                                                onBlur={() => setFocusedField(null)}
                                            />
                                        </div>

                                        {/* Message */}
                                        <div style={{ marginBottom: 22 }}>
                                            <label style={labelStyle}>Your Message <span style={{ color: "#ff4d6d" }}>*</span></label>
                                            <textarea
                                                rows={5}
                                                style={{ ...inputStyle("message"), resize: "vertical", lineHeight: 1.6 }}
                                                placeholder="Describe your issue or question in detail..."
                                                value={form.message}
                                                onChange={(e) => { setForm({ ...form, message: e.target.value }); setErrors({ ...errors, message: "" }); }}
                                                onFocus={() => setFocusedField("message")}
                                                onBlur={() => setFocusedField(null)}
                                            />
                                            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 4 }}>
                                                {errors.message ? (
                                                    <p style={{ fontSize: 12, color: "#ff4d6d" }}>{errors.message}</p>
                                                ) : <span />}
                                                <p style={{ fontSize: 12, color: form.message.length > 450 ? "#ff4d6d" : "#bbb" }}>
                                                    {form.message.length} / 500
                                                </p>
                                            </div>
                                        </div>

                                        {/* Submit */}
                                        <button
                                            onClick={handleSubmit}
                                            disabled={loading}
                                            style={{
                                                width: "100%",
                                                padding: "14px",
                                                background: loading ? "#a5b4fc" : "linear-gradient(135deg, #4361ee, #3a0ca3)",
                                                color: "#fff",
                                                border: "none",
                                                borderRadius: 12,
                                                fontSize: 16,
                                                fontWeight: 700,
                                                cursor: loading ? "not-allowed" : "pointer",
                                                fontFamily: "'Playfair Display', serif",
                                                letterSpacing: "0.02em",
                                                transition: "opacity 0.2s, transform 0.15s",
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "center",
                                                gap: 8,
                                            }}
                                            onMouseEnter={(e) => { if (!loading) e.currentTarget.style.opacity = "0.9"; }}
                                            onMouseLeave={(e) => { e.currentTarget.style.opacity = "1"; }}
                                        >
                                            {loading ? (
                                                <>
                                                    <span
                                                        style={{
                                                            width: 18,
                                                            height: 18,
                                                            border: "2.5px solid rgba(255,255,255,0.4)",
                                                            borderTopColor: "#fff",
                                                            borderRadius: "50%",
                                                            animation: "spin 0.8s linear infinite",
                                                            display: "inline-block",
                                                        }}
                                                    />
                                                    Sending...
                                                </>
                                            ) : (
                                                "Send Message →"
                                            )}
                                        </button>

                                        <p style={{ fontSize: 12, color: "#bbb", textAlign: "center", marginTop: 12 }}>
                                            🔒 Your information is encrypted and never shared.
                                        </p>
                                    </>
                                )}
                            </div>
                        </AnimatedSection>
                    </div>

                    {/* FAQ */}
                    <AnimatedSection delay={100}>
                        <div style={{ marginBottom: 64 }}>
                            <div style={{ textAlign: "center", marginBottom: 32 }}>
                                <p style={{ fontSize: 13, fontWeight: 600, color: "#4361ee", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 8 }}>
                                    FAQs
                                </p>
                                <h2
                                    style={{
                                        fontFamily: "'Playfair Display', serif",
                                        fontSize: 28,
                                        fontWeight: 800,
                                        color: "#1a1a2e",
                                        marginBottom: 10,
                                    }}
                                >
                                    Frequently Asked Questions
                                </h2>
                                <p style={{ color: "#888", fontSize: 15, maxWidth: 440, margin: "0 auto" }}>
                                    Can't find what you're looking for? Send us a message above.
                                </p>
                            </div>
                            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: 14, maxWidth: 900, margin: "0 auto" }}>
                                {FAQS.map((f) => (
                                    <FaqItem key={f.q} faq={f} />
                                ))}
                            </div>
                        </div>
                    </AnimatedSection>

                </div>
            </div>
            <Footer />
            <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>
        </>
    );
}