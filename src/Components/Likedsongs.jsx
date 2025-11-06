import React from "react";
import "./Likedsongs.css";

function Likedsongs({likedsongs}) {
  return (
    <div className="liked-container">
      <div className="liked-header">
        <h1 className="liked-title">Liked Songs</h1>
        <p className="liked-count">
          {likedsongs.length} {likedsongs.length === 1 ? "song" : "songs"} total
        </p>
      </div>

      <div className="liked-list">
        {likedsongs.length === 0 ? (
          <p className="empty-text">You haven’t liked any songs yet.</p>
        ) : (
          likedsongs.map((song, index) => (
            <div className="liked-card" key={index}>
              <div className="liked-info">
                <img
                  src={song.album?.images?.[0]?.url}
                  alt={song.name}
                  className="liked-image"
                />
                <div className="liked-details">
                  <span className="liked-title-song">{song.name}</span>
                  <span className="liked-artist">
                    {song.artists.map((a) => a.name).join(", ")}
                  </span>
                </div>
              </div>
              <span className="liked-duration">
                {song.duration }
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Likedsongs;
