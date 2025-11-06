import React from "react";
import './Sidebar.css'
import { useNavigate } from "react-router";
function Sidebar() {
  const navigate=useNavigate();
  return (
    <div className="sidebar">
      {/* Library with + button */}
      <div className="library">
        <h3>Your Library</h3>
        <button className="add-btn">+</button>
      </div>

      {/* Create Playlist */}
      <div className="playlist">
        <p className="title">Create your first playlist</p>
        <p className="subtext">It’s easy, we’ll help you</p>
        <button onClick={()=>{navigate("/playlists")}} className="btn create-btn">Create Playlist</button>
      </div>

      {/* Browse Podcasts */}
      <div className="podcasts">
        <p className="title">Let’s find some podcasts to follow</p>
        <p className="subtext">We’ll keep you updated on new episodes</p>
        <button className="btn browse-btn">Browse Podcasts</button>
      </div>

      {/* Footer */}
      <div className="footer">
        <ul>
          <li>Legal</li>
          <li>Safety & Privacy Center</li>
          <li>Privacy Policy</li>
          <li>Cookies</li>
          <li>About Ads</li>
          <li>Accessibility</li>
        </ul>
        <button className="lang-btn">🌐 English</button>
      </div>
    </div>
  );
}

export default Sidebar;

