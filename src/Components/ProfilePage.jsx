import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ProfilePage.css";

function ProfilePage() {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({ liked: 0, playlists: 0 });
  const navigate = useNavigate();

  useEffect(() => {
    const loadProfile = async () => {
      try {
        const res = await fetch("/api/me", {
          credentials: "include",
        });

        if (!res.ok) {
          navigate("/login");
          return;
        }

        const data = await res.json();

        setUser(data.user);
        setStats({
          liked: data.stats.liked,
          playlists: data.stats.playlists,
        });
      } catch (err) {
        navigate("/login");
      }
    };

    loadProfile();
  }, [navigate]);

  const logout = async () => {
    try {
      await fetch("/api/logout", {
        method: "POST",
        credentials: "include",
      });
      navigate("/login");
    } catch (err) {
      console.log(err);
    }
  };

  if (!user) return null;

  return (
    <div className="profile-page">
      <div className="profile-hero">
        <div className="profile-avatar">
          {user.avatar ? (
            <img src={user.avatar} alt="profile" />
          ) : (
            <span>{user.email[0].toUpperCase()}</span>
          )}
        </div>

        <div className="profile-info">
          <p className="profile-type">Profile</p>
          <h1>{user.username || user.email.split("@")[0]}</h1>
          <p className="profile-email">{user.email}</p>
        </div>
      </div>

      <div className="profile-stats">
        <div className="stat-card">
          <span>{stats.liked}</span>
          <p>Liked Songs</p>
        </div>

        <div className="stat-card">
          <span>{stats.playlists}</span>
          <p>Playlists</p>
        </div>
      </div>

      <div className="profile-settings">
        <h3>Account</h3>

        <div className="setting-row">
          <span>Email</span>
          <span className="muted">{user.email}</span>
        </div>

        <button className="logout-btn" onClick={logout}>
          Log out
        </button>
      </div>
    </div>
  );
}

export default ProfilePage;
