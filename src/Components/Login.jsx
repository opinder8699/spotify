import React, { useState, useRef } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [error, setError] = useState("");
  const inputref = useRef(null);
  const navigate = useNavigate();
  const handleClick = async (e) => {
  e.preventDefault();

  if (email.trim() === "") {
    setError("Please enter your Spotify email address.");
    inputref.current.focus();
    inputref.current.style.borderColor = "#e91429";
    return; 
  }

  try {
    const res = await axios.post(
      "/api/login",
      { email, password },
      { withCredentials: true }
    );

    if (res.data.success) {
      setError("");
      navigate("/home");
    } else {
      setError(res.data.message);
    }
  } catch (err) {
    setError("Server error. Please try again later.");
  }
};
  return (
    <div className="login-container">
      <div className="login-box">
        <img
          src="/images/spotify logo.webp"
          alt="Spotify Logo"
          className="spotify-logo"
        />
        <h1 className="login-title">Welcome back</h1>

        <div className="login-form">
          <form onSubmit={handleClick}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              id="email"
              value={email}
              ref={inputref}
              onChange={(e) => {
                setemail(e.target.value);
                setError("");
                inputref.current.style.borderColor = "#333";
              }}
              placeholder="Enter your Email"
            />

            <label htmlFor="password">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
              id="password"
              placeholder="Enter your password"
            />

        
            {error && (
              <p className="login-error">⚠️ {error}</p>
            )}

            <button className="continue-btn" type="submit">
              Continue
            </button>
          </form>
        </div>

        <div className="divider">or</div>

        <button className="phone-btn">Continue with phone number</button>

        <p className="signup-text">
          Don’t have an account? <a href="/Signup">Sign up for Spotify</a>
        </p>
      </div>
    </div>
  );
};

export default Login;

