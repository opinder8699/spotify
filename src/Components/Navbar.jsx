import './Navbar.css';
import { useNavigate } from "react-router-dom";
import { FaSearch, FaUserCircle } from "react-icons/fa";

function Navbar() {
  const logo = './images/spotify logo.webp';
  const home = './images/homeicon.png';
  const navigate = useNavigate();

  return (
    <div className="navbar">
    
      <div className="nav-left">
        <img className="logo" src={logo} alt="Spotify Logo" />
        <button className="home" onClick={() => navigate("/")}>
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
          />
        </div>
      </div>

      
      <div className="nav-right">
        <button className="nav-btn">Premium</button>
        <button className="nav-btn">Support</button>
        <button className="nav-btn">Download</button>

        <div className="profile-icon">
          <FaUserCircle className="profile-img" />
        </div>
      </div>
    </div>
  );
}

export default Navbar;



