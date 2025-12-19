import React, { useState } from 'react';
import './Signuppassword.css';
import logo from '/images/spotify logo.webp';
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";


export default function Signuppassword() {
  const [password, setPassword] = useState('');
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();
  const location = useLocation();
  const { email, userId } = location.state || {};

  const hasLetter = /[A-Za-z]/.test(password);
  const hasNumberOrSpecial = /[0-9!@#\$%\^&*()_+\-=[\]{};':"\\|,.<>\/?]/.test(password);
  const hasLength = password.length >= 10;

  const handlePassword = async () => {
    setMessage("");
    setError("");

    try {

      const res = await axios.post("/api/setpassword", {
        userId,
        password,
      });

      console.log("✅ Signup response:", res.data);

      if (res.data.success) {
        setMessage(res.data.message);
        setTimeout(() => navigate("/termsandconditions"), 1500); 
      } else {
        if (res.data.message === "User not found") {
        alert("User not found! Please sign up .");
        navigate("/Signup");
      } else{
       setError(res.data.message);
      }
      }
    } catch (err) {
      console.log("Frontend error:", err);
      setError("Something went wrong. Please try again later.");
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img
          src={logo}
          alt="Spotify Logo"
          className="spotify-logo"
        />

        <h1 className="signup-title">Create a password</h1>

        <div className="sp-card">
          <div className="sp-progress">
            <div className="sp-progress-filled" style={{ width: '33%' }} />
          </div>

          <h6 className="sp-step">Step 1 of 2</h6>

          <label className="sp-label">Password</label>
          <div className="sp-input-wrap">
            <input
              className="sp-input"
              type={visible ? 'text' : 'password'}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder=""
            />
            <button
              type="button"
              aria-label={visible ? 'Hide password' : 'Show password'}
              className="sp-eye"
              onClick={() => setVisible((v) => !v)}
            >
              {visible ? (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M3 3l18 18"
                    stroke="#fff"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M12 5c5 0 9 4 9 7s-4 7-9 7-9-4-9-7 4-7 9-7z"
                    stroke="#fff"
                    strokeWidth="1.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle cx="12" cy="12" r="2" fill="#fff" />
                </svg>
              )}
            </button>
          </div>

          <div className="sp-requirements">
            <p className="sp-req-title">Your password must contain at least</p>

            <div className="sp-req-row">
              <span className={`sp-dot ${hasLetter ? 'ok' : ''}`}></span>
              <span>1 letter</span>
            </div>

            <div className="sp-req-row">
              <span className={`sp-dot ${hasNumberOrSpecial ? 'ok' : ''}`}></span>
              <span>1 number or special character (example: # ? ! &amp;)</span>
            </div>

            <div className="sp-req-row">
              <span className={`sp-dot ${hasLength ? 'ok' : ''}`}></span>
              <span>10 characters</span>
            </div>
          </div>
          {message && <p className="sp-success">{message}</p>}
          {error && <p className="sp-error">{error}</p>}

          <button
            className="sp-next"
            disabled={!(hasLetter && hasNumberOrSpecial && hasLength)}
            onClick={handlePassword}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
