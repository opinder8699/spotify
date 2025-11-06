import "./Songcard.css";
import { FaPlay, FaHeart, FaRegHeart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

function Songcard({ song ,likedsongs, setLikedsongs}) {
  const [liked, setLiked] = useState(false);

  const toggleLike = () => {
    setLiked(!liked);

    setLikedsongs((prev) => {
      if (!liked) {
        // ➕ Add song if it's not liked yet
        return [...prev, song];
      } else {
        // ➖ Remove song if already liked
        return prev.filter((s) => s.id !== song.id);
      }
    });
  };

  return (
    <div className="songcard">
      <div className="imagewrapper">
        <img
          src={song.album.images[0]?.url}
          className="songimage"
          alt={song.name}
        />

        <button className="playbutton">
          <FaPlay className="playicon" />
        </button>


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


