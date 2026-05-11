import React from "react";

const AiLoader = (props) => {
  return (
    <div className="ai-loader-overlay" >

      <div className="ai-loader-box">

        {/* RING */}
        <div className="ring"></div>

        {/* TEXT */}
        <h3 className="mt-4 fw-bold">{props.welcome}</h3>
        <p className="text-secondary small">
          {props.second}
        </p>

        {/* DOTS */}
        <div className="dots">
          <span></span>
          <span></span>
          <span></span>
        </div>

      </div>

      {/* STYLE */}
      <style>{`
        .ai-loader-overlay {
          position: fixed;
          inset: 0;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(8px);
          z-index: 1000000;
        }

        .ai-loader-box {
          text-align: center;
          padding: 30px;
          border-radius: 16px;
          background: var(--card);
          color: var(--text);
          border: 1px solid var(--border);
        }

        /* RING */
        .ring {
          width: 80px;
          height: 80px;
          border: 5px solid var(--border);
          border-top: 5px solid #0d6efd;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: auto;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        /* DOTS */
        .dots {
          margin-top: 15px;
        }

        .dots span {
          display: inline-block;
          width: 8px;
          height: 8px;
          margin: 0 3px;
          background: #0d6efd;
          border-radius: 50%;
          animation: bounce 0.6s infinite alternate;
        }

        .dots span:nth-child(2) {
          animation-delay: 0.2s;
        }

        .dots span:nth-child(3) {
          animation-delay: 0.4s;
        }

        @keyframes bounce {
          from { transform: translateY(0); opacity: 0.4; }
          to { transform: translateY(-8px); opacity: 1; }
        }
      `}</style>

    </div>
  );
};

export default AiLoader;