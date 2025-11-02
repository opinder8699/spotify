import React, { useState,useRef } from "react";
import "./Signup.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const navigate=useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const inputref=useRef(null);
const validateEmail = async(e) => {
  e.preventDefault();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!regex.test(email)) {
    setError("This email is invalid. Make sure it’s written like example@email.com");
    inputref.current.focus();
    inputref.current.style.borderColor = "red";
    inputref.current.style.outline = "none";
  } else {
    setError("");
    inputref.current.style.border = "1px solid #333"; 
     try{
      const res=await axios.post("http://localhost:5000/Signup",{email});
      if(res.data.success){
        const userId = res.data.user._id;
        navigate("/setpassword",{state :{userId,email}}); 
      }else{
            setError(res.data.message);
      }
     }catch(err){
      console.log("Frontend error:", err);
         setError("Something went wrong. Please try again later.");
     }
  }  
};

  return (
    <div className="signup-container">
      <div className="signup-box">
        <img
          src="/images/spotify logo.webp"
          alt="Spotify Logo"
          className="spotify-logo"
        />

        <h1 className="signup-title">Sign up to<br />start listening</h1>

        <form onSubmit={validateEmail} className="signup-form">
          <label htmlFor="email">Email address</label>
          <input
            type="text"
            id="email"
            ref={inputref}
            placeholder="name@domain.com"
            value={email}
            onChange={(e) => {
  setEmail(e.target.value);
  setError(""); 
  inputref.current.style.borderColor = "#333";
}}

            className={error ? "error-input" : ""}
          />

          {error && (
            <p className="error-text">
              <span className="error-icon">⚠️</span> {error}
            </p>
          )}

          <a href="#" className="phone-link">
            Use phone number instead.
          </a>

          <button type="submit"  className="next-btn">
            Next
          </button>
        </form>

        <div className="divider">or</div>

        <p className="login-text">
          Already have an account? <a href="/">Log in</a>
        </p>
      </div>
    </div>
  );
};

export default Signup;
