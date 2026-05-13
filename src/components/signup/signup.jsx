import React, { useState, useContext } from "react";
import { context } from "../../store/context";
import { useAuth } from "../../auth/hooks/hook";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const { theme, setState } = useContext(context);
    let { handleRegister } = useAuth()
    const [step, setStep] = useState(1);
    let navigate = useNavigate()
    const [form, setForm] = useState({
        userName: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {

        setForm({ ...form, [e.target.name]: e.target.name === 'userName' || e.target.name === 'email' ? e?.target?.value?.toLowerCase() : e.target.value });
    };
    


    const sendOtp = async (e) => {
        e.preventDefault();
        await handleRegister(form)
        navigate('/dashboard')
        setForm({
            userName: "",
            email: "",
            password: "",
        })
    };

    const verifyOtp = (e) => {
        e.preventDefault();

        alert("Account created successfully");
    };

    return (
        <div className={`signup-overlay ${theme}`}>

            <div className="signup-card p-4 p-md-5 rounded-4 shadow-lg position-relative">

                {/* ❌ CLOSE BUTTON */}
                <button
                    onClick={() => setState("")}
                    className="close-btn"
                >
                    ✕
                </button>

                {/* TITLE */}
                <h2 className="fw-bold text-center mb-4">
                    Sign Up
                </h2>

                {/* STEP 1 */}
                {step === 1 && (
                    <form onSubmit={sendOtp} className="d-flex flex-column gap-3">

                        <input
                            type="text"
                            name="userName"
                            placeholder="UserName"
                            className="form-control"
                            value={form.userName}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="email"
                            name="email"
                            placeholder="Email Address"
                            className="form-control"
                            value={form.email}
                            onChange={handleChange}
                            required
                        />

                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            value={form.password}
                            onChange={handleChange}
                            required
                        />

                        <button className="btn btn-primary w-100">
                            Send OTP
                        </button>
                        <div className="text-center mt-2 small">
                            Already have an account?{" "}
                            <a href="#" className="text-primary" onClick={() => setState("Login")}>Login</a>
                        </div>
                    </form>
                )}

                {/* STEP 2 */}
                {/* {step === 2 && (
                    <form onSubmit={verifyOtp} className="d-flex flex-column gap-3">

                        <p className="text-secondary small text-center">
                            OTP sent to <b>{form.email}</b>
                        </p>

                        <input
                            type="text"
                            name="otp"
                            placeholder="Enter OTP"
                            className="form-control text-center"
                            value={form.otp}
                            onChange={handleChange}
                            required
                        />

                        <button className="btn btn-success w-100">
                            Verify & Create Account
                        </button>

                        <button
                            type="button"
                            className="btn btn-link"
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>
                    </form>
                )} */}

            </div>

            {/* STYLE */}
            <style>{`
                .signup-overlay {
                    position: fixed;
                    inset: 0;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    z-index: 9999;
                    background: rgba(0,0,0,0.55);
                    backdrop-filter: blur(6px);
                }

                .signup-card {
                    width: 100%;
                    max-width: 420px;
                    background: var(--card);
                    color: var(--text);
                    border: 1px solid var(--border);
                    animation: fadeUp 0.4s ease;
                }

                .form-control {
                    background: transparent;
                    color: var(--text);
                    border: 1px solid var(--border);
                    
                }
                     .form-control::placeholder {
          color: var(--text);
          opacity: 0.6;
        }

                .form-control:focus {
                    box-shadow: none;
                    border-color: #0d6efd;
                }

                .close-btn {
                    position: absolute;
                    top: 12px;
                    right: 12px;
                    border: none;
                    background: transparent;
                    font-size: 22px;
                    cursor: pointer;
                    color: var(--text);
                    transition: 0.2s;
                }

                .close-btn:hover {
                    transform: scale(1.2);
                    color: red;
                }

                @keyframes fadeUp {
                    from {
                        opacity: 0;
                        transform: translateY(25px) scale(0.95);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0) scale(1);
                    }
                }
            `}</style>

        </div>
    );
};

export default Signup;