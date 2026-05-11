import React, { useContext, useState } from "react";
import { context } from "../../store/context";
import { useAuth } from "../../auth/hooks/hook";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const { setState, theme } = useContext(context);
    let { handleLogin } = useAuth()
    let [change, setChange] = useState("")

    let [radio, setRadio] = useState("Email")
    let [form, setForm] = useState({
        email: "",
        password: "",
        userName: ""
    })
    let navigate=useNavigate()
    const onchangeForm = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })

    }


    const handlelogin = async(e) => {
        e.preventDefault();
       await handleLogin(form)
       navigate('/dashboard')

    };
   
    return (
        
        <div className={`login-overlay ${theme}`}>

            <div className="login-box position-relative">

                {/* CLOSE */}
                <button className="close-btn" onClick={() => setState("")}>
                    ✕
                </button>

                <h2 className="fw-bold text-center mb-4">Login</h2>

                <form onSubmit={handlelogin} className="d-flex flex-column gap-3">
                    <div style={{ display: "flex", padding: '8px', justifyContent: 'center', gap: "15px" }}>
                        <label >Email &nbsp;&nbsp;<input type="radio" name="form" value="Email" checked={radio === "Email" ? true : false} onClick={() => setRadio("Email")} /></label><label>
                            UserName &nbsp;&nbsp;<input type="radio" name="form" value="UserName" checked={radio === "UserName" ? true : false} onClick={() => setRadio("UserName")} /></label>
                    </div>
                    {
                        radio === "Email" ?
                            <input
                                type="email"
                                placeholder="Email address"
                                className="form-control"
                                value={form.email}
                                name="email"
                                required
                                onChange={onchangeForm}
                            /> : <input
                                type="userName"
                                placeholder="UserName"
                                className="form-control"
                                value={form.userName}
                                name="userName"
                                required
                                onChange={onchangeForm}
                            />}

                    <input
                        type="password"
                        placeholder="Password"
                        className="form-control"
                        name="password"
                        value={form.password}
                        onChange={onchangeForm}
                        required
                    />

                    <button className="btn btn-primary w-100">
                        Login
                    </button>

                </form>

                <div className="text-center mt-3 small">
                    <a href="#" className="text-primary">Forgot password?</a>
                </div>

                <div className="text-center mt-2 small">
                    Don’t have an account?{" "}
                    <a href="#" className="text-primary" onClick={() => setState("Signup")}>Sign up</a>
                </div>

            </div>

            {/* STYLE */}
            <style>{`
        .login-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.55);
          backdrop-filter: blur(6px);
          z-index: 999;
        }

        .login-box {
          width: 100%;
          max-width: 420px;
          padding: 25px;
          border-radius: 16px;
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
          top: 10px;
          right: 12px;
          border: none;
          background: transparent;
          font-size: 22px;
          cursor: pointer;
          color: var(--text);
        }
          
                .close-btn:hover {
                    transform: scale(1.2);
                    color: red;
                }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(20px) scale(0.95);
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

export default Login;