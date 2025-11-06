import React, { useState, useEffect } from "react";
import AlbumCard from "./Albumcard.jsx";
import "./Showallalbums.css";

function Showallalbums() {
  const [albums, setAlbums] = useState([]);

  useEffect(() => {
    const fetchAlbums = async () => {
      try {
        const url = "http://localhost:5000/api/allalbums"; 
        const response = await fetch(url);
        const data = await response.json();
        setAlbums(data.albums.items);
        console.log(data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchAlbums();
  }, []);

  return (
    <div className="showallalbums">
      <h2 className="showallalbumstitle">Popular Albums</h2>

      <div className="albumlist">
        {albums.map((album, index) => (
          <AlbumCard key={index} album={album} />
        ))}
      </div>
    </div>
  );
}

export default Showallalbums;
