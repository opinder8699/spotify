import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./ArtistDetail.css";

function ArtistDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [artist, setArtist] = useState(null);
  const [topTracks, setTopTracks] = useState([]);

  useEffect(() => {
    const fetchArtistData = async () => {
      try {
        const artistRes = await fetch(`/api/artist/${id}`, {
          credentials: "include",
        });
        const artistData = await artistRes.json();

        if (artistData.success) {
          setArtist(artistData.artist);
        }

        const trackRes = await fetch(
          `/api/artist/${id}/top-tracks`,
          { credentials: "include" }
        );
        const trackData = await trackRes.json();

        if (trackData.success) {
          setTopTracks(trackData.tracks);
        }
      } catch (err) {
        console.log("Artist detail error:", err);
      }
    };

    fetchArtistData();
  }, [id]);

  if (!artist) return null;

  return (
    <div className="artist-detail">
      <div className="artist-header">
        <img
          src={artist.images?.[0]?.url}
          className="artist-big-img"
        />
        <h1>{artist.name}</h1>
        <p>{artist.followers?.total.toLocaleString()} followers</p>
      </div>

      <h2 className="section-title">Popular</h2>

      {topTracks.map((song, i) => (
        <div
          key={song.id}
          className="artist-track"
          onClick={() => navigate(`/song/${song.id}`)}
        >
          <span className="index">{i + 1}</span>

          <img
            src={song.album.images[0]?.url}
            className="track-img"
          />

          <div className="track-info">
            <div className="track-name">{song.name}</div>
            <div className="track-popularity">
              Popularity {song.popularity}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ArtistDetail;
