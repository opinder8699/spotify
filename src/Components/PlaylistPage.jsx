import React, { useState } from "react";
import "./PlaylistPage.css";
import { FaTimes } from "react-icons/fa";

function PlaylistPage() {
  const [searchValue, setSearchValue] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [playlistSongs, setPlaylistSongs] = useState([]);
  const [playlistName, setPlaylistName] = useState("My Playlist"); 
  const [isEditing, setIsEditing] = useState(false); 
  const handleChange = async (value) => {
    setSearchValue(value);

    if (!value.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const url = "http://localhost:5000/search";
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ value }),
      });

      const data = await response.json();
      setSearchResults(data.tracks?.items || []);
    } catch (err) {
      console.log("Error fetching songs:", err);
    }
  };

  const handleAddSong = (song) => {
    if (!playlistSongs.find((s) => s.id === song.id)) {
      setPlaylistSongs([...playlistSongs, song]);
    }
  };

  const handleRemoveSong = (id) => {
    setPlaylistSongs(playlistSongs.filter((song) => song.id !== id));
  };

  const handleNameChange = (e) => {
    setPlaylistName(e.target.value);
  };

  const handleNameKeyPress = (e) => {
    if (e.key === "Enter") setIsEditing(false);
  };

  return (
    <div className="playlist-container">
      <div className="playlist-header">
        {isEditing ? (
          <input
            type="text"
            className="playlist-title-input"
            value={playlistName}
            onChange={handleNameChange}
            onKeyDown={handleNameKeyPress}
            onBlur={() => setIsEditing(false)}
            autoFocus
          />
        ) : (
          <h1
            className="playlist-title editable"
            onClick={() => setIsEditing(true)}
          >
            {playlistName}
          </h1>
        )}

      </div>

      {playlistSongs.length > 0 && (
        <table className="playlist-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Title</th>
              <th>Album</th>
              <th>Duration</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {playlistSongs.map((song, index) => (
              <tr key={song.id}>
                <td>{index + 1}</td>
                <td>
                  <div className="song-info">
                    <img
                      src={song.album?.images?.[0]?.url}
                      alt=""
                      className="song-img"
                    />
                    <div>
                      <div className="song-title">{song.name}</div>
                      <div className="song-artist">
                        {song.artists?.map((a) => a.name).join(", ")}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="album-center">{song.album?.name}</td>
                <td>{(song.duration_ms / 60000).toFixed(2)}</td>
                <td>
                  <button
                    className="remove-button"
                    onClick={() => handleRemoveSong(song.id)}
                  >
                    <FaTimes />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="playlist-body">
        <h2 className="playlist-subtitle">
          Let’s find something for your playlist
        </h2>
        <input
          type="text"
          className="playlist-search"
          placeholder="Search for songs..."
          value={searchValue}
          onChange={(e) => handleChange(e.target.value)}
        />

        {searchResults.length > 0 && (
          <div className="search-results">
            {searchResults.map((song) => (
              <div key={song.id} className="search-item">
                <div className="search-left">
                  <img
                    src={song.album?.images?.[0]?.url}
                    alt={song.name}
                    className="search-img"
                  />
                  <div className="song-details">
                    <div className="song-title">{song.name}</div>
                    <div className="song-artist">
                      {song.artists?.map((a) => a.name).join(", ")}
                    </div>
                  </div>
                </div>
                <div className="song-album">{song.album?.name}</div>
                <button
                  className="add-button"
                  onClick={() => handleAddSong(song)}
                >
                  Add
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default PlaylistPage;



