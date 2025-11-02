import React from "react";
import "./TermsAndConditions.css";
import logo from "/images/spotify logo.webp";
import { useNavigate} from "react-router-dom";
export default function TermsandConditions() {
  const navigate=useNavigate();
const handleClick=()=>{
  navigate("/login");
}
  return (
    <div className="signup-container">
      <div className="signup-box">
        <img src={logo} alt="Spotify Logo" className="spotify-logo" />

        <div className="sp-card">
          <div className="sp-progress">
            <div className="sp-progress-filled" style={{ width: "100%" }}></div>
          </div>
          <div className="sp-step">Step 2 of 2</div>
        </div>

        <h2 className="signup-title">Terms & Conditions</h2>

        <div className="checkbox-group">
          <label className="checkbox-item">
            <input type="checkbox" />
            <span>
              I would prefer not to receive marketing messages from Spotify
            </span>
          </label>

          <label className="checkbox-item">
            <input type="checkbox" />
            <span>
              Share my registration data with Spotify’s content providers for
              marketing purposes.
            </span>
          </label>
        </div>

        <p className="description">Spotify is a personalised service.</p>

        <p className="agreement">
          By clicking on <b>‘Sign up’</b>, you agree to Spotify’s{" "}
          <a href="#">Terms and Conditions of Use</a>.
        </p>

        <p className="agreement">
          By clicking on <b>Sign Up</b>, you confirm that you have read how we
          process your personal data in our{" "}
          <a href="#">Privacy Policy</a>.
        </p>

        <button className="sp-next" onClick={handleClick}>Sign up</button>
      </div>
    </div>
  );
}
