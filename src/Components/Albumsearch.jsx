import React, { useState, useEffect } from "react";
import AlbumCard from "./Albumcard.jsx";
import { useLocation } from "react-router-dom";
import "./Albumsearch.css";

function Albumsearch() {
  const [albums, setAlbums] = useState([]);
  const location = useLocation();
  const { value } = location.state || { value: "" };

 useEffect(() => {
 
    if (!value) return;

    const fetchalbums = async () => {
      try {
        const response = await fetch("/api/search/albums", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
           credentials: "include",
          body: JSON.stringify({ value }),
        });

        const data = await response.json();
        console.log("API response:", data);

        // null safety check
        if (data.albums&& data.albums.items) {
          setAlbums(data.albums.items);
        } else {
          setAlbums([]);
        }
      } catch (err) {
        console.log("Error fetching albums:", err);
      }
    };


    fetchalbums();
  }, [value]);

  return (
    <div className="showallalbums">
      <h2 className="showallalbumstitle">Albums</h2>

      <div className="albumlist">
        {albums.map((album, index) => (
          <AlbumCard key={index} album={album} />
        ))}
      </div>
    </div>
  );
}

export default Albumsearch;