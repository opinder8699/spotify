import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import "./SongDetail.css";

function SongDetail() {
  const { id } = useParams();

  const [song, setSong] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchSong = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await fetch(`/api/song/${id}`);

        if (!res.ok) {
          throw new Error("Failed to fetch song details");
        }

        const data = await res.json();

        if (!data.success) {
          throw new Error(data.message || "Song not found");
        }

        setSong(data.track);
      } catch (err) {
        console.error("Song fetch error:", err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchSong();
  }, [id]);

  if (loading) {
    return <div className="song-loading">Loading song...</div>;
  }

  if (error) {
    return <div className="song-error">{error}</div>;
  }

  if (!song) return null;

  return (
    <div className="song-detail-container">
      {/* HEADER */}
      <div className="song-detail-header">
        <img
          src={song.album.images[0]?.url}
          alt={song.name}
        />

        <div className="song-meta">
          <span className="song-type">Song</span>

          <h1>{song.name}</h1>

          <p className="song-artists">
            {song.artists.map((a) => a.name).join(", ")}
          </p>

          <p className="song-extra">
            {song.album.name} •{" "}
            {(song.duration_ms / 60000).toFixed(2)} min •{" "}
            Popularity {song.popularity}
          </p>

          {song.explicit && (
            <span className="explicit-badge">Explicit</span>
          )}
        </div>
      </div>

      {/* ACTIONS */}
      <div className="song-actions">
        {song.preview_url ? (
          <audio controls src={song.preview_url} />
        ) : (
          <p className="no-preview">Preview not available</p>
        )}
      </div>
    </div>
  );
}

export default SongDetail;


