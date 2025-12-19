import "./Songcard.css";
import { FaPlay, FaHeart, FaRegHeart, FaPause } from "react-icons/fa";
import { useLikedSongs } from "../LikedSongsContext";
import { useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

function Songcard({ song }) {
  const navigate = useNavigate();
  const { likedsongs, setLikedsongs } = useLikedSongs();

  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const liked = likedsongs.some(
    (s) => s.songId === song.id
  );

  /* ---------- PLAY PREVIEW ---------- */
  const handlePlay = (e) => {
    e.stopPropagation();

    if (!song.preview_url) return;

    if (!audioRef.current) {
      audioRef.current = new Audio(song.preview_url);
      audioRef.current.onended = () => setIsPlaying(false);
    }

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  /* ---------- LIKE / UNLIKE ---------- */
  const toggleLike = async (e) => {
    e.stopPropagation();

    try {
      if (!liked) {
        const res = await fetch("/api/like", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({
            songId: song.id,
            name: song.name,
            artist: song.artists[0].name,
            image: song.album.images[0]?.url,
          }),
        });

        const data = await res.json();
        if (data.success) {
          setLikedsongs((prev) => [
            ...prev,
            {
              songId: song.id,
              name: song.name,
              artist: song.artists[0].name,
              image: song.album.images[0]?.url,
            },
          ]);
        }
      } else {
        const res = await fetch("/api/unlike", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify({ songId: song.id }),
        });

        const data = await res.json();
        if (data.success) {
          setLikedsongs((prev) =>
            prev.filter((s) => s.songId !== song.id)
          );
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  /* ---------- CARD CLICK → DETAIL PAGE ---------- */
  const openDetails = () => {
    navigate(`/song/${song.id}`);
  };

  return (
    <div className="songcard" onClick={openDetails}>
      <div className="imagewrapper">
        <img
          src={song.album.images[0]?.url}
          className="songimage"
          alt={song.name}
        />

        {/* PLAY BUTTON */}
        {song.preview_url && (
          <button className="playbutton" onClick={handlePlay}>
            {isPlaying ? (
              <FaPause className="playicon" />
            ) : (
              <FaPlay className="playicon" />
            )}
          </button>
        )}

        {/* LIKE BUTTON */}
        <button
          className={`likebutton ${liked ? "liked" : ""}`}
          onClick={toggleLike}
        >
          {liked ? <FaHeart /> : <FaRegHeart />}
        </button>
      </div>

      <h3 className="songname">{song.name}</h3>
      <div className="singername">{song.artists[0].name}</div>
    </div>
  );
}

export default Songcard;

