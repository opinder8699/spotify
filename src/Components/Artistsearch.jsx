import React, { useState, useEffect } from "react";
import Artistcard from "./Artistcard.jsx";
import { useLocation } from "react-router-dom";
import "./Artistsearch.css";

function Artistsearch() {
  const [artists, setArtists] = useState([]);
 const location = useLocation();
  const { value } = location.state || { value: "" };

  useEffect(() => {
 
    if (!value) return;

    const fetchsongs = async () => {
      try {
        const response = await fetch("http://localhost:5000/search/artists", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value }),
        });

        const data = await response.json();
        console.log("API response:", data);

        // null safety check
        if (data.artists && data.artists.items) {
          setArtists(data.artists.items);
        } else {
          setArtists([]);
        }
      } catch (err) {
        console.log("Error fetching artits:", err);
      }
    };


    fetchsongs();
  }, [value]);

  return (
    <div className="showallartists">
      <h2 className="showallartiststitle">Artists</h2>

      <div className="artistlist">
        {artists.map((artist, index) => (
          <Artistcard key={index} artist={artist} />
        ))}
      </div>
    </div>
  );
}

export default Artistsearch;