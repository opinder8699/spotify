import React from "react";
import "./Likedsongs.css";
import { FaTimes } from "react-icons/fa";
import { useLikedSongs } from "../LikedSongsContext";
import { useNavigate } from "react-router-dom";

function Likedsongs() {
  const { likedsongs, setLikedsongs } = useLikedSongs();
  const navigate = useNavigate();

  const handleRemove = async (e, songId) => {
    e.stopPropagation(); 

    try {
      const res = await fetch("/api/unlike", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ songId }),
      });

      const data = await res.json();

      if (data.success) {
        setLikedsongs((prev) =>
          prev.filter((s) => s.songId !== songId)
        );
      }
    } catch (err) {
      console.log("Unlike error:", err);
    }
  };

  const openSongDetail = (songId) => {
    navigate(`/song/${songId}`);
  };

  return (
    <div className="liked-container">
      <div className="liked-header">
        <h1 className="liked-title">Liked Songs</h1>
        <p className="liked-count">
          {likedsongs.length}{" "}
          {likedsongs.length === 1 ? "song" : "songs"} total
        </p>
      </div>

      <div className="liked-list">
        {likedsongs.length === 0 ? (
          <p className="empty-text">You haven’t liked any songs yet.</p>
        ) : (
          likedsongs.map((song) => (
            <div
              className="liked-card"
              key={song.songId}
              onClick={() => openSongDetail(song.songId)}
            >
              <div className="liked-info">
                <img
                  src={song.image}
                  alt={song.name}
                  className="liked-image"
                />

                <div className="liked-details">
                  <span className="liked-title-song">{song.name}</span>
                  <span className="liked-artist">{song.artist}</span>
                </div>
              </div>

              <button
                className="liked-remove-btn"
                onClick={(e) => handleRemove(e, song.songId)}
              >
                <FaTimes />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Likedsongs;

