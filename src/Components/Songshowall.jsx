import React, { useState, useEffect } from "react";
import Songcard from "./Songcard.jsx";
import "./Songshowall.css";

function Songshowall({ likedsongs, setLikedsongs }) {
  const [allsongs, setAllsongs] = useState([]);

  useEffect(() => {
    const fetchallsongs = async () => {
      try {
        const url = "http://localhost:5000/api/allsongs";
        const response = await fetch(url);
        const data = await response.json();
        setAllsongs(data.tracks.items);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchallsongs();
  }, []);

  return (
    <div className="songshowall">
      <h2 className="songshowalltitle">Trending Songs</h2>

      <div className="songlist">
        {allsongs.map((song, index) => (
          <Songcard key={index} song={song}
                  likedsongs={likedsongs}
          setLikedsongs={setLikedsongs} />
        ))}
      </div>
    </div>
  );
}

export default Songshowall;
