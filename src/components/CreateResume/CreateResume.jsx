import { useContext, useRef, useState } from "react";
import { context } from "../../store/context";

export default function ResumeUploader() {
    const [dragging, setDragging] = useState(false);
    const fileRef = useRef();
    let { sidebar, setFile, file ,width} = useContext(context)
    let fileinfo = () => {
        let fileresume = fileRef?.current?.files[0];
        if (fileresume) {
            setFile({ fileresume, fileName: fileRef.current.value });
        }
        fileRef.current.value = "";
    };

    const handleDrop = (e) => {
        e.preventDefault();
        setDragging(false);
        const dropped = e.dataTransfer.files[0];
        if (dropped) {
            setFile({ fileresume: dropped, fileName: dropped.name });
        }
    };

    const removeFile = () => setFile(null);

    const getFileExt = (name) => {
        if (!name) return "";
        const parts = name.split(".");
        return parts[parts.length - 1].toUpperCase();
    };

    const getDisplayName = (fileName) => {
        if (!fileName) return "";
        const parts = fileName.split("\\");
        return parts[parts.length - 1];
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "#0a0a0f",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontFamily: "'DM Sans', sans-serif",
            padding: "24px",
            marginLeft: sidebar ? width < 800 ? "0px" : "240px" : "50px",
            marginTop:'0px'
        }}>
            <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

        * { box-sizing: border-box; margin: 0; padding: 0; }

        .card {
          background: #111118;
          border: 1px solid #1e1e2e;
          border-radius: 24px;
          padding: 48px 40px;
          width: 100%;
          max-width: ${width<500?'480px':'680px'};
          box-shadow: 0 0 80px rgba(99,102,241,0.07);
          position: relative;
          overflow: hidden;
        }

        .card::before {
          content: '';
          position: absolute;
          top: -80px;
          right: -80px;
          width: 220px;
          height: 220px;
          background: radial-gradient(circle, rgba(99,102,241,0.15) 0%, transparent 70%);
          pointer-events: none;
        }

        .badge {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          background: rgba(99,102,241,0.12);
          border: 1px solid rgba(99,102,241,0.25);
          border-radius: 100px;
          padding: 5px 14px;
          font-size: 11px;
          font-weight: 600;
          color: #818cf8;
          letter-spacing: 0.08em;
          text-transform: uppercase;
          margin-bottom: 20px;
        }

        .badge-dot {
          width: 6px;
          height: 6px;
          background: #6366f1;
          border-radius: 50%;
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(0.8); }
        }

        .title {
          font-family: 'Poppins', sans-serif;
          font-size: 28px;
          font-weight: 800;
          color: #f1f1f8;
          line-height: 1.2;
          margin-bottom: 8px;
        }

        .title span {
          background: linear-gradient(135deg, #6366f1, #a78bfa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .subtitle {
          font-size: 14px;
          color: #4a4a6a;
          font-weight: 400;
          margin-bottom: 32px;
          line-height: 1.5;
        }

        .drop-zone {
          border: 1.5px dashed #2a2a3e;
          border-radius: 16px;
          padding: 36px 24px;
          text-align: center;
          cursor: pointer;
          transition: all 0.25s ease;
          background: #0d0d16;
          position: relative;
        }

        .drop-zone:hover, .drop-zone.drag-over {
          border-color: #6366f1;
          background: rgba(99,102,241,0.04);
          transform: translateY(-1px);
        }

        .drop-zone.drag-over {
          box-shadow: 0 0 0 4px rgba(99,102,241,0.1);
        }

        .upload-icon {
          width: 52px;
          height: 52px;
          background: linear-gradient(135deg, rgba(99,102,241,0.2), rgba(167,139,250,0.1));
          border: 1px solid rgba(99,102,241,0.2);
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 0 auto 16px;
        }

        .drop-text {
          font-size: 14px;
          color: #6b6b8f;
          margin-bottom: 4px;
        }

        .drop-text strong {
          color: #818cf8;
          font-weight: 500;
        }

        .drop-hint {
          font-size: 12px;
          color: #3a3a55;
          margin-top: 8px;
        }

        .file-input {
          display: none;
        }

        .file-preview {
          background: #0d0d16;
          border: 1px solid #1e1e2e;
          border-radius: 14px;
          padding: 16px 18px;
          display: flex;
          align-items: center;
          gap: 14px;
          margin-top: 16px;
          animation: slideIn 0.3s ease;
        }

        @keyframes slideIn {
          from { opacity: 0; transform: translateY(8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .file-ext {
          width: 42px;
          height: 48px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: 700;
          color: white;
          letter-spacing: 0.05em;
          flex-shrink: 0;
        }

        .file-details {
          flex: 1;
          min-width: 0;
        }

        .file-name {
          font-size: 13px;
          font-weight: 500;
          color: #d1d1e8;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }

        .file-meta {
          font-size: 11px;
          color: #4a4a6a;
          margin-top: 3px;
        }

        .remove-btn {
          background: rgba(239,68,68,0.1);
          border: none;
          width: 28px;
          height: 28px;
          border-radius: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          color: #f87171;
          flex-shrink: 0;
          transition: background 0.2s;
        }

        .remove-btn:hover {
          background: rgba(239,68,68,0.2);
        }

        .submit-btn {
          width: 100%;
          margin-top: 24px;
          padding: 15px;
          background: linear-gradient(135deg, #6366f1, #7c3aed);
          border: none;
          border-radius: 14px;
          color: white;
          font-family: 'DM Sans', sans-serif;
          font-size: 15px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.25s ease;
          position: relative;
          overflow: hidden;
          letter-spacing: 0.02em;
        }

        .submit-btn::after {
          content: '';
          position: absolute;
          top: 0; left: -100%;
          width: 100%; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.08), transparent);
          transition: left 0.4s ease;
        }

        .submit-btn:hover::after { left: 100%; }

        .submit-btn:hover {
          transform: translateY(-1px);
          box-shadow: 0 8px 24px rgba(99,102,241,0.35);
        }

        .submit-btn:disabled {
          opacity: 0.35;
          cursor: not-allowed;
          transform: none;
          box-shadow: none;
        }

        .formats {
          display: flex;
          gap: 8px;
          justify-content: center;
          margin-top: 20px;
        }

        .format-tag {
          font-size: 11px;
          color: #3a3a55;
          background: #111118;
          border: 1px solid #1e1e2e;
          border-radius: 6px;
          padding: 3px 10px;
          font-weight: 500;
        }

        .success-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(34,197,94,0.08);
          border: 1px solid rgba(34,197,94,0.2);
          border-radius: 10px;
          padding: 10px 14px;
          margin-top: 16px;
          font-size: 13px;
          color: #4ade80;
          animation: slideIn 0.3s ease;
        }
      `}</style>

            <div className="card"style={{marginTop: '100px'}}>
                <div className="badge">
                    <div className="badge-dot" />
                    Resume Upload
                </div>

                <h1 className="title">
                    Upload Your <span>Resume</span>
                </h1>
                <p className="subtitle">
                    PDF, DOC ya DOCX format mein upload karein. Maximum size 5MB.
                </p>

                {/* Drop Zone */}
                <div
                    className={`drop-zone ${dragging ? "drag-over" : ""}`}
                    onClick={() => fileRef.current.click()}
                    onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                    onDragLeave={() => setDragging(false)}
                    onDrop={handleDrop}
                >
                    <div className="upload-icon">
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M12 16V8M12 8L9 11M12 8L15 11" stroke="#818cf8" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3 15C3 17.8 5.2 20 8 20H16C18.8 20 21 17.8 21 15" stroke="#6366f1" strokeWidth="1.8" strokeLinecap="round" />
                        </svg>
                    </div>
                    <p className="drop-text">
                        <strong>Click here</strong> or drop your file here
                    </p>
                    <p className="drop-text" style={{ fontSize: "12px", marginTop: "4px" }}>
                      PDF, DOC, DOCX, JPG, JPEG, PNG
                    </p>
                    <p className="drop-hint">Max size: 5MB</p>

                    <input
                        ref={fileRef}
                        type="file"
                        className="file-input"
                        onChange={fileinfo}
                    />
                </div>

                {/* File Preview */}
                {file && (
                    <>
                        <div className="file-preview">
                            <div className="file-ext">
                                {getFileExt(getDisplayName(file.fileName))}
                            </div>
                            <div className="file-details">
                                <div className="file-name">{getDisplayName(file.fileName)}</div>
                                <div className="file-meta">
                                    {file.fileresume?.size
                                        ? `${(file.fileresume.size / 1024).toFixed(1)} KB`
                                        : "Ready to upload"}
                                </div>
                            </div>
                            <button className="remove-btn" onClick={removeFile}>
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                                    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                                </svg>
                            </button>
                        </div>

                        <div className="success-bar">
                            <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                            File successfully selected
                        </div>
                    </>
                )}

                {/* Submit Button */}
               

                {/* Format tags */}
                <div className="formats">
                    {['PDF', 'DOC', 'DOCX', 'JPG', 'JPEG', 'PNG'].map((f) => (
                        <span key={f} className="format-tag">{f}</span>
                    ))}
                </div>
            </div>
        </div>
    );
}