import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./AlbumDetail.css";

function AlbumDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [album, setAlbum] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [audio, setAudio] = useState(null);

  useEffect(() => {
    const fetchAlbum = async () => {
      try {
        const albumRes = await fetch(`/api/album/${id}`, {
          credentials: "include",
        });
        const albumData = await albumRes.json();

        if (albumData.success) {
          setAlbum(albumData.album);
        }

        const trackRes = await fetch(`/api/album/${id}/tracks`, {
          credentials: "include",
        });
        const trackData = await trackRes.json();

        if (trackData.success) {
          setTracks(trackData.tracks);
        }
      } catch (err) {
        console.log("Album error:", err);
      }
    };

    fetchAlbum();
  }, [id]);

  const playPreview = (url) => {
    if (!url) return;

    if (audio) {
      audio.pause();
    }

    const newAudio = new Audio(url);
    newAudio.play();
    setAudio(newAudio);
  };

  if (!album) return null;

  return (
    <div className="album-detail">
      <div className="album-header">
        <img
          src={album.images[0]?.url}
          className="album-big-img"
        />
        <div>
          <h1>{album.name}</h1>
          <p>{album.artists.map(a => a.name).join(", ")}</p>
          <p>{album.release_date}</p>
        </div>
      </div>

      <h2 className="section-title">Songs</h2>

      {tracks.map((track, i) => (
        <div
          key={track.id}
          className="album-track"
        >
          <span>{i + 1}</span>

          <div
            className="track-name"
            onClick={() => navigate(`/song/${track.id}`)}
          >
            {track.name}
          </div>

          <button
            className="preview-btn"
            onClick={() => playPreview(track.preview_url)}
            disabled={!track.preview_url}
          >
            ▶
          </button>
        </div>
      ))}
    </div>
  );
}

export default AlbumDetail;
