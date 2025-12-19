import React, { useState, useEffect } from "react";
import Songcard from "./Songcard.jsx";
import { useLocation } from "react-router-dom";
import "./Songssearch.css";

function Songssearch() {
  const [allsongs, setAllsongs] = useState([]);
  const location = useLocation();
  const { value } = location.state || { value: "" };

  useEffect(() => {
 
    if (!value) return;

    const fetchsongs = async () => {
      try {
        const response = await fetch("/api/search/songs", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
           credentials: "include",
          body: JSON.stringify({ value }),
        });

        const data = await response.json();
        console.log("API response:", data);

        // null safety check
        if (data.tracks && data.tracks.items) {
          setAllsongs(data.tracks.items);
        } else {
          setAllsongs([]);
        }
      } catch (err) {
        console.log("Error fetching songs:", err);
      }
    };


    fetchsongs();
  }, [value]);

  return (
    <div className="songshowall">
      <h2 className="songshowalltitle">Songs</h2>
      <div className="songlist">
         {allsongs.map((song, index) => (
       <Songcard key={index} song={song} />
       ))}
      </div>
    </div>
  );
}

export default Songssearch;
