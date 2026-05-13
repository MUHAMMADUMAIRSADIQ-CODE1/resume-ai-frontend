import React, { useContext, useEffect } from "react";
import Footer from "../footer/Footer";
import UserReviews from "../userResviews/UserReviews";
import LandingHeader from "./SimpleHeader";
import { context } from "../../store/context";
import Login from "../Login/Login";
import Signup from "../signup/signup";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/hooks/hook";

const LandingPage = () => {
    const { theme, setState, state, user } = useContext(context);
    

    return (
        <div className={theme}>

            {/* GLOBAL WRAPPER (IMPORTANT FIX) */}
            <div
                style={{
                    background: "var(--bg)",
                    color: "var(--text)",
                    minHeight: "100vh",
                }}
            >

                <LandingHeader />
                
                {/* HERO */}
                <div className="min-vh-100 d-flex align-items-center justify-content-center p-3 p-md-4">
                    <div className="container">
                        <div className="row align-items-center g-5 flex-column-reverse flex-md-row">

                            <div className="col-md-6 text-center text-md-start fade-up">
                                <h1 className="display-4 fw-bold glow-text">
                                    AI Resume Analyzer
                                </h1>

                                <p className="lead text-secondary">
                                    Upload your resume and get AI-powered feedback instantly.
                                </p>

                                <div className="d-flex gap-3 flex-column flex-sm-row justify-content-center justify-content-md-start mt-4">
                                    <button className="btn btn-primary" onClick={() => setState("Login")}>Get Started</button>
                                    <button className="btn btn-warning">Learn More</button>
                                </div>
                            </div>

                            <div className="col-md-6 fade-up">
                                <div
                                    className=" hover-card"

                                >
                                    <img
                                        src="https://copilot.microsoft.com/th/id/BCO.94865471-c973-47cd-97b6-bea92fbb6119.png"
                                        className="img-fluid hero-img"
                                        alt="AI"
                                    />
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                {/* FEATURES */}
                {/* FEATURES */}
                <div className="py-5 text-center">
                    <div className="container">

                        <h2 className="fw-bold mb-5 glow-text">Features</h2>

                        <div className="row g-4">

                            {/* CARD 1 */}
                            <div className="col-md-4">
                                <div className="feature-card p-4 h-100 rounded-4">

                                    <div className="icon-box mb-3">
                                        📊
                                    </div>

                                    <h5 className="fw-bold">ATS Score Analysis</h5>

                                    <p className="text-secondary mb-0">
                                        Get accurate ATS score and see how recruiters view your resume.
                                    </p>

                                </div>
                            </div>

                            {/* CARD 2 */}
                            <div className="col-md-4">
                                <div className="feature-card p-4 h-100 rounded-4">

                                    <div className="icon-box mb-3">
                                        🤖
                                    </div>

                                    <h5 className="fw-bold">AI Smart Feedback</h5>

                                    <p className="text-secondary mb-0">
                                        AI detects mistakes and gives smart improvement suggestions.
                                    </p>

                                </div>
                            </div>

                            {/* CARD 3 */}
                            <div className="col-md-4">
                                <div className="feature-card p-4 h-100 rounded-4">

                                    <div className="icon-box mb-3">
                                        🎯
                                    </div>

                                    <h5 className="fw-bold">Job Match Score</h5>

                                    <p className="text-secondary mb-0">
                                        See how well your resume matches specific job descriptions.
                                    </p>

                                </div>
                            </div>

                        </div>
                    </div>
                </div>

                <UserReviews />
                <Footer />

            </div>

        </div>
    );
};

export default LandingPage;