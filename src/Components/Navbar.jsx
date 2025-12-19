import './Navbar.css';
import {useNavigate } from "react-router-dom";
import { useState} from 'react';
import { FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const logo = './images/spotify logo.webp';
  const home = './images/homeicon.png';
  const navigate = useNavigate();
  const [searchv, setSearchv] = useState("");

  const handleSearch = (e) => {
    if (e.key === "Enter") {
      navigate("/search", { state: { value: searchv } });
    }
  };

  return (
    <div className="navbar">
      <div className="nav-left">
        <img className="logo" src={logo} alt="Spotify Logo" />
        <button className="home" onClick={() => navigate("/home")}>
          <img src={home} alt="Home" className="home-icon" />
        </button>
      </div>

      <div className="nav-center">
        <div className="search-wrap">
          <FaSearch className="search-icon" />
          <input
            type="text"
            placeholder="What do you want to listen to?"
            className="search-box"
            value={searchv}
            onChange={(e)=> setSearchv(e.target.value)}
            onKeyDown={handleSearch} 
          />
        </div>
      </div>

      <div className="nav-right">
        <button className="nav-btn">Premium</button>
        <button className="nav-btn">Support</button>
        <button className="nav-btn">Download</button>
        <div className="profile-icon" onClick={() => navigate("/profile")}>
          <FaUserCircle className="profile-img" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;



