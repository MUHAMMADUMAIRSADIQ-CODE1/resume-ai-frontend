import React from 'react'
import { useContext } from 'react';
import { context } from '../store/context';
import { useResume } from '../auth/hooks/resumeHook';

const FilePopup = () => {
    let { setFile, file } = useContext(context)
    let { resumeAnalyze } = useResume()

    let uploadFileInfo = () => {
        if (file?.fileresume) {
            let formData = new FormData()
            formData.append('resume', file?.fileresume)
            resumeAnalyze(formData)
            console.log('upload main agaya')
        }
    }

    // Display clean file name
    const getDisplayName = (fileName) => {
        if (!fileName) return "";
        const parts = fileName.split("\\");
        return parts[parts.length - 1];
    };

    const getFileExt = (name) => {
        if (!name) return "FILE";
        const parts = name.split(".");
        return parts[parts.length - 1].toUpperCase();
    };

    const displayName = getDisplayName(file?.fileName);
    const fileExt = getFileExt(displayName);
    const fileSize = file?.fileresume?.size
        ? `${(file.fileresume.size / 1024).toFixed(1)} KB`
        : null;

    return (
        <>
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600&family=Syne:wght@700;800&display=swap');

                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }

                @keyframes scaleIn {
                    from { opacity: 0; transform: scale(0.92) translateY(12px); }
                    to { opacity: 1; transform: scale(1) translateY(0); }
                }

                @keyframes shimmer {
                    0% { background-position: -200% center; }
                    100% { background-position: 200% center; }
                }

                .fp-overlay {
                    position: fixed;
                    top: 0; left: 0;
                    width: 100%; height: 100%;
                    background: rgba(5, 5, 12, 0.75);
                    backdrop-filter: blur(6px);
                    -webkit-backdrop-filter: blur(6px);
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    animation: fadeIn 0.25s ease;
                    z-index: 1000;
                    font-family: 'DM Sans', sans-serif;
                    padding: 16px;
                    z-index: 10000;
                }

                .fp-popup {
                    background: #111118;
                    border: 1px solid #1e1e2e;
                    border-radius: 24px;
                    padding: 36px 32px;
                    width: 100%;
                    max-width: 420px;
                    position: relative;
                    animation: scaleIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
                    box-shadow: 0 24px 80px rgba(0,0,0,0.5), 0 0 0 1px rgba(99,102,241,0.08);
                    overflow: hidden;
                }

                .fp-popup::before {
                    content: '';
                    position: absolute;
                    top: -60px; right: -60px;
                    width: 180px; height: 180px;
                    background: radial-gradient(circle, rgba(99,102,241,0.12) 0%, transparent 70%);
                    pointer-events: none;
                }

                .fp-close {
                    position: absolute;
                    top: 16px; right: 16px;
                    border: 1px solid #2a2a3e;
                    background: #0d0d16;
                    width: 32px; height: 32px;
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    color: #4a4a6a;
                    transition: all 0.2s ease;
                    font-size: 0;
                }

                .fp-close:hover {
                    background: rgba(239,68,68,0.1);
                    border-color: rgba(239,68,68,0.3);
                    color: #f87171;
                }

                .fp-header {
                    margin-bottom: 28px;
                }

                .fp-badge {
                    display: inline-flex;
                    align-items: center;
                    gap: 6px;
                    background: rgba(99,102,241,0.12);
                    border: 1px solid rgba(99,102,241,0.25);
                    border-radius: 100px;
                    padding: 4px 12px;
                    font-size: 10px;
                    font-weight: 600;
                    color: #818cf8;
                    letter-spacing: 0.08em;
                    text-transform: uppercase;
                    margin-bottom: 14px;
                }

                .fp-badge-dot {
                    width: 5px; height: 5px;
                    background: #6366f1;
                    border-radius: 50%;
                    animation: pulse 2s infinite;
                }

                @keyframes pulse {
                    0%, 100% { opacity: 1; transform: scale(1); }
                    50% { opacity: 0.4; transform: scale(0.7); }
                }

                .fp-title {
                    font-family: 'Syne', sans-serif;
                    font-size: 22px;
                    font-weight: 800;
                    color: #f1f1f8;
                    line-height: 1.2;
                    margin: 0;
                }

                .fp-title span {
                    background: linear-gradient(135deg, #6366f1, #a78bfa);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .fp-subtitle {
                    font-size: 13px;
                    color: #4a4a6a;
                    margin-top: 6px;
                }

                .fp-file-card {
                    background: #0d0d16;
                    border: 1px solid #1e1e2e;
                    border-radius: 16px;
                    padding: 16px;
                    display: flex;
                    align-items: center;
                    gap: 14px;
                    margin-bottom: 20px;
                }

                .fp-ext-badge {
                    width: 44px;
                    height: 50px;
                    background: linear-gradient(135deg, #6366f1, #7c3aed);
                    border-radius: 10px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    font-size: 10px;
                    font-weight: 700;
                    color: white;
                    letter-spacing: 0.05em;
                    flex-shrink: 0;
                }

                .fp-file-info {
                    flex: 1;
                    min-width: 0;
                }

                .fp-file-name {
                    font-size: 13px;
                    font-weight: 500;
                    color: #d1d1e8;
                    white-space: nowrap;
                    overflow: hidden;
                    text-overflow: ellipsis;
                }

                .fp-file-meta {
                    font-size: 11px;
                    color: #4a4a6a;
                    margin-top: 3px;
                    display: flex;
                    align-items: center;
                    gap: 6px;
                }

                .fp-file-dot {
                    width: 3px; height: 3px;
                    background: #3a3a55;
                    border-radius: 50%;
                }

                .fp-check {
                    width: 28px; height: 28px;
                    background: rgba(34,197,94,0.1);
                    border: 1px solid rgba(34,197,94,0.2);
                    border-radius: 8px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    flex-shrink: 0;
                }

                .fp-upload-btn {
                    width: 100%;
                    padding: 14px;
                    background: linear-gradient(135deg, #6366f1, #7c3aed);
                    border: none;
                    border-radius: 14px;
                    color: white;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 15px;
                    font-weight: 600;
                    cursor: pointer;
                    position: relative;
                    overflow: hidden;
                    transition: all 0.25s ease;
                    letter-spacing: 0.02em;
                }

                .fp-upload-btn::after {
                    content: '';
                    position: absolute;
                    top: 0; left: -100%;
                    width: 100%; height: 100%;
                    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent);
                    transition: left 0.4s ease;
                }

                .fp-upload-btn:hover::after { left: 100%; }

                .fp-upload-btn:hover {
                    transform: translateY(-1px);
                    box-shadow: 0 8px 24px rgba(99,102,241,0.4);
                }

                .fp-upload-btn:active {
                    transform: translateY(0);
                }

                .fp-cancel {
                    width: 100%;
                    padding: 12px;
                    background: transparent;
                    border: 1px solid #1e1e2e;
                    border-radius: 14px;
                    color: #4a4a6a;
                    font-family: 'DM Sans', sans-serif;
                    font-size: 14px;
                    font-weight: 500;
                    cursor: pointer;
                    margin-top: 10px;
                    transition: all 0.2s ease;
                }

                .fp-cancel:hover {
                    border-color: #2a2a3e;
                    color: #6b6b8f;
                    background: #0d0d16;
                }

                .fp-divider {
                    height: 1px;
                    background: #1e1e2e;
                    margin: 20px 0;
                }
            `}</style>

            <div className="fp-overlay">
                <div className="fp-popup">

                    {/* Close Button */}
                    <button className="fp-close" onClick={() => setFile(null)}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
                            <path d="M18 6L6 18M6 6L18 18" stroke="#f87171" strokeWidth="2.2" strokeLinecap="round"/>
                        </svg>
                    </button>

                    {/* Header */}
                    <div className="fp-header">
                        <div className="fp-badge">
                            <div className="fp-badge-dot" />
                            Ready to Upload
                        </div>
                        <h2 className="fp-title">
                            Upload <span>Resume</span>
                        </h2>
                        <p className="fp-subtitle">Apni file review karein aur upload karein</p>
                    </div>

                    {/* File Card */}
                    <div className="fp-file-card">
                        <div className="fp-ext-badge">{fileExt}</div>
                        <div className="fp-file-info">
                            <div className="fp-file-name">{displayName || "Resume file"}</div>
                            <div className="fp-file-meta">
                                {fileSize && <span>{fileSize}</span>}
                                {fileSize && <span className="fp-file-dot" />}
                                <span style={{ color: "#3a3a55" }}>Upload ready</span>
                            </div>
                        </div>
                        <div className="fp-check">
                            <svg width="13" height="13" viewBox="0 0 24 24" fill="none">
                                <path d="M20 6L9 17L4 12" stroke="#4ade80" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                        </div>
                    </div>

                    <div className="fp-divider" />

                    {/* Upload Button */}
                    <button className="fp-upload-btn" onClick={uploadFileInfo}>
                        Resume Upload Karein →
                    </button>

                    {/* Cancel Button */}
                    <button className="fp-cancel" onClick={() => setFile(null)}>
                        Cancel
                    </button>

                </div>
            </div>
        </>
    )
}

export default FilePopup